import logo from './logo.svg';
import './App.css';
import Task from './Task.js';
// import Budget from './Budget'
import {useState, useEffect}  from 'react';
//import Axios from 'axios';

const url ='http://api.quotable.io/random';


function App() {

  const [task, setTask ] = useState('')
  const [toDoList, setToDoList] = useState([]);
  const [quotes, setQuotes] = useState({});

  const getQuotes = async () => {
    const response = await fetch(url);
    const data = await response.json()
   
    setQuotes({...data});
  
  }

  const fetchData = async ()=>{
    const response = await fetch("http://localhost:3003/api/get")
    const data = await response.json();
    setToDoList({...data});
  }

  useEffect(() => {
    getQuotes();
    // fetchData();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(task) {
      const addTask = {task, id:new Date().getTime().toString()}
      // const addTask = {task}
      // console.log(addTask)
      setToDoList((toDoList) =>{
        return [...toDoList,addTask]
      });

    //   Axios.post("http://localhost:3003/api/insert",{
    //     list : task
    // }).then(()=>{
    //   alert("successful");
    // })
      
      setTask('');
     
    }
    else {
      console.log('empty values');
    }
  };
   

  const remove =(id) => {
    let newList = toDoList.filter((list) =>
      list.id !== id);
      setToDoList(newList)
    
  }

  return (
    <main>
      <header>
      <h1>{quotes.content}</h1>
      </header>
      
         <div className="title">
        <h2>To Do List</h2>
        <div className="underline"></div>
      </div>
      {/* <section className="section">
        <form >
          <input 
          type="text" 
          name="task" 
          value ={task} 
          onChange={ (e)=>{
            setTask(e.target.value);
          }}/>
        <button className="btn" onClick={handleSubmit} >Add </button>
        </form >
       {
         toDoList.map((task) => {
           return <Task list={task} remove={remove}></Task>
         })
       }
      </section>
    </main> */}

    <section className="section">
        <form >
          <input 
          type="text" 
          name="task" 
          value ={task} 
          onChange={ (e)=>{
            setTask(e.target.value);
          }}/>
        <button className="btn" onClick={handleSubmit} >Add </button>
        </form >
       {
         toDoList.map((task) => {
           return <Task list={task} remove={remove}></Task>
         })
       }
       
      </section>
    </main>

  );
}

export default App;


