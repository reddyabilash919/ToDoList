import {React} from 'react';
import {useState} from 'react';

const Tasks= (props) => {

    const [textColor, setTextColor] = useState('black')

    const {colour,value, id} = props.list;

    return (
        <>
        <div style={{backgroundColor:colour}} className="item" key={id}>
           <h2 style={{color:textColor}}>{value}</h2>
           {
               (colour==="rgb(24, 218, 34)") ? 
               <button className="remove-btn" onClick={()=>{
               props.remove(id)
           }}>Remove</button>
           :
                <button className="done-btn" onClick={()=>{
               props.done(id)
           }}>done</button> 
           
            
           } 
        </div>
        
          

       
        </>
    )

};

export default Tasks;