import {React} from 'react';

const Tasks= (props) => {


    const {status,value, id} = props.list;

    return (
        <>
        
        <div  className="item" key={id}>
           <h2 style={(status==="completed")?{textDecoration:"line-through"}:{textDecoration:"none"} }>{value} </h2>
           {
               (status==="completed") ? 
               <button style={{textDecoration:"none"}} className="remove-btn" onClick={()=>{
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