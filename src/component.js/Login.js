import React ,{useState,useEffect}from "react";
import {useNavigate} from 'react-router-dom'

const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const navigate=useNavigate()
     
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[])

    const handleLogin=async()=>{
        if(!email||!password){
            alert('Email And Password Both Are Require')
            setError(true)
          return false
      }
        console.log(email,password)
        let result= await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
               'Content-Type':'Application/json'
            }
        })
        result=await result.json()
        console.log(result)
        if(result.message=='login succefully'){
            localStorage.setItem('user',JSON.stringify(result))
              navigate('/')
        }
        else{
            alert('Please provide correct details')
        }
    }

    return <div className="from-head-for-login">
        <h1>Enter Your Email And Password Here</h1>
        <div className="form">
        <input className="inputbox" type="text"
        value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
        
       <input className="inputbox" type="password" 
       value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
       </div>
       <div>
       <button  onClick={handleLogin} className="button-login" type="button" >login</button>
       </div>
    </div>
    
}

export default Login