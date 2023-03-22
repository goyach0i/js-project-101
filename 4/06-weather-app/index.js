// https://openweathermap.org/ : 날씨 API 주소
import { API_KEY } from './env.js'; // 보안을 위한 셋팅

// 가져온 위도와 경도의 현재 날씨는 보내달라는 요청
const getCurrentWeather = (latitude, longitude) => {
  /*
    https://openweathermap.org/api
    Current Weather Data (API 문서) -> 요청을 보내야할 URL 주소
    {lon} -> 요청을 보낼때 포함 해야할 정보들
    ?lat(현재날씨를 알고싶은 위치의 위도 값), &lon=(경도 값),  API key 지급받은 api key,
    units = 특정 단위 변경
  */

  // 요청을 보내야할 URL 주소  &units=metric : 섭씨 단위로 지정
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  /* fetch 사용법 : https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
     API를 간단하게 호출할 수 있는 매소드 (인자로 호출을 보내고자 하는 URL주소를 넘겨주면 됨)
     fetch라는 매소드로 URL로 요청을 보내고, 성공하면 response라는 개체를 넘겨받아서
     해당 객체에서 돌려받은 요청에 대한 응답을 json()으로 parsing(구문 분석)해서 return.
     js에서 사용할 수 있는 data라는 실제 요청했던 정보 객체가 넘어옴.
  */
  fetch(URL)
    //.then fetch매소드에 이어서 순서대로 처리하기 위한 메소드
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector('.city'); // 현재 위치
      const weather = document.querySelector('.weather'); // 현재 날씨
      const temp = document.querySelector('.temp'); // 현재 온도
      const icon = document.querySelector('.icon'); // 날씨에 대한 icon

      city.innerText = data.name; // 현재 위치
      weather.innerText = data.weather[0].main; // 현재 날씨
      temp.innerText = `${data.main.temp} °C`; // 현재 온도

      /*
        날씨에 맞는 icon 가져오기 => https://openweathermap.org/weather-conditions
        ${data.weather[0].icon} = 넘어오는 data의 현재 날씨에 대한 icon을 넣어줌
      */
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    });
};

/*
  현재위치를 가져오기 성공 event
  position -> 위치정보를 가져오는데 성공하여 위치정보가 담긴 객체로 넘어옴
*/
const getPosition = (position) => {
  // latitude : 위도, longitude : 경도 (구조분해를 통해 담아줌)
  const { latitude, longitude } = position.coords;
  // 가져온 위도와 경도의 현재 날씨는 보내달라는 요청
  getCurrentWeather(latitude, longitude);
};

// error event
const errorHandler = (error) => {
  console.log(error.message);
  // 사용자가 허용하지 위치정보를 차단했다면 뜨는 error 메시지
  const noti = document.querySelector('.noti');
  noti.style.display = 'block';
};

/*
  사용자의 현재 위치 (좌표 가져오기) 단, 허락을 받은 후 가져와야함.
  navigator.geolocation 이라는 객체가 없다면 이 기능을 사용할 수 없다 라고 조건을 걸어줌.
  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
*/
//geolocation이라는 객체를 사용할 수 있는 경우
if ('geolocation' in navigator) {
  /*
    이 app이 user의 위치정보를 사용해도 되는지 물어보는..
    인자 1. = 현재위치를 가져오는데 성공하면 실행되는 콜백함수 (getPosition)
    인자 2. = error발생 시 실행되는 콜백 함수 (errorHandler)
  */
  navigator.geolocation.getCurrentPosition(getPosition, errorHandler);
} else {
  // geolocation IS NOT available
  console.log('geolocation IS NOT available');
}
