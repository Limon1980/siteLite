const popupCheck = () => {

	const popupCheck = document.querySelector('.popup-check ');
	const checkBtn = document.querySelector('.check-btn');

	checkBtn.addEventListener('click', () => {
		popupCheck.style.display = 'block';
	});

};

export default popupCheck;
