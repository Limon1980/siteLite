const popupDiscount = () => {

	const popup = document.querySelector('.popup-discount');
	const sentenceBtn = document.querySelectorAll('.sentence-btn');
	const addSentenceBtn = document.querySelector('.add-sentence-btn');
	const shadowBlock = document.querySelectorAll('.shadow-block');

	sentenceBtn.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			const target = e.target;

			if (target === item) {
				popup.style.display = 'block';
			}
		});

	});


	addSentenceBtn.addEventListener('click', () => {

		shadowBlock.forEach((item, key) => {
			if (key > 2) {
				item.parentNode.style.cssText = `
				display: block!important
			`;
				item.classList.add('animated');
				addSentenceBtn.style.display = 'none';
			}
		});
	});






};


export default popupDiscount;
