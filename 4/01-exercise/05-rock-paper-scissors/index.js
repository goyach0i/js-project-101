// feat: 문서에있는 모든 button들을 가져오고
// feat: buttons라는 변수에는 이제 유사배열 형태로 button3가지 정보를 담고있게 됨.
const buttons = document.querySelectorAll('button');

// 컴퓨터 선택
const computerChoice = document.querySelector('.computer-choice');

// user 선택
const userChoice = document.querySelector('.you-choice');

// 게임 결과
const winner = document.querySelector('.result');

// 가위바위보 선택 배열
const result = ['가위', '바위', '보'];

const show = (user, computer, result) => {
  // 컴퓨터 선택
  computerChoice.innerText = computer;
  // 유저 선택
  userChoice.innerText = user;
  // 최종결과
  winner.innerText = result;
};

// 게임 판별 함수
const game = (user, computer) => {
  let message;
  if (user === computer) {
    message = '무승부';
  } else {
    switch (user + computer) {
      case '가위보':
      case '바위가위':
      case '보바위':
        message = '사용자 승리 !';
        break;
      case '가위바위':
      case '바위보':
      case '보가위':
        message = '컴퓨터 승리 !';
        break;
    }
    show(user, computer, message);
  }
};

// feat: 각 버튼 클릭 시 선택샇항이 표현 됨.
const play = (event) => {
  const user = event.target.innerText;
  // 랜덤함수를 사용하여 0~2 까지 랜덤으로 뽑아옴.
  const randomIndex = Math.floor(Math.random() * 3);
  // 컴퓨터도 랜덤 숫자가 아닌 result text 배열로 가위, 바위, 보를 출력함.
  const computer = result[randomIndex];
  game(user, computer);
};

// feat: 가위바위보 3가지의 버튼모두에 동일한 event를 등록하기 위해
// feat:  배열에 사용할 forEach()문을 사용하여 eventListener를 등록.
buttons.forEach((button) => {
  button.addEventListener('click', play);
});
