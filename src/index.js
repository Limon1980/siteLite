import "@babel/polyfill";

import popupCall from './modules/popupCall';

import sendForm from './modules/sendForm';

window.addEventListener('DOMContentLoaded', () => {

	// Модальное окно 1
	popupCall();

	// отправка формы
	sendForm();

});


