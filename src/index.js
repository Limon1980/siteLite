import "@babel/polyfill";

import popupClose from './modules/popupClose';
import popupCall from './modules/popupCall';
import sendForm from './modules/sendForm';
import popupDiscount from "./modules/popupDiscount";

window.addEventListener('DOMContentLoaded', () => {

	// Закрытие модальных окон
	popupClose();
	// Модальное окно 1
	popupCall();

	// отправка формы
	sendForm();

	// Модальное окно popupDiscont
	popupDiscount();

});


