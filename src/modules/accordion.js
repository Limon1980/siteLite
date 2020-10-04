const accordion = () => {

	const sectionQuestions = document.querySelector('.questions'),
		button = sectionQuestions.querySelectorAll('.panel-heading'),
		accordionContents = sectionQuestions.querySelectorAll('.panel-collapse'),
		firstText = document.getElementById('collapseOne-two');


	firstText.style.maxHeight = firstText.scrollHeight + "px";
	firstText.style.opacity = 1;
	button.forEach(elem => {
		elem.style.cursor = 'pointer';
	});


	button.forEach(itemAcc => {
		itemAcc.addEventListener('click', event => {
			event.preventDefault();
			const context = itemAcc.nextElementSibling;
			if (context.style.maxHeight) {
				context.classList.remove('is-open');
				context.style.maxHeight = null;
				context.style.opacity = 0;
			} else {
				context.classList.add('is-open');
				context.style.maxHeight = context.scrollHeight + 'px';
				context.style.opacity = 1;
			}

			accordionContents.forEach(itemCon => {
				if (itemCon !== context) {
					itemCon.style.maxHeight = null;
				}
			});
			button.forEach(item => {
				if (item !== itemAcc) {
					item.classList.remove('is-open');
				}
			});
		});


	});

};

export default accordion;
