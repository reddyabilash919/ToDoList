// import logo from './logo.svg';
import './App.css';
import Task from './Task.js';
// import Budget from './Budget'
import {useState, useEffect}  from 'react';
import Axios from 'axios';
// import uuid from 'uuid/v4';

const url ='http://api.quotable.io/random';
const app_url = "13.211.180.24"


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
    const response = await fetch(`http://${app_url}:3003/api/get`)
    const data = await response.json();
    console.log( "data is " + data);
    // setToDoList({...data});
    setToDoList(data);
  }

  useEffect(() => {
    getQuotes();
  }, [])

  useEffect(() => {
    fetchData();
  }, [toDoList])

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(task) {
      let newId=new Date().getTime().toString();
      const status = "created";
      Axios.post(`http://${app_url}:3003/api/insert`,{
        id:newId,
        list : task,
        status:status,
    })
     setToDoList([...toDoList,{value: task, id:newId, status:status}])
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
      Axios.delete(`http://${app_url}:3003/api/delete/${id}` )
    
  }

  const done =(id) => {
     const newList = toDoList.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
         status:"completed",
        };
        
    console.log(id)
    console.log(toDoList)
        return updatedItem;
      }
      return item;
    }
    );
     console.log(id + " axios id ")
     Axios.put(`http://${app_url}:3003/api/update`,{
        id : id,
        status:"completed",
    })
 
    setToDoList(newList);
    
    
    
  }

  const clearAll = ()=> {
    Axios.delete(`http://${app_url}:3003/api/delete/all`)
     setToDoList([])
  }

  const resetAll =() =>{

    const newList = toDoList.map((item) => {
    
        const updatedItem = {
          ...item,
         status:"created",
        };
        
    
    console.log(toDoList)
        return updatedItem;
      }
     
    
    );

    Axios.put(`http://${app_url}:3003/api/reset/all`)
    
    setToDoList(newList);
  }



  return (
    <main>
       <div className="title">
        <h1>uTask</h1>
        <div className="underline"></div>
      </div>
      <header className="header-container">
      <h2><i><q>{quotes.content}</q></i></h2>
      </header>
      
        

    <section className="section">
        <form >
          <input 
          type="text" 
          name="task" 
          value ={task} 
          onChange={ (e)=>{
            setTask(e.target.value);
          }}
           autoFocus/>
        <button className="btn" onClick={handleSubmit}  disabled={!task}>Add </button>
        </form >
       {
         toDoList.map((task) => {
           return <Task list={task} remove={remove} done={done} ></Task>
         })
       }
       
      </section>
      <div className="container">
        { (toDoList.length !==0) ? 
          <button style={{ colour:'black'}} className="reset-btn" onClick={()=>{
                resetAll()
            }} >Reset</button>
            : <div> </div>
          }
        {
          (toDoList.length !==0) ? 
          <button  className="clearall-btn" onClick={()=>{
                clearAll()
            }} >Clear All</button>
            : <div> </div>

          }
           
         
          

          
      </div>
        
    </main>

  );
}

export default App;


