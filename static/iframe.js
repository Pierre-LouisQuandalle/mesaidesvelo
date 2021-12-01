const iframeElement = document.getElementById('mesaidesvelo-iframe');
window.addEventListener('message', function (evt) {
	if (evt.data.kind === 'resize-page') {
		console.log(evt.data);
		iframeElement.style.height = evt.data.value + 'px';
	}
});
