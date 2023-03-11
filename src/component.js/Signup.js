import React ,{useState,useEffect}from "react";
import {useNavigate} from 'react-router-dom'

const Signup=()=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const [error,setError]=useState(false)

    const navigate=useNavigate()
     
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[])

    const collectData= async()=>{

        if(!name||!phone||!email||!password){
            alert('All Field Are Require')
            setError(true)
          return false
      }
        console.log(name,phone,email,password)
        let result= await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,phone,email,password}),
            headers:{
               'Content-Type':'Application/json'
            }
        })
        result=await result.json()
        console.log(result)
        if(result){
            localStorage.setItem('user',JSON.stringify(result))
              navigate('/')
              alert('Successfully Registered')
        }
    }
    return(
        <div ><h2 className="from-head" >REGISTER</h2>
        <div className="form">
        <input className="inputbox" type ="text" 
        value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />

        <input className="inputbox" type ="text" 
        value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter mobile number" />
        
        <input className="inputbox" type ="email" 
        value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
       
        <input className="inputbox" type ="password" 
        value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" />
          </div>
            <button  onClick={collectData} className="button-css" type="button" >sign up</button>
       
        </div>
    )
}
export default Signup