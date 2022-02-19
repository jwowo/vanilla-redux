import { createStore } from "redux"; // 우리의 데이터를 저장할 공간을 만들어줌
// state 우리의 어플리케이션에서 변경되는 데이터이다
// readux가 countModifier를 부르고, dispatch는 countModifier로 메세지를 보낸다.
// counterModifier가 return하는 값이 데이터가 된다.

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");
number.innerText = 0;

// string으로 action type을 지정하면 오타가 날때 찾기 어렵기 때문에 constant로 지정해서 사용한다.
// (js가 오타 알려줌)
const ADD = "ADD";
const MINUS = "MINUS";

// reducer는 우리의 데이터를 변경하는 함수, reducer가 return하는 값이 데이터의 값이 된다.
// reducer 함수만 유일하게 데이터를 변경시킬 수 있다. (다른 것들은 state을 변경시킬 수 없다.)
// 따라서 밖에서 countModifier와 communication 해야한다.
// communication하는 방법은 countModifier에게 action을 보낸다.
const countModifier = (count = 0, action) => {
  //initialize the state
  // 이 함수내에서 action을 통해 값을 변경한다.
  // 어떻게 countModifier에게 action을 보낼 수 있을까? -> dispatch

  // reducer 함수는 switch-case문으로 작성하는 것이 좋다. (refactor)
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier); // store을 만들면 reducer를 넣어줘야함
// 총 4개의 함수 (dispatch, getState, subscribe, replaceReducer)
// subscribe은 우리에게 store 안에 있는 변화들을 알 수 있게 해준다.
console.log(countStore);

const onChange = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
