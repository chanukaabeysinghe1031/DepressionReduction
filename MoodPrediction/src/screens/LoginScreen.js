import axios from 'axios';
import React , {useState} from 'react';
import {
    TextInput,
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


const LoginScreen = ({navigation}) => {

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [loginMessage,setLoginMessage] = useState(null);

    const handleLogin = () => {
        
        //  navigation.navigate('MoodDetection',{userId:res.User._id})
         const url = "http://192.168.1.8:3006/api/users/login";
         axios.post(url,{email:email,password:password})
         .then(response=>{
            console.log("OKOK")
            let res = JSON.stringify(response.data);
            setLoginMessage(res.Status);
            res = JSON.parse(res)
            if(res.Status==="Successful"){
                console.log("User Id "+res.User._id)
                navigation.navigate('Home',{userId:res.User._id})
            }else{
                console.log(res.Message)
                setLoginMessage(res.Message)
            }
         })
         .catch(error=>{
          
             console.log(error)
            // setLoginMessage(error)
         })
    }
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.titleTextStyle}>LOGIN</Text>
                <TextInput 
                    placeholder='Enter Email' 
                    style={styles.input}
                    placeholderTextColor='#9b59b6' 
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <TextInput 
                    placeholder='Enter Password' 
                    secureTextEntry 
                    style={styles.input} 
                    placeholderTextColor='#9b59b6' 
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                />
                 <Text style={styles.text}>{loginMessage} </Text>
                
                <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
                   <Text>Login</Text>
                </TouchableOpacity>

                <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
                    <Text style={styles.text}>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                        <Text style={styles.link}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
         flex:1,
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:"#bdc3c7"
    },
    wrapper:{
        width:'100%',
        // borderWidth:1,
        borderRadius:5,
        paddingHorizontal:14,
        paddingTop:'10%',
        height:"100%",
        backgroundColor:"#ecf0f1",
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderBottomEndRadius:300,
        borderTopStartRadius:300,
        borderColor:'#9b59b6',
        borderWidth:1
    },
    titleTextStyle:{
        color:"#9b59b6",
        fontSize:30,
        marginBottom:20,
        fontWeight:'900',
        fontFamily:"sans-serif-medium",
        letterSpacing:20
    },
    input:{
        marginBottom:20,
        borderWidth:1,
        padding:10,
        width:'80%',
        borderRadius:30,
        color:'#9b59b6',
        borderColor:'#9b59b6',
    },
    buttonContainer:{
        marginTop:30,
        width:200,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#9b59b6',
        color:'#ecf0f1',
        borderRadius:20,
    },
    link:{
        color:'blue'
    },
    text:{
        color:'black',
        textAlign:'center'
    }
})
export default LoginScreen;