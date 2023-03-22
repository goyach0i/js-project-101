// products.json === 임의로 사용할 데이터를 json으로 제작.
// products.js === 임의로 사용할 데이터를 js로 제작.

// products.json이 외부 파일을 쓰려면 script 타입을 module로 지정후 import
// import products from '../products.json' assert { type: 'json' };

// products.js는 따로 타입을 명시해줄 필요 없고 import만 해주면 됨.
import products from '../products.js';
// 상품목록 불러오기 Bt
const button = document.querySelector('button');
// 오름차순 Bt
const asceButton = document.querySelector('.ascending');
// 내림차순 Bt
const descButton = document.querySelector('.descending');
// 필터 선택 select
const select = document.querySelector('select');

// 상품 목록을 불러온 다음에 필터가 실행 되게끔 조건 걸어주기 위한 변수 선언
// importData에서 products.data를 myProducts에 product 데이터가 있을경우
// myProducts에 넣어줌으로써 selectCategory event에 조건을 걸어주고
// myProducts가 존재할 경우에만 필터 선택 event가 일어나게끔 실행함.
let myProducts;

// 필터 선택 event
const selectCategory = (event) => {
  // 구조분해를 해서 event.target.options에 있는 각 필터의 index값을 가져옴.
  const { selectedIndex } = event.target.options;
  const { value } = event.target.options[selectedIndex];

  // myproducts가 존재할 경우만 실행
  if (!myProducts) {
    alert('상품 목록을 먼저 불러와주세요.');
    // option 값을 선택 전 기본 값으로 변경.
    select.selectedIndex = 0;
    return;
  }

  // filter() = 조건에 === 맞으면 가져오고 안맞으면 !== 제외.
  const filtered = myProducts.filter((product) => {
    return product.cartegory === value;
  });

  // 지우고 다시 그리기 위해 removeItems()를 실행.
  removeItems();
  // filtered.forEach문을 활용하여 creatItem을 다시 정렬된 product 객체로 불러옴.
  filtered.forEach((product) => {
    createItem(product);
  });
};

// 기존의 정렬이 안된 상품 list를 지우고 다시그려야 하기에
// 지우는 역할 함수 제작
const removeItems = () => {
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    // 문서에서 요소를 지우는 매소드 remove();
    item.remove();
  });
};

// 오름차순 Bt 기능
const sortAsce = () => {
  if (!myProducts) {
    alert('상품 목록을 먼저 불러와주세요.');
    return;
  }

  // products.data == data 배열
  // sort(); => 배열을 정렬시키는 매소드
  // ※ 비교 함수를 생략하면 유니코드 순서로 정렬됨.
  // a - b 오름차순
  // ex) 1, 200, 40, 9...

  const mySort = products.data.sort((a, b) => {
    return a.price - b.price;
  });

  removeItems();
  // 기존의 정렬되지 않은 list를 지워주는 removeItems(); 함수를 실행하고
  // 정렬이된 배열인 myProducts를 forEach문을 사용해서 각각의 요소를
  // createItem을 활용하여 다시 생성.
  mySort.forEach((product) => {
    createItem(product);
  });
};

// 내림차순 Bt 기능
const sortDesc = () => {
  if (!myProducts) {
    alert('상품 목록을 먼저 불러와주세요.');
    return;
  }
  // products.data == data 배열
  // sort(); => 배열을 정렬시키는 매소드
  // ※ 비교 함수를 생략하면 유니코드 순서로 정렬됨.
  // b - a 내림차순
  // ex) 1, 200, 40, 9...
  const mySort = products.data.sort((a, b) => {
    return b.price - a.price;
  });

  removeItems();
  // 기존의 정렬되지 않은 list를 지워주는 removeItems(); 함수를 실행하고
  // 정렬이된 배열인 myProducts를 forEach문을 사용해서 각각의 요소를
  // createItem을 활용하여 다시 생성.
  mySort.forEach((product) => {
    createItem(product);
  });
};

// 저장된 데이터를 불러오기
const createItem = (product) => {
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const div = document.createElement('div');

  // 가격표시할 때 한국(원)으로 자동 포맷팅 하는 법
  // 포맷팅할 언어 태그 (한국 - 'ko-KR', 옵션 ({key, value}))
  // .format(포맷팅할 데이터)
  const price = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(product.price);

  // li, h3, div에 들어갈 데이터 값, class 명..
  li.id = product.id;
  h3.className = 'name';
  h3.innerText = product.name;
  div.className = 'price';
  div.innerText = price;

  li.append(h3, div);
  ul.append(li);

  /*  sample data 생성 방식
      <li id="1">
          <h3 class="name">Title</h3>
          <div class="price">15,000원</div>
      </li>
  */
};

const importData = () => {
  // products가 존재할 경우에만 실행 되게끔 if문을 걸어줌.
  if (products) {
    select.selectedIndex = 0;
    myProducts = products.data;

    // products => 상품정보 object
    // if문 추가로 같은 id값을 가진 product가 존재하지 않을 경우에만
    // createItem을 실행시켜 button 클릭 시 중복으로 가져오지 않게끔 방지.
    products.data.map((product) => {
      if (!document.getElementById(product.id)) {
        createItem(product);
      }
    });
  }
};
// 상품목록 불러오기 Bt evnet
button.addEventListener('click', importData);

// 오름차순 (asceButton), 내림차순 (descButton) Bt event
asceButton.addEventListener('click', sortAsce);
descButton.addEventListener('click', sortDesc);

//필터 선택 event
select.addEventListener('change', selectCategory);
