import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import dateFormat from 'dateformat';

const DoctorHomeScreen = ({route, navigation}) => {

    const [appointments, setAppointments] = useState(null);
    const [success,setSuccess] = useState(false)
    useEffect(() => {
        console.log("RECORDS", route.params.userId)
        const url = "http://192.168.1.8:3006/api/doctors/getAppointments";
        axios.get(url)
            .then(response => {
                let res = JSON.stringify(response.data);
                res = JSON.parse(res)
                console.log(
                    response.data
                )
                if (res.Status === "Successful") {
                    setAppointments(res.Appointments)
                    setSuccess[true]

                } else {
                    console.log(res.Error)
                }
            })
    },[success]);

    const item = (item) => {
        return (
            <View style={styles.elementStyle}>
                <Text style={styles.elementTextStyleHeader}>Appointments</Text>
                <Text style={styles.elementTextStyle}>{dateFormat(item.item.recordedDate, "mmmm dS, yyyy")}</Text>
                <Text style={styles.elementTextStyleHeader}>Appointment Time</Text>
                <Text style={styles.elementTextStyle}>{item.item.appointmentTime}</Text>
                <Text style={styles.elementTextStyle}>{item.item.appointmentTime}</Text>
                {
                    item.item.noShow?
                        <Text style={styles.elementTextStyle}>The patient is coming</Text>
                        :
                        <Text style={styles.elementTextStyle}>The patient is not coming</Text>
                }

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.recordsContainer}>
                    <Text style={styles.subTitle}>Appointments</Text>
                    {
                        appointments != undefined && appointments.length > 0 ?
                            <FlatList
                                style={styles.flatList}
                                data={appointments}
                                renderItem={(item)}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <Text style={styles.noRecordsText}>No Body Fat Prediction Records</Text>
                    }
                </View>
                <TouchableOpacity style={styles.buttonSatisfy} onPress={(event) => {
                    event.preventDefault()
                    navigation.navigate('Welcome', {userId: route.params.userId})
                }}>
                    <Text style={styles.textButton}>Logout</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  alignItems:'center',
        //  justifyContent:'center',
    },
    wrapper: {
        height: '90%',
        width: '100%',
        // borderWidth:1,
        borderColor: '#bbb',
        borderRadius: 5,
        // paddingHorizontal:14,
        paddingTop: 10,
    },
    titleContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#9b59b6',
    },
    title: {
        fontSize: 25,
        marginTop: 30,
        textAlign: 'center',
        color: '#ecf0f1',
        fontWeight: 'bold'
    },


    detials: {
        textAlign: 'center',
        color: '#9b59b6',
        borderBottomColor: '#ecf0f1',
        marginBottom: 10
    },
    input: {
        color: 'black',
        marginBottom: 20,
        borderWidth: 1,
        padding: 5,
        borderColor: '#9b59b6',
        width: '40%',
        marginHorizontal: '5%',
        borderRadius: 10,
        textAlign: 'center'
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
    buttonText: {
        color: '#ecf0f1',
        fontWeight: 'bold'
    },
    link: {
        color: '#9b59b6',
        marginBottom: 100
    },
    text: {
        color: 'black',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    subTitle: {
        color: '#34495e',
        fontSize: 20,
        marginHorizontal: 20,
        borderBottomColor: '#ecf0f1',
        marginBottom: 10
    },
    flatList: {
        height: '80%'
    },
    elementStyle: {
        marginTop: 10,
        width: '80%',
        height: 200,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9b59b6',
        alignSelf: 'center',
        borderRadius: 20
    },
    elementTextStyleHeader: {
        color: '#34495e',
        fontSize: 13
    },
    elementTextStyle: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'

    },
    buttonRow: {
        position: 'absolute',
        bottom: 0,
        height: '10%',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#353b48'
    },
    buttonBottom: {
        marginTop: 10,
        backgroundColor: '#34495e',
        height: 45,
        width: '40%',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 2,
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        marginTop: 10
    },
    recordsContainer: {
        margin:10,
        height:'80%',
    },
    noRecordsText: {
        fontSize:15,
        color:'red',
        textAlign:'center',
        justifyContent:'center',
        marginTop:100
    },
    buttonSatisfy:{
        marginTop: 10,
        backgroundColor: '#9b59b6',
        height: 45,
        width: '40%',
        marginLeft: '30%',
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 2,
    }
})

export default DoctorHomeScreen;