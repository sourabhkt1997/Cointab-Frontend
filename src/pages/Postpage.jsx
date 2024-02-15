import PostpageCss from "../styles/post.module.css"

import {React, useState,useEffect } from 'react'
import { json, useLocation ,useParams} from 'react-router-dom';
import axios from "axios"
import Heading from "../components/Heading"
import Button from "../components/Button"
let baseurl="https://cointabbackend-xg88.onrender.com"



function Postpage() {

  const location = useLocation();
  const QueryParamValue = location.state?.jsonId;
  const {id}=useParams()
  
  const [data,setData]=useState([])
  const [name,setName]=useState(null)
  const [company,setCompany]=useState(null)
  const[posts,setPosts]=useState([])
  const[isAdded,setIsadded]=useState(false)

  const fetchPost=async()=>{
    try {
        const response=await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${QueryParamValue}`)
        
        setData(response.data)
        console.log(data)
    } catch (error) {
      console.log(error)
    }
 }
  
  useEffect(()=>{
   fetchPost()
  },[])

  const fetchuser=async()=>{
    try {
        const response=await axios.get(`${baseurl}/user/userpost/${id}`)
        
        setName(response.data.msg.name)
        setCompany(response.data.msg.companyName)
        
    } catch (error) {
      console.log(error)
    }
 }
  
  useEffect(()=>{
   fetchuser()
  },[])

  const bulkAdd=async()=>{
    try {
      let x=id
      let fiteredPost=data.map(({userId,id,...rest})=>({...rest,userId:x}))
      setPosts(fiteredPost)
      const response= await axios.post(`${baseurl}/user/bulkadd/${id}`,
      {posts:posts},{
      headers: {
        'Content-Type': 'application/json',
      }
      })
       console.log(response.data)
       setIsadded(!isAdded)
    } catch (error) {
      if(error.response){
        if(error.response.data.msg=="already added"){
          setIsadded(!isAdded)
        }
      }
    }
    

  }

  const download=async()=>{
    try {
      console.log(id)
       let response=await axios.get(`${baseurl}/user/download/${id}`,{
        responseType:"blob"
       })
       const blob = new Blob([response.data], { type: response.headers['application/json'] });
       const link = document.createElement('a');
       link.href = window.URL.createObjectURL(blob);
       link.download = 'posts.xlsx';
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
    } catch (error) {
      console.log(error)
    }

  }
  

  return (
    <div >
      <Heading/>
      <p><b>{name}</b>'s post are showing here`</p>

      {!isAdded? <Button content="Bulk Add" onClick={bulkAdd}/>: <Button content="Download in Excel" onClick={download}/>}
     
      <div>
         {
          data.map(ele=>(
            <div key={ele.id} className={PostpageCss.card}>
                <p>Name : {name}</p>
                <p>Title : {ele.title}</p>
                <p>Body : {ele.body}</p>
                <p>Company : {company}</p>
            </div>
          ))
         }
      </div>
    </div>
  )
}

export default Postpage