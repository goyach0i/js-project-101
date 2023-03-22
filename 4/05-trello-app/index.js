const form = document.querySelector('form');

const blocks = document.querySelectorAll('.list'); // 마우스 위치를 찾아 이동할 위치의 id를 찾기 위해

/*
  출발지점 체크 (출발지점이 어딘지 알아야 지우고 새롭게 추가되기 때문)
  from - 출발 위치
  to - 도착 위치
*/
let from, to;

// 할일 들이 추가될 배열
let todoList = [],
  doingList = [],
  doneList = [];

const lists = {
  //key값: 배열
  todo: todoList,
  doing: doingList,
  done: doneList,
};

// 마우스 우클릭을 통한 삭제 event
const removeTodo = (event) => {
  event.preventDefault(); // 할 일이라는 요소에 우클릭 시 평쇼에 뜨던 메뉴가 뜨지 않도록 해줌.

  const { id } = event.target; // 삭제하려는 대상의 id
  const { id: listId } = event.target.parentElement; // 해당 요소가 포함되어 있는 부모 id (ex: todo, doing, done)

  event.target.remove(); // 화면에서 지우기 위한 remove매소드
  /*
    lists[listId]를 사용하여 저장되어 있는 list의 배열을 가져오고
    filter매소드를 활용하여 todo.각 요소의 id값이 지우고 싶은 id와 같이 않을 때만 return하게 만들어서
    선택해서 지운 요소를 제외한 새로운 배열로 update되게 만들어줌.
  */
  lists[listId] = lists[listId].filter((todo) => {
    return todo.id !== id;
  });

  // 지워서 update해줬으니 saveList() 호출하여 해당 키값의 list를 최신 값으로 update해주기
  saveList(listId);
};

// 저장기능을 담당 할 함수, listId값을 받아서 해당 값을 최신버전으로 저장해주는 기능
const saveList = (listId) => {
  // listId = 해당 ID 값을 받는 list배열(todo, doing, done), lists[listId] = 해당 ID로 담긴 섹션에 할일들.
  localStorage.setItem(listId, JSON.stringify(lists[listId]));
};

// 마우스 드래그오버 된 요소들의 list 위치를 기록
const dragOver = (event) => {
  event.preventDefault(); //딜레이 없이 이동 할 수 있도록

  const { id: targetId } = event.target; // id 가져오는 부분 (targetId)
  /*
    lists의 키값들, 선택할 수 있는 list의 id목록 가져옴
    Object.keys를 사용하여 lists를 전달
  */
  const listIds = Object.keys(lists);

  /* if문으로 includes메소드를 사용하여 target의 id가 listIds에 있다면
    true = to의 값을 업데이트
    includes() == 배열, 문자열이 특정 값을 포함 하는지 확인하는 메소드
  */
  if (listIds.includes(targetId)) {
    to = targetId;
  }
};

// 드래그 시작
const dragStart = (event) => {
  from = event.target.parentElement.id; //parentElement = 부모태그 찾기(현재 위치) 출발점 기록

  to = from; // 이동을 시킨게 정확하지 않을 시 출발점과 같게 만들어줌.
};

// 드래그 끝
const dragEnd = (event) => {
  const { id } = event.target; // 이동할 할일요소에 id찾기

  // 이동을 시킨게 정확하지 않을 시 출발점과 같게 만들어줌.
  if (from === to) {
    return;
  }

  // 출발점에서 지워줌
  event.target.remove();
  /* 
    lists객체에 출발점을 나타내는 from이라는 키값을 사용해서 특정 배열에 접근 가능하니
    filter매소드를 사용하여 해당 id 값을 가진 요소를 제외한 새로운 배열로 update
  */
  lists[from] = lists[from].filter((todo) => {
    /*
      todo.id값이 드래그한 요쇼의 id값과 같지 않은 경우에만 todo를 return하고
      값을 다시 lists[from]에 update
    */
    if (todo.id !== id) {
      return todo;
      // 반대로 같다면
    } else {
      /* 
        도착지점에 list에 새로운 요소를 생성함.
        to : 도착지점 배열,
        todo : 해당 todo 정보 추가
      */
      createElement(to, todo);
    }
  });
  // 출발 list 삭제하고 도착 list에서 추가를 했으니
  saveList(from); // 출발 list 저장
  saveList(to); // 도착 list 저장
};

