self.addEventListener('install', function() {
	self.skipWaiting();
});

self.addEventListener('activate', function (event) {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('message', function (event) {
	if (event.data === 'keepalive') return;
	if (!event.data.rs) event.data.rs = createStream(event.ports[0]);
	requestRouting[event.data.url] = event.data;
});

self.addEventListener('fetch', function (event) {
	var url  = event.request.url;
	var data = mapperUrlToData[url];
	if (!data) return null;
	delete requestRouting[url];
	event.respondWith(new Response(data.rs, {
		headers: data.headers
	}));
});

var requestRouting = {};

function createStream(port)
{
	return new ReadableStream({
		start(controller) {
			port.onmessage = function (event) {
				if (event.data === 'end') {
					return controller.close()
				}
				if (event.data === 'abort') {
					controller.error('Aborted')
					return
				}
				controller.enqueue(event.data)
			}
		}
		,
		cancel () {
			port.postMessage('Canceled')
		}
	})
}
