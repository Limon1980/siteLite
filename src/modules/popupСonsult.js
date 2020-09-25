const popupConsult = () => {
	const popupConsult = document.querySelector('.popup-consultation');
	const consultationBtn = document.querySelector('.consultation-btn');
	const directorForm = document.querySelector('.director-form');

	consultationBtn.addEventListener('click', () => {
		const textDirectorForm = directorForm.querySelector('input');
		const textDirectorFormValue = textDirectorForm.value;
		const formConsult = popupConsult.querySelector('form');
		formConsult.insertAdjacentHTML('beforeend', `
		<input type="text" id="name_13" name="user_quest" value="${textDirectorFormValue}" hidden>
		`);
		textDirectorForm.value = '';
		popupConsult.style.display = 'block';

	});



};

export default popupConsult;
