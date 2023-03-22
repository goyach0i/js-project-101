import { API_KEY } from './env.js';
const form = document.querySelector('form');

// 검색되면 기존 영화정보를 지우고 새로그려주기 위한 함수
const removeAll = () => {
  const movies = document.querySelectorAll('.movie');

  movies.forEach((movie) => {
    movie.remove();
  });
};

// form 영화 검색 event
const searchMovie = (event) => {
  event.preventDefault();
  // 검색 input
  const input = document.querySelector('input');

  // input의 value값을 구조분해로 가져와 keyword라는 이름으로 지정
  const { value: keyword } = input;

  // 검색 결과 요청에 대한 URL (API 문서 참조)
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`;

  //검색창 부분이 공백이 아닐 때만 실행
  if (keyword) {
    removeAll();
    // fetch로 url호출 하고 응답결과 잡아줌
    fetch(searchURL)
      .then((response) => response.json())
      .then(({ results }) => {
        results.forEach((movie) => {
          // results라는 배열에 forEach문을 사용해서 createBlock에 영화정보를 넘겨 각 요소를 생성해줌
          createBlock(movie);
        });
      });
  }
  input.value = '';
};

const movieDetail = (event) => {
  //parentElement 부모요소 = movie 라는 div
  const { id } = event.target.parentElement;
  // 클릭시 이용할 상세 영화정보 페이지
  const detailURL = `https://www.themoviedb.org/movie/${id}`;
  // 상세정보 페이지를 새 창에서 띄우기 위해
  /*
    첫번째 인자는 이동할 페이지 URL 주소
    두번째 인자는 새 창을 띄울 윈도우의 이름이고,
    _blank로 지정하는 이유 : 특수 속성 값으로 이름이 없는 창이라는 의미한다.
    이름이 없는 창이므로 위의 코드가 계속 호출되더라도 계속 해서 새창을 띄움
  */
  window.open(detailURL, '_blank');
};

// forEach문으로 각각의 영화정보를 넘겨받음
// movie를 구조분해로 영화의 id, 포스터이미지, original title, title, 평점평균, 개봉일을 가져옴
const createBlock = ({
  id,
  poster_path,
  original_title,
  title,
  vote_average,
  release_date,
}) => {
  // contents라는 div요소의 자식으로 붙여주기 위한 호출
  const parent = document.querySelector('.contents');
  const movie = document.createElement('div');
  const poster = document.createElement('img');
  const detail = document.createElement('div');
  const info = document.createElement('div');
  const date = document.createElement('div');
  const rate = document.createElement('div');
  const h3 = document.createElement('h3');

  // 만들어준 각 요소에 class명을 삽입해줌 (css 파일에 지정해준 class대로 지정)
  movie.className = 'movie';
  detail.className = 'detail';
  info.className = 'info';
  date.className = 'date';
  rate.className = 'rate';

  // 내용 채우기
  movie.id = id; //영화 id로 지정
  /*
    img에 들어갈 이미지 src은 해당 API 제공 홈페이지에서 
    API 문서를 통해 가져오고 사이즈와 url을 설정 해줌
  */
  poster.src = `https://image.tmdb.org/t/p/original/${poster_path}`;
  h3.innerText = `${original_title} (${title})`; // h3에 들어갈 해당 영화 제목
  date.innerText = release_date; // 개봉 일
  rate.innerText = `⭐ ${vote_average}`; // 평균 평점

  // poster 클릭시 해당 영화 상제정보 페이지로 이동
  poster.addEventListener('click', movieDetail);

  // 예시처럼 div안에 들어갈 자식요소를 append 해줌
  info.append(date, rate);
  detail.append(info, h3);
  movie.append(poster, detail);
  parent.append(movie);

  /*
    <div class="movie">
        <img src="" alt="" />
        <div class="detail">
            <div class="info">
                <div class="date">release_date</div>
                <div class="rate">vote_average</div>
            </div>
            <h3>original_title (title)</h3>
        </div>
    </div> 
  */
};

const getPopularMovies = () => {
  // url에 api_key를 직접 넣으면 안되고 외부파일에 만들어놓은 상수API_KEY를 사용
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

  /*
    fetch()메소드를 사용해서 API를 호출해주는 부분을 함수로 묶어주고
    forEach()문을 활용해서 각각의 영화정보를 화면에 그러줌
  */
  fetch(URL)
    .then((response) => response.json())
    .then(({ results }) =>
      results.forEach((movie) => {
        createBlock(movie);
      }),
    );
};

/*
  인기영화정보를 가져오고 해당정보를 가지고 화면에 각 영화에 대한 element(요소)를 생성하게 만들어줄 것
  API 문서를 확인하여 어떻게 보내야 하는지 확인
*/
getPopularMovies();

// form 영화 검색 event
form.addEventListener('submit', searchMovie);
