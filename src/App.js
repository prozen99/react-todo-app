import React,{useState} from "react";//리액트 라이브러리 에서 가져옴.
import "./App.css"; {/*  파일을 가져오는 느낌으로 가는거임.*/ }
export default function App () {
  state={
    todoData:[], //객체는 맞고
  value: "", //객체 뒤에 ,로 자리확보해주는게 중요함.
  };
  const [todoData,setTodoData]=useState([]);//처음엔 빈배열로 상태정의
  const [value,setValue]=useState(""); // 값은 처음에 비어있음.
  const btnsty = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }
  const getStyle = (completed) =>{ // getStyle은 완료가 된건지 아닌지 completed인지 값을받아줌.
    return {
      padding:"10px",
      borderBottom:"1px #ccc dotted",
      textDecoration: completed? "line-through" :"none", // 삼항 연산자 이용해서
      // completed 가 true면 line-through를 그어주고 아니면 none 으로 두기 위함.
    }
  }

  

const handleClick=(id)=>// 어떤 list를 삭제할지 id를 정해줘야 내가 
//지정한 것을 삭제 할 수 있으니까 그렇게 만듬.
{
  let newTodoData=todoData.filter(data=>data.id !==id)

  //data.id ! == id 는 인수로 들어온 id와 data의 id가 다른지 판별.
  // 지금 상황에서는 클릭이벤트가 발생할때 기준으로 하는거니까
  // 2번 클릭하면 1,3 번 은 나와야하니까 2번이 아닌것을 찾는 코드를 만든것.
  //filter method는 filter 이후에서 조건을 만족시킨 녀석들만 뽑는거임
  // filter 이후에 조건을 만족한 녀석들은 새롭게 뽑혀서 배열로 만들어짐.
  setTodoData(newTodoData);
  //todoData의 상태를 new TodoData로 변경해 줘라 라는 의미임.
  //handleclick 함수 내부에서 상태를 변경해주는 부분임. todoData
  //와 new Todo Data를 이용해서.
  console.log('newTodoData',newTodoData);
}

const handleChange=(e)=>
{
  console.log('e',e.target.value);// 이렇게 하면 실제로 내가 입력하는 값이 
  // 출력되게 되는데 이값을 상태변화로 만들어주면됨.
  setValue(e.target.value); // value 값을 e.target.value 값으로 바꾸어줌.
}

const handleSubmit=(e)=> //제출 이벤트를 만드는 곳 . 
{
  e.preventDefault();//form 안에 input을 전송할 때 페이지 리로드 되는 것을 막아준다.

  let newTodo={
    id:Date.now(), // 유니크한 키 생성 
    title:value, // 상태 값을 저장하기 위한 value 
    completed:false,
  };

  setTodoData(prev =>[...prev,newTodo]);
  setValue("");
  // spread 확산 연산자라고도 하는데 ... 은 지금 state의 todoData의 모든 상태를 newTodo의
  //상태로 변환 시키고 그값을 todoData에 다시 넣어줘 라는의미이다.
  //추가적으로 newTodo 뒤에 value "" 는 input에다가 입력해주고 나면 값을 다시 비워줘야하니까
  // 넣어 주는 부분임.
  //즉시 평가 하는 부분임.
}
const handleCompleChange=(id)=> // checkbox의 id를 받아서 어떤거를 바꿀건지를 정하는 부분임.
{
  let newTodoData=todoData.map((data)=>{
    if(data.id===id)// 내가 클릭한 거랑 이벤트를 받은 아이디가 같으면 . 
    {
      data.completed=!data.completed; // 누르기전에는 false였을 테니까 반전 시키는거임.
    }
    return data;
     
  });
  //this.setState({todoData:newTodoData}); // set State 변경 . 
  setTodoData(newTodoData);
}


  
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할일 목록</h1>
          </div>

          {todoData.map(data=>( 
             <div style={getStyle(data.completed)} key={data.id}>
             <input type="checkbox" defaultChecked={false} 
             onChange={()=>{handleCompleChange(data.id)}}
             
             />
             {data.title}
             <button style={btnsty} onClick={()=>handleClick(data.id)}>x</button>
             {
               /*
               data값이 새롭게 들어오게 된다면 , div에 스타일은 저렇게
               입히고 input값도 주고 여러 속성을 줄수 있는 부분이다
               동적 처리  하는부분
               */
              
             }
           </div>
          ))}
          <form style={{display:'flex'}} onSubmit={handleSubmit}>
            <input type="text" name="value" style={{flex:'10',padding:'5px'}}
            placeholder="해야 할 일을 입력하세요"
            value={value}
           
          

            onChange={handleChange}
            /> 
            <input
            type="submit"
            value="입력"
            className="btn"
            style={{flex:'1'}}
            />
          </form>
        </div>
      </div>)

  
}