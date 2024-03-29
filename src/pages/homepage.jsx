import HomeCSS from "../styles/home.module.css"
import axios from "axios"
import {React, useState,useEffect } from 'react'
import Button from "../components/Button"
import Heading from "../components/Heading"
import {useNavigate } from 'react-router-dom'

let baseurl="https://cointabbackend-xg88.onrender.com"

function Homepage() {
    const [data,setData]=useState([])
    let navigate=useNavigate()

  const fetchUser=async()=>{
      try {
          const response=await axios.get("https://jsonplaceholder.typicode.com/users")
          
          const updatedData=response.data.map(user=>({...user,isAdded:false,isAlreadyAdded:false}))

          setData(updatedData)

          console.log(data)
      } catch (error) {
        console.log(error)
      }
   }

  
   const addUser=async(user)=>{
    
    try {
      const{ name, username, email, phone, website, address, company }  = user

       const response=await axios.post(`${baseurl}/user/adduser`,{
         name,
         username,
         email,
         street:address.street,
         suite: address.suite,
         city: address.city,
         zipcode: address.zipcode,
         lat: address.geo.lat,
         lng: address.geo.lng,
         companyName: company.name,
         companyCatchPhrase: company.catchPhrase,
         companyBs: company.bs,
         phone,
         website

       })
       console.log(response.data)
       var isAddChange= data.map(ele=>(ele.email===user.email?{...ele,isAdded:true,PGid:response.data.id}:ele))
        setData(isAddChange)

    } catch (error) {
      if(error.response){
      console.log(error.response.data)
      if(error.response.data.msg=="already in database click open button"){
        let isAlreadyAddChange= data.map(ele=>(ele.email===user.email?{...ele,isAlreadyAdded:true,PGid:error.response.data.id}:ele))
        setData(isAlreadyAddChange)
        console.log(data)
       }
      }
    }
   }


  return (
    <div className="App">
      <Heading />
      <Button content="All Users" onClick={fetchUser}/>
      <div>
         {data.map((ele,index)=>(
           <ul key={ele.id} className={HomeCSS.card}>
            <li><b>Name :</b>{ele.name}</li>
            <li><b>Email :</b>{ele.email}</li>
            <li><b>Phone :</b>{ele.phone}</li>
            <li><b>Website :</b>{ele.website}</li>
            <li><b>City :</b>{ele.address.city}</li>
            <li><b>Company :</b>{ele.company.name}</li>
            {ele.isAdded || ele.isAlreadyAdded?<Button content="open" type="click" onClick={()=>navigate(`/post/${ele.PGid}`,{state:{jsonId:ele.id}})}/>:<Button content="Add" type="click" onClick={()=>addUser(ele)}/>}

            {ele.isAlreadyAdded? <h5>Already added click open button</h5> : (ele.isAdded?<h5>added to database</h5>:null)}
           </ul>        
         ))}
      </div>
    </div>
  );
}

export default Homepage
