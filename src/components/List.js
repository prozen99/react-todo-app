import React from 'react'

const List =React.memo(({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
  handleClick,
  

}) => {

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

 



 




  
  return (
    <div key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
    className={`${
     snapshot.isDragging ? "bg-gray-400":"bg-gray-100"
   } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
>
   
     
       <div className="items-center">
         <input type="checkbox" defaultChecked={false}
           onChange={() => { handleCompleChange(id) }}

         />
       </div>
       <span className={completed ? "line-through" : undefined}>{title}</span>
       <div className="items-center">
         <button className="px-4 py-2 float-right" onClick={() => handleClick(id)}>x
         </button>
       </div>
     
   </div>
  )
});

export default List;
 

