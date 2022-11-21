import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-date-picker'

let scholarShipStyle = "red"


const MakeAppointmentScreen = ({navigation, route}) => {
    const [age, setAge] = useState(null);
    const [scholarship, setScholarship] = useState(null);
    const [hypertension, setHypertension] = useState(null);
    const [diabetes, setDiabetes] = useState(null);
    const [alcoholism, setAlcoholism] = useState(null);
    const [handcap, setHandcap] = useState(null);
    const [SMS, setSMS] = useState(null);
    const [gender, setGender] = useState(null);
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(new Date())
    const [loginMessage, setLoginMessage] = useState("");
    const [open,setOpen] = useState(false);
    const [times, setTimes] = useState([
        {value: "From 8.00am to 8.30am"},
        {value: "From 8.30am to 9.00am"},
        {value: "From 9.00am to 9.30am"},
        {value: "From 9.30am to 10.00am"},
        {value: "From 10.00am to 10.30am"},
        {value: "From 10.30am to 11.00am"},
        {value: "From 11.00am to 11.30am"},
        {value: "From 11.30am to 12.00am"},
        {value: "From 12.00am to 12.30pm"},
        {value: "From 12.30pm to 1.00pam"},
        {value: "From 1.00am to 1.30pm"},
        {value: "From 1.30pm to 2.00pam"},
        {value: "From 2.00am to 2.30pm"},
        {value: "From 2.30pm to 3.00pam"},
    ]);


    const [scholarShipYes,setScholarShipYes] = useState(false);
    const [scholarShipNo,setScholarShipNo] = useState(false);

    const handleAppointment = () => {
        const url = "http://192.168.1.8:3006/api/users/addAppointment";
        setLoginMessage("Loading Prediction")

        axios.post(url, {
            userId: route.params.userId,
            appointmentDate:date,
            appointmentTime:time,
            age: age,
            scholarship:scholarship,
            hypertension:hypertension,
            diabetes:diabetes,
            alcoholism:alcoholism,
            handcap:handcap,
            sms:SMS,
            gender:gender
        })
            .then(response => {
                let res = JSON.stringify(response.data);
                setLoginMessage(res.Status);
                res = JSON.parse(res)
                console.log(res)
                if (res.Status === "Successful") {
                    setLoginMessage("Appointment was successfully made.")
                } else {
                    console.log(res.Message)
                    setLoginMessage("An error was occurred.")
                }
            })
            .catch(error => {
                setLoginMessage(error)
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Make an appointment with the doctor</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.userInputTitle}>{loginMessage}</Text>
                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>Age</Text>
                    <TextInput
                        placeholder=''
                        keyboardType={"numeric"}
                        style={styles.input}
                        placeholderTextColor='#9b59b6'
                        value={age}
                        onChangeText={(text) => setAge(text)}
                    />
                </View>
                <View style={styles.userInput}>
                    <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
                        <Text>Select Date</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>Time</Text>
                    <TextInput
                        placeholder=''
                        style={styles.input}
                        placeholderTextColor='#9b59b6'
                        value={time}
                        onChangeText={(text) => setTime(text)}
                    />
                </View>
                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>Do you have discount code?</Text>
                    <View style={styles.userSelectionRow}>
                        <TouchableOpacity onPress={()=>{
                            setScholarship(1)
                        }}>
                            <Text
                                style={styles.userSelection}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setScholarship(0)
                        }}>
                            <Text style={styles.userSelection}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>Do you feel pressured?</Text>
                    <View style={styles.userSelectionRow}>
                        <TouchableOpacity onPress={()=>{
                            setHypertension(1)
                        }}>
                            <Text
                                style={styles.userSelection}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setHypertension(0)
                        }}>
                            <Text style={styles.userSelection}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>Do you have diabetes?</Text>
                    <View style={styles.userSelectionRow}>
                        <TouchableOpacity onPress={()=>{
                            setDiabetes(1)
                        }}>
                            <Text
                                style={styles.userSelection}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setDiabetes(0)
                        }}>
                            <Text style={styles.userSelection}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>Do you use alcohol?</Text>
                    <View style={styles.userSelectionRow}>
                        <TouchableOpacity onPress={()=>{
                            setAlcoholism(1)
                        }}>
                            <Text
                                style={styles.userSelection}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setAlcoholism(0)
                        }}>
                            <Text style={styles.userSelection}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>Do you find it to make a progression whatever you tried?</Text>
                    <View style={styles.userSelectionRow}>
                        <TouchableOpacity onPress={()=>{
                            setHandcap(1)
                        }}>
                            <Text
                                style={styles.userSelection}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setHandcap(0)
                        }}>
                            <Text style={styles.userSelection}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userInput}>
                    <Text style={styles.userInputTitle}>Do you like to have a notification when doctor arrived? </Text>
                    <View style={styles.userSelectionRow}>
                        <TouchableOpacity onPress={()=>{
                            setSMS(1)
                        }}>
                            <Text
                                style={styles.userSelection}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setSMS(0)
                        }}>
                            <Text style={styles.userSelection}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                <TouchableOpacity style={styles.button} onPress={handleAppointment}>
                    <Text>Make an Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('MoodDetection',{userId:route.params.userId})}>
                    <Text style={styles.link}>Home</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '100%',
        // borderWidth:1,
        borderColor: '#bbb',
        borderRadius: 5,
        // paddingHorizontal:14,
        paddingTop: 10,
    },
    titleContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        top: 0,
        backgroundColor: '#9b59b6',
    },
    title: {
        fontSize: 25,
        marginTop: 30,
        textAlign: 'center',
        color: '#ecf0f1',
        fontWeight: 'bold'
    },
    scrollView: {
        position: 'absolute',
        top: 150,
        bottom: 0,
        width: '100%',
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
    detials: {
        textAlign: 'center',
        color: '#9b59b6',
        borderBottomColor: '#ecf0f1',
        marginBottom: 10
    },
    userSelectionRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        color: 'black',
        marginBottom: 20,
        borderWidth: 1,
        padding: 5,
        borderColor: '#9b59b6',
        width: 200,
        marginHorizontal: '5%',
        borderRadius: 10,
        textAlign: 'center'
    },
    userSelection: {
        backgroundColor: scholarShipStyle,
        width: 100,
        margin:5,
        fontSize:13,
        padding:5,
        textAlign:"center"
    },
    datePicker:{
        backgroundColor:'red',
        width:200
    },
    oneInput: {
        color: 'black',
        marginBottom: 20,
        borderWidth: 1,
        padding: 5,
        borderColor: '#9b59b6',
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 10,
        textAlign: 'center'
    },
    button: {
        marginTop: 10,
        width: '50%',
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9b59b6',
        alignSelf: 'center',
        borderRadius: 20
    },
    button2: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderColor: 'white',
        borderRadius: 10,
        borderBottomWidth: 2,
        backgroundColor: 'green',
        color: 'white',
        fontWeight: 'bold'
    },
    buttonText: {
        color: '#ecf0f1',
        fontWeight: 'bold'
    },
    link: {
        color: '#9b59b6',
        marginBottom: 100,
        textAlign:'center'
    },
    text: {
        color: 'black',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
    }
})

export default MakeAppointmentScreen;