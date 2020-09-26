const accordion = () => {

	const sectionQuestions = document.querySelector('.questions'),
		button = sectionQuestions.querySelectorAll('.panel-heading'),
		firstText = document.getElementById('collapseOne-two'),
		secondText = document.getElementById('collapseTwo-two'),
		thirdText = document.getElementById('collapseThree-two');

	firstText.style.maxHeight = firstText.scrollHeight + "px";
	button.forEach(elem => {
		elem.style.cursor = 'pointer';
	});


	button.forEach(elem => {
		elem.addEventListener('click', event => {
			event.preventDefault();
			const target = event.target;
			const changeContent = (one, second, third) => {
				one.style.maxHeight = firstText.scrollHeight + "px";
				third.style.maxHeight = null;
				second.style.maxHeight = null;
			};
			if (target.closest('.panel-heading') === button[0]) {
				changeContent(firstText, secondText, thirdText);
			}
			if (target.closest('.panel-heading') === button[1]) {
				changeContent(secondText, firstText, thirdText);
			}
			if (target.closest('.panel-heading') === button[2]) {
				changeContent(thirdText, firstText, secondText);
			}
		});
	});

};

export default accordion;
