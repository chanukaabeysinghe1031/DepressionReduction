import React , {useState} from 'react';
import {
    TextInput,
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import axios from 'axios';

const DoctorRegisterScreen = ({navigation}) => {
    const [email,setEmail] = useState(null);
    const [fullName,setFullName] = useState(null);
    const [contactNo,setContactNo] = useState(null);
    const [hospital,setHospital] = useState(null);
    const [education,setEducation] = useState(null);
    const [password,setPassword] = useState(null);
    const [address,setAddress] = useState(null);
    const [loginMessage,setLoginMessage] = useState("");
    const handleSignup = (credentials) => {
        const url = "http://192.168.1.8:3006/api/doctors/addDoctor";
        axios.post(url,{
                fullName:fullName,
                email:email,
                password:password,
                address:address,
                contactNo:contactNo,
                hospital:hospital,
                education:education
            })
            .then(response=>{
                let res = JSON.stringify(response.data);
                setLoginMessage(res.Status);
                res = JSON.parse(res)
                if(res.Status==="Successful"){
                    console.log("OK")
                    navigation.navigate('DoctorHome',{userId:res.User._id})
                }else{
                    console.log(res.Message)
                    setLoginMessage(res.Message)
                }
            })
            .catch(error=>{
                console.log(error)
                setLoginMessage(error)
            })
    }
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.titleTextStyle}>REGISTER</Text>
                <TextInput
                    placeholder='Enter Full Name'
                    style={styles.input}
                    placeholderTextColor='black'
                    value={fullName}
                    onChangeText={(text)=>setFullName(text)}
                />
                <TextInput
                    placeholder='Enter Address'
                    style={styles.input}
                    placeholderTextColor='black'
                    value={address}
                    onChangeText={(text)=>setAddress(text)}
                />
                <TextInput
                    placeholder='Enter Contact No'
                    style={styles.input}
                    placeholderTextColor='black'
                    value={contactNo}
                    onChangeText={(text)=>setContactNo(text)}
                />
                <TextInput
                    placeholder='Enter Hospital'
                    style={styles.input}
                    placeholderTextColor='black'
                    value={hospital}
                    onChangeText={(text)=>setHospital(text)}
                />
                <TextInput
                    placeholder='Enter Education'
                    style={styles.input}
                    placeholderTextColor='black'
                    value={education}
                    onChangeText={(text)=>setEducation(text)}
                />
                <TextInput
                    placeholder='Enter Email'
                    style={styles.input}
                    placeholderTextColor='black'
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <TextInput
                    placeholder='Enter Password'
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor='black'
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
                    <Text>Register</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
                    <Text style={styles.text}>Have an account already? </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('DoctorLogin')}>
                        <Text style={styles.link}>Login</Text>
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

export default DoctorRegisterScreen;