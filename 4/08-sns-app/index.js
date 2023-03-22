/*
  userId를 활용해서 서버에 해당 id를 가진 user의 정보를 요청하여 받은뒤, 
  user의 정보를 표시해줌. (API 문서 참고하여 진행)
*/
const getUserById = (id) => {
  const URL = `https://jsonplaceholder.typicode.com/users/${id}`;

  /*
    fetch로 url호출 하고 응답결과 잡아줌
    return으로 사용자의 정보가 담긴 객체를 return하게 됨
    fetch()는 비동기적으로 처리됨
  */
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
};

/*
  게시물을 모의서버에서 받아왔을 때 화면에 표시될 event
  async를 인자 앞에 넣어주면 비동기 함수로 지정됨
*/
// index.html에서만 작동되게 해야하기에 전역으로 빼줌
const feed = document.querySelector('.feed');

const createPost = async (post) => {
  const wrap = document.createElement('div'); //전체를 감싸줄 div
  const user = document.createElement('a'); // user a태그 (링크)
  const article = document.createElement('div'); // 게시물 내용 들어갈 div
  // 생성해준 각 요소 class명 지정
  wrap.className = 'post';
  user.className = 'user';
  article.className = 'article';

  wrap.id = post.id; // 게시물의 id를 구분하기 위한 post.id를 전체 div요소(wrap)에 지정
  article.innerText = post.body; // 본문을 삽입
  /*
    fetch()문으로 비동기적 처리를 하게되면 userInfo로 정보를 받아오는 시간을 기다리지 않고
    다음 요청을 실행하기 때문에 화면에 username이 제대로 출력되지 않는다..(순서가 보장되게 수정해야함 asncy, await)
  */
  const userInfo = await getUserById(post.userId); // return해주는 user의 정보를 받아옴
  user.innerText = `@${userInfo.username}`; // 게시물 작성자의 user id, name
  user.href = './user.html'; // 작성자 id를 클릭하면 user.html페이지로 이동
  // 어떤 user든 클릭하면 무조건 user.html로 이동하고 id값을 localstorage로 저장
  user.addEventListener('click', () => {
    localStorage.setItem('userId', post.userId);
  });

  // 내용을 채우기 전, 예시처럼 div안에 들어갈 자식요소를 append 해줌
  wrap.append(user, article);
  feed.append(wrap);

  /* 게시물 생성 예시
    <div class="post">
        <a class="user" href="#">@user</a>
        <div class="article">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quasi!
        </div>
    </div> 
  */
};

// 서버에 저장된 게시물 정보를 받아오는 부분
const getAllPosts = () => {
  const URL = 'https://jsonplaceholder.typicode.com/posts';

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        createPost(post);
      });
    });
};

// user.html에서는 feed가 필요 없기에 feed가 있을 경우에만 실행 될 수 있도록 조건문 설정
if (feed) {
  getAllPosts(); // 서버에 저장된 게시물 정보를 받아옴 (전역에서 실행)
}
