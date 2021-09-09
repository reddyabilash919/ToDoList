// import logo from './logo.svg';
import './App.css';
import Task from './Task.js';
// import Budget from './Budget'
import {useState, useEffect}  from 'react';
import Axios from 'axios';
// import uuid from 'uuid/v4';

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
    console.log(data);
    // setToDoList({...data});
    setToDoList(data);
  }

  useEffect(() => {
    getQuotes();
     fetchData();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(task) {
       const addTask = {task}
      let newId=new Date().getTime().toString();
      const colour ="white";
      Axios.post("http://localhost:3003/api/insert",{
        id:newId,
        list : task,
        colour: colour,
    })
     setToDoList([...toDoList,{value: task, id:newId, colour:colour}])
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
       console.log(id  + " remove id ")
      Axios.delete(`http://localhost:3003/api/delete/${id}` )
    
  }

  const done =(id) => {
     const newList = toDoList.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          colour: "rgb(24, 218, 34)",
        };
        
    console.log(id)
    console.log(toDoList)
        return updatedItem;
      }
      return item;
    }
    );
     console.log(id + " axios id ")
     Axios.put("http://localhost:3003/api/update",{
        id : id,
        colour: "rgb(7, 245, 114)",
    })
 
    setToDoList(newList);
    
    
  }

  const clearAll = ()=> {
    Axios.delete("http://localhost:3003/api/delete/all")
    setToDoList([])
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
           return <Task list={task} remove={remove} done={done} ></Task>
         })
       }
       
      </section>
      <div className="container">
        {
          (toDoList.length !==0) ? 
          <button style={{backgroundColor:'red', colour:'black'}} className="btn" onClick={()=>{
                clearAll()
            }} >Clear All</button>
            : <div> </div>

          }
          
      </div>
        
    </main>

  );
}

export default App;


