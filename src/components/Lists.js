import React from 'react'
import { DragDropContext, Droppable, Draggable, } from 'react-beautiful-dnd';
//rfc = 함수형 컴포넌트 rce=클래스형 컴포넌트 
import List from "./List";

export default function Lists({ todoData, setTodoData }) {



  const handleCompleChange = (id) => // checkbox의 id를 받아서 어떤거를 바꿀건지를 정하는 부분임.
  {
    let newTodoData = todoData.map((data) => {
      if (data.id === id)// 내가 클릭한 거랑 이벤트를 받은 아이디가 같으면 . 
      {
        data.completed = !data.completed; // 누르기전에는 false였을 테니까 반전 시키는거임.
      }
      return data;

    });
    //this.setState({todoData:newTodoData}); // set State 변경 . 
    setTodoData(newTodoData);
  }


  const handleClick = (id) =>// 어떤 list를 삭제할지 id를 정해줘야 내가 
  //지정한 것을 삭제 할 수 있으니까 그렇게 만듬.
  {
    let newTodoData = todoData.filter(data => data.id !== id)

    //data.id ! == id 는 인수로 들어온 id와 data의 id가 다른지 판별.
    // 지금 상황에서는 클릭이벤트가 발생할때 기준으로 하는거니까
    // 2번 클릭하면 1,3 번 은 나와야하니까 2번이 아닌것을 찾는 코드를 만든것.
    //filter method는 filter 이후에서 조건을 만족시킨 녀석들만 뽑는거임
    // filter 이후에 조건을 만족한 녀석들은 새롭게 뽑혀서 배열로 만들어짐.
    setTodoData(newTodoData);
    //todoData의 상태를 new TodoData로 변경해 줘라 라는 의미임.
    //handleclick 함수 내부에서 상태를 변경해주는 부분임. todoData
    //와 new Todo Data를 이용해서.
    console.log('newTodoData', newTodoData);
  }

const handleEnd=(result) =>{
  console.log('result',result); //result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트발생
  // 목적지가 없으면 (이벤트 취소) 이 함수를 종료합니다.
  if(!result.destination) return; // 목적지 없으면 return

  const newTodoData =[...todoData];//todoData의 전체 를 가져오는 거임 

  //변경 시키는 아이템을 배열에서 지워줍니다
   //return 값으로 지워진 아이템을 잡아줍니다.
  const [reorderedItem]=newTodoData.splice(result.source.index,1);
  //source가 result의 index임 지금 내가 집은 녀석의 인덱스를 

 //원하는 자리에 reorderedItem을 insert 해줍니다
 newTodoData.splice(result.destination.index,0,reorderedItem); // 지금 
 // splice의 용법을 생각해보면 ,
 setTodoData(newTodoData);// class Component에서 SetState 같은거임 
  

}




  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                   <List
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    completed={data.completed}
                    todoData={todoData}
                    setTodoData={setTodoData}
                    provided={provided}
                    snapshot={snapshot}
                   />
                  )}
                </Draggable>
              ))}
             
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
