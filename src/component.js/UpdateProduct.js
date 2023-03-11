
import React, { useState, useEffect } from "react";
import { decodeToken, isExpired, } from "react-jwt";
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'react-axios'

const UpdateProduct = () => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)
    const params = useParams()
    const navigate=useNavigate()
    useEffect(() => {
        console.log(params)
        getProductDetail()
    }, [])
    const getProductDetail = async () => {
        console.log("payload--", params.productId)
        let result = await fetch(`http://localhost:5000/get-product/${params.productId}`)
        result = await result.json()
        console.log(result)
        setName(result.data.name)
        setCategory(result.data.category)
        setPrice(result.data.price)
        setCompany(result.data.company)


    }
    const jsonWebToken = JSON.parse(localStorage.getItem('user'))

    const decodedToken = decodeToken(jsonWebToken.data);
    //    console.log(decodedToken)
    const userId = decodedToken.userId;
    const expiredAt = decodedToken.exp;
    // const userId = decodedToken.userId;
    console.log(userId)
    const updateProduct = async () => {
       
        console.log(name, company, price, category, params.productId)

        let result = await fetch(`http://localhost:5000/update-product/63fb4e6b3836d7b62377de27`, {
            method:'PUT',
            body: JSON.stringify({
                name, company, price, category, userId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': jsonWebToken.data
            }
        }).then(res=>{
           if(res){

            alert("Product Updated Successfully")
            navigate('/')
           }

        });
       
        // console.log("result",result)
        // result=await result.json()
        console.log(result)
    }





    return <div>
        <h2 className="from-head">Update Product</h2>
        <div className="form">

            <input className="inputbox" type='text' placeholder="Enter Product Name"
                value={name} onChange={(e) => setName(e.target.value)} />


            <input className="inputbox" type='text' placeholder="Enter Product Category"
                value={category} onChange={(e) => setCategory(e.target.value)} />

            <input className="inputbox" type='text' placeholder="Enter Product Price"
                value={price} onChange={(e) => setPrice(e.target.value)} />

            <input className="inputbox" type='text' placeholder="Enter Product Company "
                value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <button onClick={updateProduct} className="button-css" type="button" >Submit</button>

    </div>
}
export default UpdateProduct