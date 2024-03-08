import React,{useState} from 'react'

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

  const[isEditing,setIsEditing]=useState(false);
  const[editedTitle,setEditedTitle]=useState(title);
  // editedTitle의 값이랑 setEditedTitle의 값에다가 useState 넣어주기

  const handleCompleChange = (id) => // checkbox의 id를 받아서 어떤거를 바꿀건지를 정하는 부분임.
  {
    let newTodoData = todoData.map((data) => {
      if (data.id === id)// 내가 클릭한 거랑 이벤트를 받은 아이디가 같으면 . 
      {
        data.completed = !data.completed; // 누르기전에는 false였을 테니까 반전 시키는거임.
        return data;
      }
      setTodoData(newTodoData);
      localStorage.setItem('todoData',JSON.stringify(newTodoData));
      setIsEditing(false);
      
      

    });
    //this.setState({todoData:newTodoData}); // set State 변경 . 
    setTodoData(newTodoData);
    localStorage.setItem('todoData',JSON.stringify(newTodoData));
  }

 
  const handleEditChange=(event)=>{
    setEditedTitle(event.target.value);
  }

const handleSubmit=(event)=>{
  event.preventDefault();

  let newTodoData=todoData.map(data =>{
    if(data.id===id)
    {
      data.title=editedTitle
    }
    return data;
  })
  setTodoData(newTodoData)
  setIsEditing(false);
}

if(isEditing)
{
  return(
    <div
    className={`
   } flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded`}
>
   
     
       <div className="items-center">
         <form onSubmit={handleSubmit}>
         <input  
          value={editedTitle}
          onChange={handleEditChange}
           className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
         />
         </form>
         
       </div>
       
       <div className="items-center">
         <button className="px-4 py-2 float-right" onClick={() => setIsEditing(false)}>x
         </button>


         <button onClick={handleSubmit} className="px-4 py-2 float-right" type="submit">save
         </button>


       </div>
     
   </div>
  )
}
else {
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


         <button className="px-4 py-2 float-right" onClick={() => setIsEditing(true)}>edit
         </button>


       </div>
     
   </div>
  )
}

 




  
  
});

export default List;
 

