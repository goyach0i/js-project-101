const updateProfile = (userInfo) => {
  const name = document.querySelector('.name');
  const email = document.querySelector('.email');
  const website = document.querySelector('.website');
  // name은 벡틱을 사용해서 표현 ES6
  name.innerText = `${userInfo.name} (@${userInfo.name})`; //user의 name
  email.innerText = userInfo.email; // user의 email
  // user에게 이메일을 보낼 수 있도록 백틱을 사용해서 메일앱 실행토록 함
  email.href = `mailto: ${userInfo.email}`;
  website.innerText = userInfo.website; // user의 website 주소
  website.href = `http://${userInfo.website}`; // 클릭 시 이동할 주소
  website.target = '_blank'; // 클릭시 새 탭에서 열릴 수 있도록 할 target 설정
};

// 사용자의 정보를 받아오기 위한 함수 (비동기 함수로 정의)
const loadUserProfile = async () => {
  // index.js에서 저장해놓은 user의 정보를 받아옴
  const userId = localStorage.getItem('userId');
  // 정보를 받아서 사용하려면 응답을 기다려야 하기에 비동기 함수로 await을 걸어줌
  const userInfo = await getUserById(userId);
  updateProfile(userInfo);
  console.log(userInfo.username);
};

loadUserProfile();
