/*
REDUX : DO NOT MUTATE(변형)
기존의 배열을 변경하지말고 새로운 object를 return해라
*/
import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
  return {
    type: DELETE_TODO,
    text,
  };
};

const delelteoDo = id => {
  return {
    type: ADD_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // NEVER MUTATE STATE (새로운 state를 만들어서 반환할 것)
      // ...은 spread연산자로 배열의 모든 content 값 (es6)
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO: // filter method create new array
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = text => {
  store.dispatch({ type: ADD_TODO, text });
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch({ type: DELETE_TODO, id });
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
