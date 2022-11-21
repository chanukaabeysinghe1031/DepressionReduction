import React , {useState} from 'react';
import {
    TextInput,
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import axios from 'axios';

const PredictFatLevelScreen = ({navigation,route}) => {
    const [age,setAge] = useState(null);
    const [weight,setWeight] = useState(null);
    const [height,setHeight] = useState(null);
    const [neck,setNeck] = useState(null);
    const [chest,setChest] = useState(null);
    const [abdomen,setAbdomen] = useState(null);
    const [hip,setHip] = useState(null);
    const [thigh,setThigh] = useState(null);
    const [knee,setKnee] = useState(null);
    const [ankle,setAnkle] = useState(null);
    const [biceps,setBiceps] = useState(null);
    const [forearm,setForearm] = useState(null);
    const [wrist,setWrist] = useState(null);
    const [loginMessage,setLoginMessage] = useState(null);
    const [bodyFat,setBodyFat] = useState();
    const [gender, setGender] = useState(null);

    const handlePrediction = (credentials) => {
        const url = "http://192.168.1.8:3006/api/bodyFatLevel/predictBodyFat";
        setLoginMessage("Loading Prediction")

        axios.post(url,{
            userId:route.params.userId,
            age:age,
            weight:weight,
            height:height,
            neck:neck,
            chest:chest,
            abdomen:abdomen,
            hip:hip,
            thigh:thigh,
            knee:knee,
            ankle:ankle,
            biceps:biceps,
            forearm:forearm,
            wrist:wrist,
            gender:gender
        })
        .then(response=>{
            
            let res = JSON.stringify(response.data);
            setLoginMessage(res.Status);
            res = JSON.parse(res)
            console.log(res)
            if(res.Status==="Successful"){
                setBodyFat(res.Prediction)
                setLoginMessage("Fat Level : "+res.Prediction)
            }else{
                console.log(res.Message)
                setLoginMessage(res.Message)
            }
        })
        .catch(error=>{
            setLoginMessage(error)
        })
   }

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
             <Text style={styles.title}>Predict Your Fat Level</Text>
            </View>
            <ScrollView style={styles.wrapper}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detials}>Input Following Details</Text>
                </View>
                <View style={styles.row}>
                    <TextInput 
                        placeholder='Age' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={age}
                        keyboardType='numeric'
                        onChangeText={(text)=>setAge(text)}
                    />
                    <TextInput 
                        placeholder='Weight' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={weight}
                        keyboardType='numeric'
                        onChangeText={(text)=>setWeight(text)}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput 
                        placeholder='Height' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={height}
                        keyboardType='numeric'
                        onChangeText={(text)=>setHeight(text)}
                    />
                    <TextInput 
                        placeholder='Neck Size' 
                        style={styles.input} 
                        placeholderTextColor='#9b59b6' 
                        value={neck}
                        keyboardType='numeric'
                        onChangeText={(text)=>setNeck(text)}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput 
                        placeholder='Chest Size' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={chest}
                        keyboardType='numeric'
                        onChangeText={(text)=>setChest(text)}
                    />
                    <TextInput 
                        placeholder='Abdomen Size' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={abdomen}
                        keyboardType='numeric'
                        onChangeText={(text)=>setAbdomen(text)}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput 
                        placeholder='Hip Size' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={hip}
                        keyboardType='numeric'
                        onChangeText={(text)=>setHip(text)}
                    />
                    <TextInput 
                        placeholder='Thigh Size' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={thigh}
                        keyboardType='numeric'
                        onChangeText={(text)=>setThigh(text)}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput 
                        placeholder='Knee Size' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={knee}
                        keyboardType='numeric'
                        onChangeText={(text)=>setKnee(text)}
                    />
                    <TextInput 
                        placeholder='Ankle Size' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={ankle}
                        keyboardType='numeric'
                        onChangeText={(text)=>setAnkle(text)}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput 
                        placeholder='Biceps Size' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={biceps}
                        keyboardType='numeric'
                        onChangeText={(text)=>setBiceps(text)}
                    />
                    <TextInput 
                        placeholder='Forearm Size' 
                        style={styles.input}
                        placeholderTextColor='#9b59b6' 
                        value={forearm}
                        keyboardType='numeric'
                        onChangeText={(text)=>setForearm(text)}
                    />
                </View>
        
                <TextInput 
                    placeholder='Wrist Size' 
                    style={styles.oneInput}
                    placeholderTextColor='#9b59b6' 
                    value={wrist}
                    keyboardType='numeric'
                    onChangeText={(text)=>setWrist(text)}
                />

                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>What is your gender</Text>
                    <View style={styles.userSelectionRow}>
                        <TouchableOpacity onPress={()=>{
                            setGender(1)
                        }}>
                            <Text
                                style={styles.userSelection}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setGender(0)
                        }}>
                            <Text style={styles.userSelection}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <Text style={styles.text}>{loginMessage} </Text>
                <TouchableOpacity style={styles.button} onPress={handlePrediction}>
                    <Text style={styles.buttonText}>Predict Fat Level</Text>
                </TouchableOpacity>
                {
                    (age>=18&&age<=39&&bodyFat >19)||(age>39&&bodyFat>21)? 
                    <View>
                        <TouchableOpacity 
                        style={styles.button2} 
                        onPress = {()=>{
                            navigation.navigate('SuggestedVideosForBodyFat',{bodyFat:Math.round(bodyFat*100)/100,userId:route.params.userId})
                        }}
                    >
                            <Text style={styles.buttonText}>See Suggestions</Text>
                    </TouchableOpacity>
                        </View>:
                    <View>

                    </View>
                }
               
                <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home',{userId:route.params.userId})}>
                        <Text style={styles.link}>Home</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
         flex:1,
         alignItems:'center',
         justifyContent:'center',
    },
    wrapper:{
        width:'100%',
        // borderWidth:1,
        borderColor:'#bbb',
        borderRadius:5,
        // paddingHorizontal:14,
        paddingTop:10,
    },
    titleContainer:{
        width:'100%',
        height:100,
        backgroundColor:'#9b59b6',
    },
    title:{
        fontSize:25,
        marginTop:30,
        textAlign:'center',
        color:'#ecf0f1',
        fontWeight:'bold'
    },

    detials:{
        textAlign:'center',
        color:'#9b59b6',
        borderBottomColor:'#ecf0f1',
        marginBottom:10
    },
    input:{
        color:'black',
        marginBottom:20,
        borderWidth:1,
        padding:5,
        borderColor:'#9b59b6',
        width:'40%',
        marginHorizontal:'5%',
        borderRadius:10,
        textAlign:'center'
    },
    oneInput:{
        color:'black',
        marginBottom:20,
        borderWidth:1,
        padding:5,
        borderColor:'#9b59b6',
        width:'90%',
        marginHorizontal:'5%',
        borderRadius:10,
        textAlign:'center'
    },
    button:{
        marginTop:10,
        width:'50%',
        height:40,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#9b59b6',
        alignSelf:'center',
        borderRadius:20
    },
    button2:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        height:40,
        borderColor:'white',
        borderRadius:10,
        borderBottomWidth:2,
        backgroundColor:'green',
        color:'white',
        fontWeight:'bold'
    },
    buttonText:{
        color:'#ecf0f1',
        fontWeight:'bold'
    },
    link:{
        color:'#9b59b6',
        marginBottom:100
    },
    text:{
        color:'black',
        textAlign:'center'
    },
    row:{
        flexDirection:'row',
    },
    userInput: {
        // borderWidth:1,
        margin: 10,
        fontSize: 15,
        // borderColor:'#9b59b6',
        width: '100%',
        borderRadius: 10,
        textAlign: 'center'
    },
    userInputTitle: {
        fontSize: 15,
        margin: 10,
        color: '#9b59b6',
    },
    userSelectionRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    userSelection: {
        backgroundColor: "#9b59b6",
        width: 100,
        margin:5,
        fontSize:13,
        padding:5,
        textAlign:"center"
    },
})

export default PredictFatLevelScreen;