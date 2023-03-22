const canvas = document.querySelector('canvas');
// 색깔 지정.
const color = document.querySelector('#color');
// 선 굵기
const width = document.querySelector('#width');
// canvas 지우기
const clear = document.querySelector('.clear');
// canvas 그림 저장
const save = document.querySelector('.save');

//context = 캔버스의 환경
// 2차원 랜더링 context 생성
const ctx = canvas.getContext('2d');

// 저장될 파일의 배경, 크기 지정
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 그림을 그리는 중인지..
let isPainting = false;
//선의 두께
let lineWidth = 5;

// save 버튼 클릭 시 event
save.addEventListener('click', (event) => {
  // 이미지로 저장 (toBlob >> 콜백함수 필요)
  canvas.toBlob((blob) => {
    const a = document.createElement('a');

    // 특정 파일을 인자로 넣어주면 객체 url을 생성해주는 매소드
    // 생성된 blob을 가르키는 주소를 a.href에 넣어줌.
    a.href = URL.createObjectURL(blob);
    // 다운로드 이름 지정
    a.download = 'goyachoi.jpg';
    // a 함수 클릭 함수
    a.click();
  });
});

// canvas Clear 버튼 event
clear.addEventListener('click', (event) => {
  // clearRect() = 사각형 영역을 지우는 매소드 (총 4개의 인자가 필요 x,y ,가로, 세로)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 선의 두께 변경에 대한 event
width.addEventListener('change', (event) => {
  lineWidth = event.target.value;
});

color.addEventListener('change', (event) => {
  // strokeStyle 선의 색깔을 정하는 속성
  // event.target.value = 현재 event(change)의 대상의 결과.
  ctx.strokeStyle = event.target.value;
});

// 마우스가 canvas를 벋어났을 때 그리는 event를 멈춤
canvas.addEventListener('mouseout', (event) => {
  isPainting = false;
});

// canvas 위에서 마우스를 움직일 경우 event
canvas.addEventListener('mousemove', (event) => {
  // 현재 마우스를 클릭 중인지 if문으로 구분하여 event 실행
  // isPaintinf === false라면 그냥 return
  if (!isPainting) {
    return;
  }

  //선의 굵기 전역변수
  ctx.lineWidth = lineWidth;
  //선의 끝 부분을 둥글게
  ctx.lineCap = 'round';

  // 이전 경로부터 지정된 위치까지 선을 그리는 매소드.(x와 y 좌표값이 필요)
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
});

// canvas에 마우스를 클릭 했을 때 event
// beginPath()로 새로운 경로를 지정.
canvas.addEventListener('mousedown', (event) => {
  isPainting = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
});

// canvas에 마우스를 땠을 때 event
canvas.addEventListener('mouseup', (event) => {
  isPainting = false;
});
