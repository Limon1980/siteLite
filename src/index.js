import "@babel/polyfill";

import popupClose from './modules/popupClose';
import popupCall from './modules/popupCall';
import validateForm from './modules/validateForm';
import sendForm from './modules/sendForm';
import popupDiscount from "./modules/popupDiscount";

window.addEventListener('DOMContentLoaded', () => {

	// Закрытие модальных окон
	popupClose();
	// Модальное окно 1
	popupCall();

	// валидация форм
	validateForm();
	// отправка формы
	sendForm();

	// Модальное окно popupDiscont
	popupDiscount();

});


