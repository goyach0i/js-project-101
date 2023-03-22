const form = document.querySelector('form');

// feat: 비만도 계산 후 group 나누기
const display = (bmi) => {
  const result = document.querySelector('.result');
  let group;

  if (bmi >= 30.0) {
    group = '중등도비만';
  } else if (bmi >= 25.0) {
    group = '경도비만';
  } else if (bmi >= 23.0) {
    group = '과제중';
  } else if (bmi >= 18.5) {
    group = '정상';
  } else {
    group = '저체중';
  }

  result.innerText = bmi + '　→　' + group;
};

// feat: 비만도 계산
const calculate = (weight, height) => {
  return weight / (height * height);
};

// feat: form에서 일어나는 event
const formHandler = (event) => {
  event.preventDefault();

  const heightInput = document.querySelector('#height');
  const weightInput = document.querySelector('#weight');

  if (weightInput.value !== '' && heightInput.value !== '') {
    const weight = weightInput.value;
    const height = heightInput.value / 100;
    const bmi = calculate(weight, height).toFixed(1);
    display(bmi);
    heightInput.value = '';
    weightInput.value = '';
  }
};
// feat: form event 처리
form.addEventListener('submit', formHandler);
