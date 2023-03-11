import React, { useEffect, useState } from "react";
import { decodeToken, isExpired, } from "react-jwt";
import {Link} from "react-router-dom"

const ProductList=()=>{
    const [product,setProduct]=useState([])

    useEffect(()=>{
         getProduct()
    },[])

    const getProduct=async()=>{
        let result= await fetch('http://localhost:5000/get-product',{
            method:'get',
            headers:{
               'Content-Type':'Application/json'
            }
        })
        result=await result.json()
        // console.log(result.data)
        // console.log(product)
        console.log(result.data.map((item)=>item))
        setProduct(result.data)
        
    }
    const jsonWebToken=JSON.parse(localStorage.getItem('user'))
        
        const decodedToken = decodeToken(jsonWebToken.data);
    //    console.log(decodedToken)
        const userId = decodedToken.userId;
        const expiredAt = decodedToken.exp;
        // const userId = decodedToken.userId;
        console.log(userId)
    const deleteProduct=async(id)=>{
   console.log(id)
   let result= await fetch(`http://localhost:5000/delete-product/${id}`,{
    method:'delete',
    headers:{
       'Content-Type':'Application/json',
       'x-api-key':jsonWebToken.data
    }
})
result=await result.json()
console.log(result)
if(result.message=='Product has been deleted successfully'){
    alert('Product Deleted Successfully')
}
    }

    
    return (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>Category</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.company}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <button style={{backgroundColor:'green' ,borderRadius:'7px', color:'bisque', margin: '5px',
  padding: '10px'}} onClick={()=>deleteProduct(product._id)}>Delete</button>
               
               <button  style={{backgroundColor:'green' ,borderRadius:'7px', color:'bisque',margin: '5px',
  padding: '10px'}}><Link to={"/update/"+product._id} style={{color: 'bisque', textDecoration:'none'}}>Update</Link></button> 
              </tr>
            ))}
          </tbody>
        </table>
      ); 
    
}
export default ProductList