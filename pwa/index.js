self.addEventListener("DOMContentLoaded", (event) => { 
	let iframe = document.getElementById('myiframe');
	iframe.src = "/index.html"
})

self.addEventListener("click", function (evnt) {
	// offre la barra di uscita automaticamente
	top.location = "https://developer.mozilla.org/en-US/"
})

var serviceWorkerReg = false;
self.addEventListener('load', function() {
	if ('serviceWorker' in navigator) {
		serviceWorkerReg = navigator.serviceWorker.register('/pwa/service-worker.js');
	}
})

