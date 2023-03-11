import React, { useEffect, useState } from "react";
import { decodeToken, isExpired, } from "react-jwt";
import {Link} from "react-router-dom"

const Profiles=()=>{
    const [profiles,setProfiles]=useState([])

    useEffect(()=>{
        getProfiles()
    },[])

    const getProfiles=async()=>{
        let result= await fetch('http://localhost:5000/profiles',{
            method:'get',
            headers:{
               'Content-Type':'Application/json'
            }
        })
        result=await result.json()
        
        console.log(result.data.map((item)=>item))
        setProfiles(result.data)
        
    }
    
  

    
    return (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Phone</th>
              
            </tr>
          </thead>
          <tbody>
            {profiles.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.email}</td>
                <td>+91-{product.phone}</td>
                 </tr>
            ))}
          </tbody>
        </table>
      ); 
    
}
export default Profiles