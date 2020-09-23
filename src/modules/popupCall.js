const popupCall = () => {

	const contacts = document.querySelectorAll('.contacts');
	const popup = document.querySelector('.popup');
	const popupClose = document.querySelector('.popup-close');

	window.addEventListener('click', e => {
		const target = e.target;
		if (popup.style.display === 'block' && target.closest('.popup-call') === target) {
			popup.style.display = 'none';
		}
		contacts.forEach(item => {
			if (target.closest('.contacts') === item) {
				popup.style.display = 'block';
			}
		});
		if (target.closest('.popup-close') === popupClose) {
			e.preventDefault();
			popup.style.display = 'none';
		}

	});

};

export default popupCall;
