import React from 'react'

const List =({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,

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
}

export default List;
 

