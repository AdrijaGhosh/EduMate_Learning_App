import React from 'react'
import { View, Text ,Pressable} from 'react-native'
import { TextInput } from 'react-native'
import axios from 'axios'
import { useState } from 'react'

const Signup = ({ navigation }) => {

    const [name,setName]=useState("");
    const[mail,setMail]=useState("");
    const [pw,setPw]=useState("");
    const[exists,setExists]=useState(false);

    function handlePress() {
           if (exists) return;
        axios.post("http://localhost:3000/users",{
            email:mail,
            password:pw,
            name:name,
            createdAt:new Date().toISOString()
        }).then(()=>navigation.navigate('Login'));
    }

    function checkEmail(email){
        setMail(email);
        axios.get("http://localhost:3000/users")
        .then((resp) => {
            let found = false;

            resp.data.map((user) => {
                if (user.email === email) {
                    found = true;
                }
            });

            setExists(found);
        });
    }

    return (
        <View>
            <Text>Enter Name</Text>
            <TextInput placeholder="Enter Name" value={name} onChangeText={(e)=>setName(e)}/>
            <Text>Enter Email</Text>
            <TextInput placeholder="Enter Email" value={mail} onChangeText={checkEmail}/>
            {exists && <Text>Email already exists</Text>}
            <Text>Enter Password</Text>
            <TextInput placeholder="Enter Password" value={pw} onChangeText={(e)=>setPw(e)}/>

            <Pressable onPress={handlePress}>
                <Text>Create Profile</Text></Pressable>
        </View>
    )
}

export default Signup
