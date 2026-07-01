import React, { useContext ,useState} from 'react'
import { View ,Text,Pressable,TextInput} from 'react-native'
import UserContext from '../../hooks/UserContext'
import axios from 'axios'

const Login = ({navigation}) => {

  const{mail}=useContext(UserContext);
  const{setMail}=useContext(UserContext);
  const {pw}=useContext(UserContext);
  const {setPw}=useContext(UserContext);
  const {uid}=useContext(UserContext);
  const{setUid}=useContext(UserContext);
const [valid, setValid] = useState(true);


  const[resp,setResp]=useState([]);
  function handleChange(){
    axios.get("http://localhost:3000/users").
    then((resp)=>{
      let found=false;

      resp.data.map((user)=>{
        if(user.email===mail && user.password===pw)
        {
          found=true;
          setUid(user.id);
        }
      });

      if(found)
      {  setValid(true);
           navigation.navigate("Main");
      }
      else
        setValid(false);
    });

  }

  return (
    <View><Text>Enter Email </Text>
    <TextInput placeholder='Enter Email' 
    value={mail}
    onChangeText={(e)=>setMail(e)}
    style={{backgroundColor:"#dadada"}} />
    <br/><br/>
    <Text>Enter Password </Text>
    <TextInput placeholder='Enter Password' 
    value={pw}
    onChangeText={(e)=>setPw(e)}
    style={{backgroundColor:"#dadada"}}/>
    <br/><br/>
    <Pressable onPress={handleChange}> <Text>SUBMIT</Text></Pressable>
    {!valid && <Text>Invalid Email or Password</Text>}
    </View>
  )
}

export default Login