/* 
  feat: submit event 후 list 추가 event (To Do 부분)
  넘겨받은 2개 인자 = list를 구분하는 : listId인자, 입력한 내용의 id, text를 가지는 2번째 인자 (todo)
*/
const createElement = (listId, todo) => {
  /*
    백틱을 사용해 전달받은 listId로 : #${listId} 이렇게 해주면
    string(text)으로 전달해준 listId와 동일한 ID 값을 가진 요소를 선택 해옴 (id="todo")
  */
  const list = document.querySelector(`#${listId}`);

  const item = document.createElement('div'); // 만들 Item의 div

  // item이 가지는 정보들
  item.id = todo.id; //item id값
  item.innerText = todo.text; //item의 text값
  item.className = 'item'; // style 지정 위함.
  item.draggable = true; //드래그 위한 지정 (html 요소를 드래그 할 수 있게됨)

  item.addEventListener('dragstart', dragStart); // 드래그 시작 event
  item.addEventListener('dragend', dragEnd); // 드래그 끝 event
  item.addEventListener('contextmenu', removeTodo); // 마우스 우클릭 삭제 event

  list.append(item); // item을 가져온 list에 append해서 화면에 넣어줌

  lists[listId].push(todo); // lists에 listId 키값에 해당하는 배열에 넘긴 todo객체가 push됨
};

// feat: form에 할일 을 입력하고 submit event
const createTodo = (event) => {
  event.preventDefault(); // a 태그 나 submit은 => 이동이나 새로고침되어 실행하는데 그걸 막아준다.

  const input = document.querySelector('input'); // 입력 text 부분
  const id = uuidv4(); // 식별을 위한 id 부분 (고유ID 활용)

  /* 
    UUID = 범용고유 식별자 (식별자를 만드는 표준)
    https://cdnjs.com/libraries/uuid -> 버전(8.3.2) -> v4
    -> html -> script src에 추가 -> uuidv4()매소드 호출
  */

  // id와 입력한 text가 포함된 변수 (새로운 객체)
  const newTodo = {
    id,
    text: input.value,
  };

  /*
    3개의 섹션을 구분하기위해 'todo'라는 인자를 받고, newTodo를 두번째 인자로 넘겨줌.
    todo로 하는 이유는 먼저 추가하면 무조건 todo로 가기 때문에...
    'todo' => input에 할일을 입력하여 추가하면 id='todo'로 갈거기 때문에 지정.
    newTodo => 첫번째 인자('todo')로 받은 값과 같은 (div의)
    id값을 가진 섹션에 todo를 추가하기 위한 요소 createEiement('todo', newTodo);
  */
  createElement('todo', newTodo);
  input.value = ''; // 화면에 추가되면 작성하는 input창을 초기화

  /*
    createElement에 실행시켜주면 loadList에서 조건문에 의해 forEach문으로 list가 있을 시
    반복적으로 로드, 저장, 로드, 저장이 일어나기에 새로운 객체를 만들 때만 저장 할 수 있도록 createTodo에 실행
  */
  saveList('todo'); // 실행되면 localstorage에 listId값과 함께 저장됨.
};

// localstorage에 저장된 값을 불러옴, 각각의 key값으로 저장이 되기에 가져올 때도 각각 가져오도록.
const loadList = () => {
  //JSON.parse 자바스크립트의 객체로 가져오는 방법
  const userTodoList = JSON.parse(localStorage.getItem('todo'));
  const userDoingList = JSON.parse(localStorage.getItem('doing'));
  const userDoneList = JSON.parse(localStorage.getItem('done'));

  /* 
    todo, doing, done 각각에 list가 있을 수도, 없을 수도 있기에 조건문을 걸어주고,
    forEach문을 활용하여 각각의 요소를 createElement를 통해 각각 todo, doing, done라는 섹션에 추가
  */
  if (userTodoList) {
    userTodoList.forEach((todo) => {
      createElement('todo', todo);
    });
  }

  if (userDoingList) {
    userDoingList.forEach((todo) => {
      createElement('doing', todo);
    });
  }

  if (userDoneList) {
    userDoneList.forEach((todo) => {
      createElement('done', todo);
    });
  }
};

loadList(); // 저장한 값을 불러와야 하기에 글로벌로 호출

form.addEventListener('submit', createTodo); // form에 할일 을 입력하고 submit event

// 3개의 id값을 가진 div의 위치를 찾아 event를 실행하기 위한 forEach문
blocks.forEach((block) => {
  block.addEventListener('dragover', dragOver);
});
