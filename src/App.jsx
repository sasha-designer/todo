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
    <Advice/>
    <Clock/>
    <StopWatch/>
    <TodoInput setTodo={setTodo}/>
    <TodoList todo={todo} setTodo={setTodo}/>



    </>
  );
}

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
      setData(res);
      setIsLoading(false);
    });
  }, [url]);
  return {isLoading, data};
}




const Advice = () => {  
  const {isLoading, data} = useFetch('https://korean-advice-open-api.vercel.app/api/advice');
  return <>
  {data && (
    <> 
      <h6>{data.message}</h6>
      <h6>{data.author}</h6>
    
    
    </>
   
  )}
  
  </>
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


const formatTime = (seconds) => {
  const timeString =  `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return timeString;
}


const StopWatch = () => { 

  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOn === true) {
     const timerId = setInterval(() => {
        setTime((prev) => prev + 1)
      },1000);
      timerRef.current = timerId;
    } else {
      clearInterval(timerRef.current);
    }
    
  }, [isOn]);


  return (
    <>
    {formatTime(time)}
    <button onClick={()=>setIsOn((prev) => !prev)}>{isOn ? "끄기":"켜기"}</button>
    <button onClick={() => {
      setTime(0);
      setIsOn(false);
    }

    }>초기화</button>
    </>
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
