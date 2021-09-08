import {React} from 'react';
import {useState} from 'react';

const Tasks= (props) => {

    const [textColor, setTextColor] = useState('black')

    const {task, id} = props.list;

    return (
        <div className="item" key={id}>
           <h2 style={{color:textColor}}>{task}</h2>
          
           <button onClick={()=>{
               props.remove(id)
           }}>Remove</button>
           {/* <button  onClick={()=>{
               setTextColor('red')
           }}>Done</button> */}
        </div>
    )

};

export default Tasks;