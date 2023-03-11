
import React, { useState,useEffect } from "react";
import { decodeToken, isExpired, } from "react-jwt";


const AddProduct=()=>{
    const [name,setName]=useState("")
    const [category,setCategory]=useState("")
    const [price,setPrice]=useState("")
    const [company,setCompany]=useState("")
    const [error,setError]=useState(false)

   

    const addProduct=async()=>{

        if(!name||!price||!company||!category){
            alert('All Field Are Require').fontcolor( "red" )
            setError(true)
          return false
      }
        console.log(name,price,company,category)
        const jsonWebToken=JSON.parse(localStorage.getItem('user'))
        
        const decodedToken = decodeToken(jsonWebToken.data);
    //    console.log(decodedToken)
        const userId = decodedToken.userId;
        const expiredAt = decodedToken.exp;
        // const userId = decodedToken.userId;
        console.log(userId)
        // console.log(expiredAt)
        let result= await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
               'Content-Type':'Application/json',
               'x-api-key':jsonWebToken.data
            }
        })
        result=await result.json()
        console.log(result)
        if(result.message=='Product created successfully'){
            alert('Product Added Successfully')
        }
    }

    return <div>
        <h2 className="from-head">Add-Product</h2>
        <div className="form">
       
        <input  className="inputbox" type='text' placeholder="Enter Product Name"
         value={name} onChange={(e)=>setName(e.target.value)} />
         
       
        <input className="inputbox" type='text' placeholder="Enter Product Category"
         value={category} onChange={(e)=>setCategory(e.target.value)}/>
       
        <input className="inputbox" type='text' placeholder="Enter Product Price"
         value={price} onChange={(e)=>setPrice(e.target.value)} />
       
        <input className="inputbox" type='text' placeholder="Enter Product Company "
        value={company} onChange={(e)=>setCompany(e.target.value)} />
        </div>
        <button onClick={addProduct}  className="button-css" type="button" >Add-Product</button>
        
    </div>
}
export default AddProduct