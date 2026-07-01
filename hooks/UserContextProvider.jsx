import { useState } from 'react'
import React from 'react'
import UserContext from './UserContext'
const UserContextProvider = ({children}) => {
    const[mail,setMail]=useState("haha");
    const[pw,setPw]=useState("");
    const [uid,setUid]=useState(0);
  return (
    <UserContext.Provider value={{mail,setMail,pw,setPw,uid,setUid}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
