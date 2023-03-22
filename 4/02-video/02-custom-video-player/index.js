const video = document.querySelector('video');
// video 재생, 정지 버튼
const playButton = document.querySelector('.play-pause');
// video 재생 배속 버튼
const rateButtons = document.querySelectorAll('.rate');
// 사운드 조절 bar
const volumeBar = document.querySelector('input');

// 현재 진행된 비디오 시간에 맞춰서 시간 Bar style을 변경 시켜
// 진행중임을 표현.
const updateProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  const progressBar = document.querySelector('.bar');
  progressBar.style.width = `${percent}%`;

  if (video.ended) {
    pause();
  }
};

// 시간 표시 부분에서 소숫점 날리는 포맷팅 작업
const formatting = (time) => {
  const sec = Math.floor(time % 60);
  const min = Math.floor(time / 60) % 60;
  const hour = Math.floor(time / 3600);

  const fsec = sec < 10 ? `0${sec}` : sec;
  const fmin = min < 10 ? `0${min}` : min;
  const fhour = hour < 10 ? `0${hour}` : hour;

  return `${fsec}:${fmin}:${fhour}`;
};

// 비디오 재생 시간 타임 event
const updateTime = () => {
  const current = document.querySelector('.current');
  const duration = document.querySelector('.duration');

  current.innerText = formatting(video.currentTime);
  duration.innerText = formatting(video.duration);
};

// 볼륨 바 조절 event
const setVolume = (event) => {
  video.volume = event.target.value;
};

// .rate 배속 버튼 중 어떤 버튼이 클릭 되었는지
const setRate = (event) => {
  const { rate } = event.target.dataset;
  video.playbackRate = rate;
};

// video 재생 함수
const play = () => {
  playButton.innerText = '||';
  video.play();
};

// video 정지 함수
const pause = () => {
  playButton.innerText = '▶';
  video.pause();
};

// play-pause버튼 클릭시 작동할 event
const togglePlay = () => {
  // 삼항연산자로 video.pause가 true라면 play()함수를,
  // false라면 pause()함수를 실행.
  video.paused ? play() : pause();
};

// video 재생, 정지 event
playButton.addEventListener('click', togglePlay);

// 배속버튼 event
rateButtons.forEach((button) => {
  button.addEventListener('click', setRate);
});

// volumeBar 조절 시 event
volumeBar.addEventListener('change', setVolume);

// video 재생 시간 event
video.addEventListener('timeupdate', updateTime);

// 현재 video 진행 시간 Bar
video.addEventListener('timeupdate', updateProgress);
