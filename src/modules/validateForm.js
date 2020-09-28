const validateForm = () => {

	const formAll = document.querySelectorAll('form');

	//  запрет ввода символов в поля ввода
	const validate = form => {
		const name = form.querySelector('[name="user_name"]'),
			text = form.querySelector('[name="user_quest"]'),
			number = document.querySelector('[name="user_number"]');
		//	tel = form.querySelector('[name="user_phone"]');
		// if (tel) {
		// 	// tel.addEventListener('input', ev => {
		// 	// 	const target = ev.target;
		// 	// 	target.value = target.value.replace(/[^+0-9]/g, '');
		// 	// });
		// }
		if (name) {
			name.addEventListener('input', ev => {
				const target = ev.target;
				target.value = target.value.replace(/[^а-яА-Я ]/g, '');
			});
		}

		if (text) {
			text.addEventListener('input', ev => {
				const target = ev.target;
				target.value = target.value.replace(/[^\W\s0-9]/g, '');
			});
		}

		if (number) {
			number.addEventListener('input', ev => {
				const target = ev.target;
				target.value = target.value.replace(/[^0-9]/g, '');
			});
		}
	};

	formAll.forEach(item => {
		validate(item);
	});

	const maskPhoneUse = () => {
		const elemPhone = document.querySelectorAll('.phone-user');
		elemPhone.forEach(elem => {

			const maskPhone = (masked = '+7 (___) ___-__-__') => {
				function mask(event) {
					const keyCode = event.keyCode;
					const template = masked,

						def = template.replace(/\D/g, ""),
						val = elem.value.replace(/\D/g, "");
					let i = 0,
						newValue = template.replace(/[_\d]/g,
							a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
					i = newValue.indexOf("_");
					if (i !== -1) {
						newValue = newValue.slice(0, i);
					}
					let reg = template.substr(0, elem.value.length).replace(/_+/g,
						a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
					reg = new RegExp("^" + reg + "$");
					if (!reg.test(elem.value) || elem.value.length < 5 || keyCode > 47 && keyCode < 58) {
						elem.value = newValue;
					}
					if (event.type === "blur" && elem.value.length < 5) {
						elem.value = "";
					}
					if (val.length < 11) {
						elem.parentNode.classList.add('invalid');
					} else {
						elem.parentNode.classList.remove('invalid');
					}
				}
				elem.addEventListener("input", mask);
				elem.addEventListener("focus", mask);
				elem.addEventListener("blur", mask);
			};
			maskPhone();
		});
	};

	maskPhoneUse();

};

export default validateForm;
