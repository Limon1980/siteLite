const popupCall = () => {

	const contacts = document.querySelectorAll('.contacts');
	const popup = document.querySelector('.popup-call');


	contacts.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			const target = e.target;
			if (target.closest('.contacts') === item) {
				popup.style.display = 'block';
			}
		});

	});



};

export default popupCall;
