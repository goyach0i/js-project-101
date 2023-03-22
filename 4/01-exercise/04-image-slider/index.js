const images = document.querySelectorAll('.item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// 이미지의 순서를 images 배열의 index로 item class를 조작
// 첫번째 index를 의미하는 0으로 지정
let index = 0;

// images = 3 이지만 index 는 0, 1, 2 순으로 나오기 때문에 -1을 해줘야 함.
let lastIndex = images.length - 1;

const updateImage = () => {
  images.forEach((img) => {
    // remove로 show라는 class 지우기
    img.classList.remove('show');
  });
  // 변경한 현재 index에 add매소드로 show라는 class 추가
  images[index].classList.add('show');
};

// feat: 이전 이미지 슬라이드 버튼 동작
const moveToPrev = () => {
  if (index === 0) {
    index = lastIndex;
  } else {
    index--;
  }
  updateImage();
};

// feat: 다음 이미지 슬라이드 버튼 동작
const moveToNext = () => {
  // index의 길이는 2까지이기 때문에 2이상 클릭되면 다시 0으로 돌리기..
  if (index === lastIndex) {
    index = 0;
  } else {
    index++;
  }
  // show라는 class명 작업 불러오기
  updateImage();
};

// feat: 이전 이미지 슬라이드 버튼 event
prevButton.addEventListener('click', moveToPrev);

// feat: 다음 이미지 슬라이드 버튼 event
nextButton.addEventListener('click', moveToNext);
