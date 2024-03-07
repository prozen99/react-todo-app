import React from 'react'

export default function Form({handleSubmit,value,setValue}) {
    const handleChange=(e)=>
{
  console.log('e',e.target.value);// 이렇게 하면 실제로 내가 입력하는 값이 
  // 출력되게 되는데 이값을 상태변화로 만들어주면됨.
  setValue(e.target.value); // value 값을 e.target.value 값으로 바꾸어줌.
};
  return (
      
    <form  onSubmit={handleSubmit} className="flex">
    <input type="text" name="value" 
    className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
    placeholder="해야 할 일을 입력하세요"
    value={value}
   
  

    onChange={handleChange}
    /> 
    <input
    type="submit"
    value="입력"
    className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white
    hover:bg-blue-200"
   
    />
  </form>
  )
}
