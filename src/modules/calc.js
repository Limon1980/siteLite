const calc = () => {

	const constructor = document.querySelector('.constructor'),
		button = constructor.querySelectorAll('.panel-heading'),
		constructBtn = constructor.querySelectorAll('.construct-btn'),
		panelDefault = constructor.querySelectorAll('.panel-default'),
		firstText = document.getElementById('collapseOne'),
		secondText = document.getElementById('collapseTwo'),
		thirdText = document.getElementById('collapseThree'),
		fourText = document.getElementById('collapseFour'),
		myOnOffSwitchOne = document.getElementById('myonoffswitch'),
		sampTwo = constructor.querySelector('.sump-two'),
		calcResult = document.getElementById('calc-result');

	localStorage.removeItem('Data');

	firstText.style.maxHeight = firstText.scrollHeight + "px";

	button.forEach(elem => {
		elem.style.cursor = 'pointer';
	});

	panelDefault.forEach(item => {
		item.querySelector('.panel-collapse').classList.add('in');

	});

	panelDefault.forEach(item => {
		item.addEventListener('click', event => {
			if (!event.target.closest('.onoffswitch')) {
				event.preventDefault();
			}

			const target = event.target;
			const changeContent = (one, second, third, four) => {
				one.style.maxHeight = firstText.scrollHeight + "px";
				third.style.maxHeight = null;
				second.style.maxHeight = null;
				four.style.maxHeight = null;
			};

			if (target.closest('.panel-heading') === button[0]) {
				changeContent(firstText, secondText, thirdText, fourText);
				if (calcResult.value === '') {
					// начальная стоимосмть
					calcResult.value = 10000;
				}
			}
			if (target.closest('.panel-heading') === button[1] ||
				target.closest('.construct-btn') === constructBtn[0]) {
				if (myOnOffSwitchOne.checked) {
					sampTwo.style.display = 'none';
				} else {
					sampTwo.style.display = 'block';
				}
				secondText.style.maxHeight = '315px';
				firstText.style.maxHeight = null;
				thirdText.style.maxHeight = null;
				fourText.style.maxHeight = null;

			}
			if (target.closest('.panel-heading') === button[2] ||
				target.closest('.construct-btn') === constructBtn[1]) {
				secondText.style.maxHeight = null;
				firstText.style.maxHeight = null;
				thirdText.style.maxHeight = '260px';
				fourText.style.maxHeight = null;
			}
			if (target.closest('.panel-heading') === button[3] ||
				target.closest('.construct-btn') === constructBtn[2]) {
				changeContent(fourText, firstText, secondText, thirdText);
			}
		});

	});



	const formControl = document.querySelectorAll('.form-control');
	const constructInput = constructor.querySelectorAll('input');

	const obj = {};

	const readForm = () => {
		const myOnOffSwitchOne = document.getElementById('myonoffswitch'),
			myOnOffSwitchTwo = document.getElementById('myonoffswitch-two'),
			formDiametr1 = formControl[0].value,
			formRings1 = formControl[1].value,
			formDiametr2 = formControl[2].value,
			formRings2 = formControl[3].value;

		obj.result = 10000;

		// расчитывает данные по первой камере
		const calcForm1 = () => {
			if (formDiametr1 === '2 метра') {
				obj.diameter1 = formDiametr1;
				obj.result *= 1.2;
				if (formRings1 === '1 штука') {
					obj.rings1 = formRings1;
				}
				if (formRings1 === '2 штуки') {
					obj.result *= 1.3;
					obj.rings1 = formRings1;
				}
				if (formRings1 === '3 штуки') {
					obj.result *= 1.5;
					obj.rings1 = formRings1;
				}
			} else {
				obj.diameter1 = formDiametr1;
				if (formRings1 === '1 штука') {
					obj.rings1 = formRings1;
				}
				if (formRings1 === '2 штуки') {
					obj.result *= 1.3;
					obj.rings1 = formRings1;
				}
				if (formRings1 === '3 штуки') {
					obj.result *= 1.5;
					obj.rings1 = formRings1;
				}
			}
		};

		if (myOnOffSwitchOne.checked) {
			calcForm1();
			if (obj.diameter2) {
				delete obj.diameter2;
				delete obj.rings2;
			}
		} else {
			// рассчитываем данные формы по второй камере
			obj.result2 = 5000;
			if (formDiametr2 === '2 метра') {
				obj.diameter2 = formDiametr2;
				obj.result2 *= 1.2;
				calcForm1();
				if (formRings2 === '1 штука') {
					obj.rings2 = formRings2;
				}
				if (formRings2 === '2 штуки') {
					obj.result2 *= 1.2;
					obj.rings2 = formRings2;
				}
				if (formRings2 === '3 штуки') {
					obj.result2 *= 1.4;
					obj.rings2 = formRings2;
				}
			} else {
				obj.diameter2 = formDiametr2;
				calcForm1();
				if (formRings2 === '1 штука') {
					obj.rings2 = formRings2;
				}
				if (formRings2 === '2 штуки') {
					obj.result2 *= 1.2;
					obj.rings2 = formRings2;
				}
				if (formRings2 === '3 штуки') {
					obj.result2 *= 1.4;
					obj.rings2 = formRings2;
				}
			}
		}
		// складываем расчеты по первой и второй камере
		if (!obj.result2) obj.result2 = 0;
		obj.result += obj.result2;
		delete obj.result2;

		// проверка есть ли дно
		if (myOnOffSwitchTwo.checked) {

			if (myOnOffSwitchOne.checked) {
				obj.result = Math.floor(obj.result * 1.1);
			} else {
				obj.result = Math.floor(obj.result * 1.2);
			}
		}
		calcResult.value = obj.result;
	};
	readForm();

	formControl.forEach(item => {
		item.addEventListener('change', event => {
			event.preventDefault();
			// const target = event.target;
			readForm();

		});
	});

	constructInput.forEach(item => {
		item.addEventListener('change', event => {
			event.preventDefault();
			// const target = event.target;
			readForm();

		});
	});

	const callBtn = constructor.querySelector('.call-btn');
	const popupDiscount = document.querySelector('.popup-discount');


	callBtn.addEventListener('click', e => {
		e.preventDefault();
		const inputDistance = document.querySelector('.distance');
		popupDiscount.style.display = 'block';
		obj.distance = inputDistance.value;
		// console.log(obj);
		localStorage.setItem("Data", JSON.stringify(obj));
	});


};

export default calc;
