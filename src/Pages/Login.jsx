import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import Logo from './Logo.jpeg'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { loginRoute } from '../utils/apiRoutes';
const Register = () => {
const navigate = useNavigate();
    const styledToast = {
        position: "bottom-center",
        type: "error",
        autoclose: 10000,
        pauseOnHover: true,
        theme: "dark"

    }
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
    })

    useEffect(()=>{
        if(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
            navigate('/');
        };
    }, []);

    const handleChange=(event)=>{
        setValues({...values, [event.target.name]:event.target.value});
        console.log(values);
    }
    const handleValidate =()=>{
        const { password, confirmpassword, username, email} = values;
        if(!username || !email || !password ){
            toast(
                "No field should be kept empty",
                styledToast
            );
            return false;
        }
        return true;

    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidate()){
            const {email, username, password} = values;
            const {data }= await axios.post(loginRoute, {
                username,
                password,
            });
            if(data.status === false){
                toast(data.msg, styledToast);
            }
            if (data.status === true){
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
                navigate("/");
        }
        }
    }
  return (
    <div>
        <FormContainer>
        <form action='' onSubmit={(event)=> handleSubmit(event)}>
            <div className='heading'>
                <img src={Logo} alt='logo'></img>
                <h2>Buzz Chat</h2>
            </div>
            <input type='text' placeholder='Username' name='username' onChange={(e)=>{handleChange(e)}}/>
            <input type='email' placeholder='Email-id' name='email' onChange={(e)=>{handleChange(e)}}/>
            <input type='password' placeholder='Password' name='password' onChange={(e)=>{handleChange(e)}}/>
            <button type='submit'>Let's Chat</button>
            <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
        </FormContainer>
        <ToastContainer />
    </div>
  )
}

const FormContainer = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   flex-direction: column;
   justify-content: center;
   gap: 1rem;
   align-items: center;
   background-color: gray;
   .heading{
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img{
        height: 4rem;
        border-radius: 3rem;
      }
      h2{
        color: darkgreen;
        font-size: 2rem
      }
   }
   form {
    width: 350px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(2,0,1);
    border-radius: 2.5rem;
    padding: 3rem 4rem;
   }
   input{
     background-color: transparent;
     padding: 1rem;
     border: 0.1rem solid darkgreen;
     border-radius: 0.7rem;
     color: white;
     width: 100%;
     font-size: 1rem;
     &:focus { 
        border: 0.1rem solid White;
        outline: none;
     }
   }
   button{
      background-color: darkgreen;
      color: white;
      padding: 1rem 3rem;
      border: none;
      cursor:pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      &:hover{
        background-color: green;
      }
   }
   span{
      color: white;
       a{
        width: 100%;
        color: white;
        font-weight: bold;
        text-align: center;
      }
   }

`

export default Register
