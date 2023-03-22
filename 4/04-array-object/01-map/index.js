// products.json === 임의로 사용할 데이터를 json으로 제작.
// products.js === 임의로 사용할 데이터를 js로 제작.

// products.json이 외부 파일을 쓰려면 script 타입을 module로 지정후 import
// import products from '../products.json' assert { type: 'json' };

// products.js는 따로 타입을 명시해줄 필요 없고 import만 해주면 됨.
import products from '../products.js';
// 상품목록 불러오기 Bt
const button = document.querySelector('button');

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
  // products => 상품정보 object
  // if문 추가로 같은 id값을 가진 product가 존재하지 않을 경우에만
  // createItem을 실행시켜 button 클릭 시 중복으로 가져오지 않게끔 방지.
  products.data.map((product) => {
    if (!document.getElementById(product.id)) {
      createItem(product);
    }
  });
};

button.addEventListener('click', importData);
