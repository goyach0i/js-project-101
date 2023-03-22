const button = document.querySelector('button');

// 버튼 클릭 시 실행 할 이벤트 함수
const togglePlay = () => {
  const video = document.querySelector('video');
  // video.paused(비디오 정지상태)
  // 멈춰있는 상태에서 버튼을 클릭 했다면 버튼을 pause로 바꾸고 video를 play시켜라
  if (video.paused) {
    button.innerText = 'Pause';
    video.play();
    // 반대로 멈춰있다면 video를 멈추고 버튼을 play로 바꿔라
  } else {
    button.innerText = 'Play';
    video.pause();
  }
};

// 버튼 클릭 시 실행 togglePlay라는 이벤트를 실행해라
button.addEventListener('click', togglePlay);
