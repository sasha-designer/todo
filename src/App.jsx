import { useEffect, useRef, useState } from 'react'
import './App.css'
import { use } from 'react';

function App() {

  const [todo, setTodo] = useState([
    {
      id: Number(new Date()),
      text: 'todo item ',
    }
  ]);
 

  return (
    <>
    <Clock/>
    <TodoInput setTodo={setTodo}/>
    <TodoList todo={todo} setTodo={setTodo}/>



    </>
  );
}

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);

  }, []);

  return (
    <div>
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  )
}


const TodoInput = ({setTodo}) => {
  const inputRef = useRef(null);
  const addTodo =() => {
    const newTodo = {
      id: Number(new Date()),
      text: inputRef.current.value,
    };
    setTodo((prev) => [...prev, newTodo]);
  }


  return (
    <>
    <input ref={inputRef} />
    <button onClick={addTodo}>add</button>
    </>
  )
}

const TodoList = ({todo, setTodo}) => {
  return (
    <ul>
    {todo.map(el => (
     <Todo key={el.id} todo={el} setTodo={setTodo} />
    ))}
  </ul>
  )
}

const Todo = ({todo, setTodo}) => {
  return (
    <>
     <li >{todo.text}
      <button onClick={()=>{
        setTodo((prev) => prev.filter((el) => el.id !== todo.id));
      }}>삭제</button>
      </li>
    </>
  )
}

export default App
