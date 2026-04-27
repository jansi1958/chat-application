import React, {useState,  useEffect} from 'react';
import styled from 'styled-components';
import HelloBee from './HelloBee.png'

const Welcome = () => {
    const [userName, setUserName] =useState("");
    useEffect(async()=>{
        setUserName(
            await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY).username)
        );
    }, []);
  return (
    <Container>
        <img src={HelloBee} alt='Hello' />
        <h1>Helloooo!! <span>{userName}...</span></h1>
        <p>Please select among contacts to start buzzy chatting</p>
    </Container>
  )
}

const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img{
    height: 15rem;
}
span{
    color: darkgreen;
}`

export default Welcome
