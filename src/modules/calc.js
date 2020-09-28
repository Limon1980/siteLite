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
		myOnOffSwitchTwo = document.getElementById('myonoffswitch-two'),
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



	const formControl = document.querySelectorAll('.form-control'),
		inputDistance = document.querySelector('.distance');
	let formDiametr1 = formControl[0].value,
		formRings1 = formControl[1].value,
		formDiametr2 = formControl[2].value,
		formRings2 = formControl[3].value;

	// считываем input формы
	const calcForm = () => {
		formDiametr1 = formControl[0].value;
		formRings1 = formControl[1].value;
		formDiametr2 = formControl[2].value;
		formRings2 = formControl[3].value;
	};

	const obj = {};
	// начальное значение объекта
	const restObj = start => {

		if (!obj.result2) {
			obj.result2 = 0;
		}
		calcResult.value = start + obj.result2;
		obj.result = start;
		obj.diameter1 = formDiametr1;
		obj.rings1 = formRings1;
		obj.diameter2 = formDiametr2;
		obj.rings2 = formRings2;
		obj.check = 'false';



	};

	// проверка чек бокс наличия дна
	const bottomChange = () => {

		const renewBottom = () => {
			const data = JSON.parse(localStorage.getItem('Data'));
			const result = data.result;
			if (myOnOffSwitchTwo.checked) {

				if (!myOnOffSwitchOne.checked) {
					obj.result = Math.floor(result * 1.2);
				} else {
					obj.result = Math.floor(result * 1.1);
				}
				obj.bottom = 'true';
				calcResult.value = obj.result;
			} else {
				obj.bottom = 'false';
				obj.result = Math.floor(result);
				calcResult.value = obj.result;
			}
		};
		renewBottom();
		myOnOffSwitchTwo.addEventListener('change', () => {
			renewBottom();
		});
	};
	// считаем кольца у первой камеры
	const formRingsChamber1 = result => {
		if (formRings1 === '1 штука') {
			obj.result = result;
			calcResult.value = obj.result;
			obj.rings1 = formRings1;
		}
		if (formRings1 === '2 штуки') {
			obj.result = result * 1.3;
			calcResult.value = obj.result;
			obj.rings1 = formRings1;
		}
		if (formRings1 === '3 штуки') {
			obj.result = result * 1.5;
			calcResult.value = obj.result;
			obj.rings1 = formRings1;
		}
	};

	// считаем кольца у ворой камеры
	const formRingsChamber2 = result => {
		if (formRings2 === '1 штука') {
			obj.result2 = result;
			calcResult.value = obj.result2;
			obj.rings2 = formRings2;
		}
		if (formRings2 === '2 штуки') {
			obj.result2 = result * 1.2;
			calcResult.value = obj.result2;
			obj.rings2 = formRings2;
		}
		if (formRings2 === '3 штуки') {
			obj.result2 = result * 1.4;
			calcResult.value = obj.result2;
			obj.rings2 = formRings2;
		}
	};

	//одно камерный рачет
	const chamberOne = () => {
		restObj(10000);
		localStorage.setItem("Data", JSON.stringify(obj));

		formControl.forEach(item => {
			restObj(10000);
			item.addEventListener('change', () => {
				calcForm();
				if (formDiametr1 === '2 метра') {
					obj.diameter1 = formDiametr1;
					obj.result = 10000 * 1.2;
					calcResult.value = obj.result;
					formRingsChamber1(obj.result);
				} else {
					obj.result = 10000;
					obj.diameter1 = formDiametr1;
					calcResult.value = obj.result;
					formRingsChamber1(obj.result);
				}
				obj.diameter2 = '';
				obj.rings2 = '';
				localStorage.setItem("Data", JSON.stringify(obj));
				bottomChange();
			});
		});
		bottomChange();
	};

	// дву камерный расчет
	const cramberTwo = () => {
		calcForm();
		if (formDiametr2 === '2 метра') {
			obj.diameter2 = formDiametr2;
			obj.result2 = 5000 * 1.2;
			formRingsChamber2(obj.result2);
			obj.result += obj.result2;
			calcResult.value = obj.result;
		} else {
			obj.result2 = 5000;
			obj.diameter2 = formDiametr2;
			formRingsChamber2(obj.result2);
			obj.result += obj.result2;
			calcResult.value = obj.result;
		}
		localStorage.setItem("Data", JSON.stringify(obj));
		bottomChange();

	};

	// если септик одно камерный
	if (myOnOffSwitchOne.checked) {
		restObj(10000);
		chamberOne();
	} else {
		restObj(10000);
		obj.result2 = 5000;
		localStorage.setItem("Data", JSON.stringify(obj));
	}

	myOnOffSwitchOne.addEventListener('change', () => {
		formControl.forEach(item => {
			item[0].selected = true;
		});
		myOnOffSwitchTwo.checked = false;
		if (myOnOffSwitchOne.checked) {

			restObj(10000);
			chamberOne();
			obj.diameter2 = '';
			obj.rings2 = '';
			localStorage.setItem("Data", JSON.stringify(obj));
		} else {
			formControl.forEach(item => {
				obj.result2 = 5000;
				restObj(10000);
				cramberTwo();
				item.addEventListener('change', () => {
					cramberTwo();
				});
			});

		}
	});


	const callBtn = constructor.querySelector('.call-btn');
	const popupDiscount = document.querySelector('.popup-discount');

	callBtn.addEventListener('click', e => {
		e.preventDefault();
		popupDiscount.style.display = 'block';
		obj.distance = inputDistance.value;
		obj.check = 'true';
		inputDistance.value = '';
		delete obj.result2;
		localStorage.setItem("Data", JSON.stringify(obj));
		formControl.forEach(item => {
			item[0].selected = true;
		});
		myOnOffSwitchTwo.checked = false;
		myOnOffSwitchOne.checked = true;
		restObj(10000);
	});



};

export default calc;
