import React,{useState,useCallback} from "react";//리액트 라이브러리 에서 가져옴.
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";
 
const initialTodoData=localStorage.getItem("todoData") ? JSON.parse
(localStorage.getItem("todoData")):[];

export default function App () {
  //state={
  //  todoData:[], //객체는 맞고
  //value: "" //객체 뒤에 ,로 자리확보해주는게 중요함.
  //};
  
  const [todoData,setTodoData]=useState(initialTodoData);//처음엔 빈배열로 상태정의
  const [value,setValue]=useState(""); // 값은 처음에 비어있음.
  



  const handleClick = (id) => 
  {
    let newTodoData = todoData.filter(data => data.id !== id)
    setTodoData(newTodoData);
    localStorage.setItem('todoData',JSON.stringify(newTodoData));
    console.log('newTodoData', newTodoData);
  };





const handleSubmit=(e)=> //제출 이벤트를 만드는 곳 . 
{
  e.preventDefault();//form 안에 input을 전송할 때 페이지 리로드 되는 것을 막아준다.

  let newTodo={
    id:Date.now(), // 유니크한 키 생성 
    title:value, // 상태 값을 저장하기 위한 value 
    completed:false,
  };

  setTodoData(prev =>[...prev,newTodo]);
  localStorage.setItem('todoData',JSON.stringify([...todoData,newTodo]));
  setValue("");
  // spread 확산 연산자라고도 하는데 ... 은 지금 state의 todoData의 모든 상태를 newTodo의
  //상태로 변환 시키고 그값을 todoData에 다시 넣어줘 라는의미이다.
  //추가적으로 newTodo 뒤에 value "" 는 input에다가 입력해주고 나면 값을 다시 비워줘야하니까
  // 넣어 주는 부분임.
  //즉시 평가 하는 부분임.
}

const handleRemoveClick =()=>
{
  setTodoData([]);
  localStorage.setItem('todoData',JSON.stringify([]));
}

  
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
        <div className="w-full p-5 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg" >
          <div className="flex justify-between mb-3">
            <h1 className>할일 목록</h1>
            <button onClick={handleRemoveClick}>Delete All</button>
          </div>
         
          <Lists  handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>
          <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>

          
          
        </div>
      </div>)

  
}