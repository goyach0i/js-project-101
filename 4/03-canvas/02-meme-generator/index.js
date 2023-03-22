//결과 표시될 canvas
const canvas = document.querySelector('canvas');
// 파일 업로드할 file 타입 input
const imageFile = document.querySelector('#image-file');
// 글을 작성할 input을 감싸고 있는 div자체 호출
const textInputs = document.querySelectorAll('.text');
// 이미지에 작성할 top,bottom-text라는 input 호출
const topTextInput = document.querySelector('#top-text');
const bottomeTextInput = document.querySelector('#bottom-text');

// context 2d
const ctx = canvas.getContext('2d');

let image;
let width;
let height;

// canvas에 텍스트를 그리는 방법이 동일하기 때문에
// 전역변수로 지정
let topText = '';
let bottomText = '';

// 이미지에 text를 입력한 대로 그려주는 event (위치, 크기대비)
const drawText = () => {
  const offsetY = height / 20; // 이미지 세로크기
  const fontSize = width / 10; // fontSize

  // text를 그리기위한 속성 setting
  ctx.font = `${fontSize}px sans-serif`; // 폰트
  ctx.fillStyle = 'white'; // 글자 색
  ctx.textAlign = 'center'; // 글자 위치
  ctx.strokeStyle = 'black'; // 글자 외곽 선
  ctx.lineWidth = fontSize / 5; //글자 외곽 선 두께
  ctx.lineJoin = 'round'; //글자를 둥글게

  // 2개 text를 한번에 (위, 아래) update
  // fillText() == 텍스트 그리기, strokeText() == 텍스트 외곽선 그리기
  // *** 중요 ***
  // 외곽선을 채워넣는 메소드와, 텍스트 내부를 색칠해서 그려주는 메소드를
  // 따로 호출해주는 방식이기 때문에 반드시 strokeText()를 먼저 호출하고
  // fillText() 호출해야 의도한대로 외곽선이 텍스트 주변으로만 생성된것 같이 보임.

  // top
  ctx.textBaseline = 'top';
  ctx.strokeText(topText, width / 2, offsetY); // x = 가운데 y = 처음에 계산한 y값
  ctx.fillText(topText, width / 2, offsetY);
  // bottom
  ctx.textBaseline = 'bottom';
  // offset 위치가 하단에 그려져야 하기 때문에 height - offsetY
  ctx.strokeText(bottomText, width / 2, height - offsetY);
  ctx.fillText(bottomText, width / 2, height - offsetY);
};

// topText라는 input에 글을 작성 했을 경우 일어나는 event
const updateTopText = (event) => {
  topText = event.target.value;
  drawText();
};
// bottomText라는 input에 글을 작성 했을 경우 일어나는 event
const updateBottomText = (event) => {
  bottomText = event.target.value;
  drawText();
};

// text이름을 가진 input = none이었던 display를 flex로 바꿈
const showInputs = () => {
  textInputs.forEach((input) => {
    input.style.display = 'flex';
  });
};

// canvas크기를 업로드한 이미지 크기로 지정하고
// canvas 위에 이미지를 load 시킬 event
const uploadImage = () => {
  width = image.width; //선택한 이미지 넓이를 width에 삽입
  height = image.width; //선택한 이미지 높이를 width에 삽입

  canvas.width = width; //canvas가 선택한 이미지 넓이에 맞게
  canvas.height = height; //canvas가 선택한 이미지 높이에 맞게

  //그림을 그리기 위해 drawImage() 변수 사용.
  // 1. 그릴 객체, 2. x좌표, 3. y좌표
  ctx.drawImage(image, 0, 0);

  // 이미지가 업로드 되었을 때 input창이 함께 실행되도록..
  showInputs();
};

// 파일 업로드 event
const createImage = (event) => {
  // 제작된 파일을 다운로드하기 위한 .url생성.
  const imageUrl = URL.createObjectURL(event.target.files[0]);

  // 작업 완성된 이미지에 제작해준 url소스 삽입.
  image = document.createElement('img');
  image.src = imageUrl;

  // 파일선택 후 페이지에 이미지를 load할 event
  image.addEventListener('load', uploadImage);
};

// 파일 업로드 event
imageFile.addEventListener('change', createImage);

// top, bottomText라는 input에 글을 작성 했을 경우 일어나는 event
topTextInput.addEventListener('change', updateTopText);
bottomeTextInput.addEventListener('change', updateBottomText);
