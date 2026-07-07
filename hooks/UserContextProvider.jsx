import { useState } from 'react'
import React from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({ children }) => {
  const [mail, setMail] = useState("")
  const [pw, setPw] = useState("")
  const [uid, setUid] = useState(0)
  const [name, setName] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [createdAt, setCreatedAt] = useState("")

  return (
    <UserContext.Provider
      value={{
        mail, setMail,
        pw, setPw,
        uid, setUid,
        name, setName,
        profileImage, setProfileImage,
        createdAt, setCreatedAt,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider