const sendForm = () => {

	const erorMessage = 'Что-то пошло не так...',
		laodMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem; color: red;';

	const mainForm = document.querySelector('.main-form');
	const sectionForm = document.querySelector('.section-form').querySelector('form');

	// собираем массив из нужных форм
	const formArray = [];
	formArray.push(mainForm);
	formArray.push(sectionForm);

	formArray.forEach(item => {
		if (item.classList.contains('main-form') || item.classList.contains('capture-form')) {

			item.addEventListener('submit', e => {
				e.preventDefault();

				const formData = new FormData(item);
				const body = {};

				for (const val of formData.entries()) {
					body[val[0]] = val[1];
				}

				const postData = body => fetch('server.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				});

				const clearForm = () => {
					for (const el of item.elements) {
						if (el.tagName.toLowerCase() !== 'button' && el.type !== 'button') {
							el.value = '';
						}
					}
				};

				item.appendChild(statusMessage);
				statusMessage.textContent = laodMessage;

				postData(body)
					.then(response => {
						if (response.status !== 200) {
							throw new Error('status network not 200');
						}

						statusMessage.textContent = successMessage;
						clearForm();
						setTimeout(() => {
							statusMessage.textContent = '';
						}, 3000);
					})
					.catch(error => {
						statusMessage.textContent = erorMessage;
						console.error(error);
					});

			});
		}
		//  запрет ввода символов в поля ввода
		const validate = form => {
			const tel = form.querySelector('[name="user_phone"]'),
				name = form.querySelector('[name="user_name"]');

			tel.addEventListener('input', ev => {
				const target = ev.target;
				target.value = target.value.replace(/[+0-9]/g, '');
			});
			if (name) {
				name.addEventListener('input', ev => {
					const target = ev.target;
					target.value = target.value.replace(/[^а-яА-Я ]/g, '');
				});
			}
		};

		validate(item);

	});


};

export default sendForm;
