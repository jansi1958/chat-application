import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import {io} from 'socket.io-client'
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import AllContacts from '../Components/AllContacts';
import { allUsersRoute, host } from '../utils/apiRoutes';
import Welcome from '../Components/Welcome'
import ChatContainer from '../Components/ChatContainer'

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);

  // useEffect( async ()=>{
  //   if(!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
  //     navigate("/login");
  //   } else{
  //     setCurrentUser(
  //       await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
  //     );
  //   }
  // }, []);

  // useEffect(()=>{
  //   if(currentUser){
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser])

  // useEffect( async ()=>{
  //   if(currentUser){
  //     const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //     setContacts(data.data);

  //   }
  // }, [currentUser]);

  const handleChangeChat= (chat) =>{
    setCurrentChat(chat);
  };
  return (
    <div>
      <Container>
        <div className='container'>
          <AllContacts contacts={contacts} changeChat={handleChangeChat}></AllContacts>
          {currentChat === undefined ? (
            <Welcome/>
            ) : (
            <ChatContainer currentChat={currentChat} socket={socket}></ChatContainer>
          )}
        </div>
      </Container>
    </div>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat
