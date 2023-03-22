import products from '../products.js';

let myProducts;
// 선택된 상품만 골라 저장할 배열
let selected = [];

//result = 숫자,
// 를 받아서 원하는 모양대로 포맷팅해서 innerText로 넣어주기
const updateTotal = (price) => {
  const span = document.querySelector('.total-price');

  // 포맷팅 후 formatted에 넣어주기
  const formatted = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);

  span.innerText = formatted;
};

// 선택된 상품 계산 부분 event
// 상품가격의 합계
const calculate = () => {
  // acc : 누산기(합계를 위한것), currency : 현재값, idx : 인덱스, src : 원본 배열
  // acc :누산기, currency : 현재값 = 필수
  // idx : 인덱스, src : 원본 배열 = 옵션
  // 방식 1.
  // const reducer = (acc, currency) => acc + currency.price;
  // const result = selected.reduce(reducer, 0);
  // 방식 2. (콜백 함수)
  const result = selected.reduce((acc, current) => {
    return acc + current.price;
  }, 0);

  updateTotal(result);
};

const addCart = (event) => {
  // 구조분해.
  const { checked } = event.target;
  const { id } = event.target.parentElement;

  if (checked) {
    // 체크가 되었을 경우 selected 배열배 넣어줌
    myProducts.forEach((product) => {
      // id = html에서 뽑아온 id는 String type 이기에
      // 방법 1. == 이렇게 2개로만 비교
      // 방법 2. parseInt로 정수값으로 변경
      if (product.id === parseInt(id)) {
        selected.push(product);
      }
    });
  } else {
    // 체크가 안되었을 경우 selected 배열에서 빼줌.
    // 삭제하고 싶은 정보를 제외한 새로운 배열 return
    selected = selected.filter((product) => {
      return product.id !== parseInt(id);
    });
  }

  // 선택된 상품 계산 부분
  calculate();
};

const createItem = (product) => {
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const div = document.createElement('div');
  const check = document.createElement('input');

  li.id = product.id;
  h3.className = 'name';
  h3.innerText = product.name;

  const price = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(product.price);

  div.className = 'price';
  div.innerText = price;

  // <input type='checkbox'></input>
  check.setAttribute('type', 'checkbox');
  // check 되었을 때 event
  check.addEventListener('change', addCart);

  li.append(check, h3, div);
  ul.append(li);
};

const importData = () => {
  if (products) {
    myProducts = products.data;
  }

  myProducts.map((product) => {
    if (!document.getElementById(product.id)) {
      createItem(product);
    }
  });
};

// 버튼 없이 실행 시키기 위해 수정
importData();
