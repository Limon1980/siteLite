const popupClose = () => {

	const popup = document.querySelectorAll('.popup');

	const btnClose = document.querySelectorAll('.popup-close');
	popup.forEach(item => {

		window.addEventListener('click', e => {
			const target = e.target;

			if (item.style.display === 'block' && item === target) {
				item.style.display = 'none';
			}

			btnClose.forEach(btn => {
				if (target === btn) {
					e.preventDefault();
					item.style.display = 'none';
				}
			});

		});
	});

};

export default popupClose;
