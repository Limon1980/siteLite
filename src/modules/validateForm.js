const validateForm = () => {

	const formAll = document.querySelectorAll('form');

	//  запрет ввода символов в поля ввода
	const validate = form => {
		const tel = form.querySelector('[name="user_phone"]'),
			name = form.querySelector('[name="user_name"]'),
			text = form.querySelector('[name="user_quest"]');
		if (tel) {
			tel.addEventListener('input', ev => {
				const target = ev.target;
				target.value = target.value.replace(/[^+0-9]/g, '');
			});
		}
		if (name) {
			name.addEventListener('input', ev => {
				const target = ev.target;
				target.value = target.value.replace(/[^а-яА-Я ]/g, '');
			});
		}

		if (text) {
			text.addEventListener('input', ev => {
				const target = ev.target;
				target.value = target.value.replace(/[^а-яА-Я ]/g, '');
			});
		}
	};

	formAll.forEach(item => {
		validate(item);
	});

};

export default validateForm;
