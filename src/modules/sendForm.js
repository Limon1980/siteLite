const sendForm = () => {

	const erorMessage = 'Что-то пошло не так...',
		laodMessage = 'Загрузка...',
		phoneForm = 'Введите номер телефона из 11 цифр',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem; color: red;';

	const formAll = document.querySelectorAll('form');

	formAll.forEach(item => {

		item.addEventListener('submit', e => {
			e.preventDefault();
			if (item.classList.contains('director-form')) {
				return;
			}
			if (item.classList.contains('invalid')) {
				item.appendChild(statusMessage);
				statusMessage.textContent = phoneForm;
				setTimeout(() => {
					statusMessage.textContent = '';
				}, 2000);
				return;
			} else {
				statusMessage.textContent = '';
			}

			const formData = new FormData(item);
			let body = {};
			const obj = JSON.parse(localStorage.getItem('Data'));

			if (obj) {
				body = obj;
			} else {
				for (const val of formData.entries()) {
					body[val[0]] = val[1];
				}
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
					localStorage.removeItem('Data');
				})
				.catch(error => {
					statusMessage.textContent = erorMessage;
					console.error(error);
				});

		});
	}

	);

};

export default sendForm;
