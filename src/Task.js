import {React} from 'react';
import {useState} from 'react';

const Tasks= (props) => {

    const [textColor, setTextColor] = useState('black')

    const {colour,value, id} = props.list;

    return (
        <>
        <div style={{backgroundColor:colour}} className="item" key={id}>
           <h2 style={{color:textColor}}><del>{value} </del></h2>
           {
               (colour==="rgb(7, 245, 114)") ? 
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