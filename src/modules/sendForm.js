const sendForm = () => {

	const erorMessage = 'Что-то пошло не так...',
		laodMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem; color: red;';

	const formAll = document.querySelectorAll('form');

	formAll.forEach(item => {

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

	);

};

export default sendForm;
