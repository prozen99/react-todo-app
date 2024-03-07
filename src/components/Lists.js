import React from 'react'
import { DragDropContext, Droppable, Draggable, } from 'react-beautiful-dnd';
//rfc = 함수형 컴포넌트 rce=클래스형 컴포넌트 
import List from "./List";





const Lists = React.memo(({todoData,setTodoData}) => {
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
});

export default Lists;
  


