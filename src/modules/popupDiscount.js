const popupDiscount = () => {

	const popup = document.querySelector('.popup-discount');
	const sentenceBtn = document.querySelectorAll('.sentence-btn');


	sentenceBtn.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			const target = e.target;

			if (target === item) {
				popup.style.display = 'block';
			}
		});

	});

};


export default popupDiscount;
