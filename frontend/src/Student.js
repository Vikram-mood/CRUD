import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link } from 'react-router-dom'
function Student(){
    const [student, setData]=useState([]);
    useEffect(()=>{

        fetch("http://localhost:8081/")
        .then(res =>res.json())
        .then(data =>setData(data))
        .catch(err => console.log(err))

    },[]);

    /*function my_function(int res){
        return res.json()
    }*/
    const handleDelete = async(id)=>{
        
        try {
            console.log("waiting in the handle delete");
            await axios.delete('http://localhost:8081/students/'+id)
            window.location.reload()
        }
        catch(err){
            console.log("error in handle Delete function");
            console.log(err);
        }
    }


    return(
        <div >
            <div>
                <Link to='/create' className="btn btn-success">Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                           
                            <th>Email</th>
                            <th>Action</th>
                               
                        </tr>
                    </thead>
                    <tbody>
                        {   student.map((d,i)=>(
                            <tr key={i}>
                                <td>{d.Name}</td>
                                <td>{d.Email}</td>
                                <td>
                                
                                    <Link to={`update/${d.ID}`} className="btn btn-primary ms-2"> Update</Link>
                                    <button onClick ={(e)=>handleDelete(d.ID)} className="btn btn-danger ms-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Student;