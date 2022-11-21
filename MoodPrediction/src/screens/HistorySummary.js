import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PieChart from "react-native-pie-chart";

const HistorySummary = ({route, navigation}) => {

    const [bodyFatLevels, setBodyFatLevels] = useState();
    const [moods, setMoods] = useState(null);
    const [success, setSuccess] = useState(false);

    const widthAndHeight = 250
    const series = [123, 321, 123, 789, 537, 333, 233]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800', '#9b59b6', 'blue']

    const [happy, setHappy] = useState(0);
    const [sad, setSad] = useState(0);
    const [fear, setFear] = useState(0);
    const [angry, setAngry] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [surprise, setSurprise] = useState(0);
    const [disgust, setDisgust] = useState(0);

    useEffect(() => {
        console.log("RECORDS", route.params.userId)
        const url = "http://192.168.1.8:3006/api/users/records";
        axios.post(url, {userId: route.params.userId})
            .then(response => {
                let res = JSON.stringify(response.data);
                res = JSON.parse(res)
                if (res.Status === "Successful") {
                    let happy = 0;
                    let sad = 0;
                    let angry = 0;
                    let disgust = 0;
                    let fear = 0;
                    let neutral = 0;
                    let surprise = 0;
                    res.UserMoods.map(mood => {
                        if (mood.moodPrediction === "Angry") {
                            angry = angry + 1
                        } else if (mood.moodPrediction === "Sad") {
                            sad = sad + 1
                        } else if (mood.moodPrediction === "Disgust") {
                            disgust = disgust + 1
                        } else if (mood.moodPrediction === "Fear") {
                            fear = fear + 1
                        } else if (mood.moodPrediction === "Happy") {
                            happy = happy + 1
                        } else if (mood.moodPrediction === "Neutral") {
                            neutral = neutral + 1
                        } else if (mood.moodPrediction === "Surprise") {
                            surprise = surprise + 1
                        }
                    })
                    setBodyFatLevels(res.UserFatLevels)
                    setMoods(res.UserMoods)
                    setSuccess(true)
                    console.log("angry ", angry)
                    console.log("sad ", sad)
                    console.log("happy ", happy)
                    console.log("neutral", neutral)
                    console.log("surprise ", surprise)
                    console.log("disgust ", disgust)
                    console.log("fear ", fear)
                } else {
                    console.log(res.Error)
                }
            })
    }, [success]);

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.recordsContainer}>
                    <Text style={styles.subTitle}>Records of User Body Fat Levels</Text>
                    {
                        bodyFatLevels != undefined && bodyFatLevels.length > 0 ?
                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={[
                                    angry, sad, happy, neutral, surprise, disgust, 100
                                ]}
                                sliceColor={sliceColor}
                            />

                            :
                            <Text style={styles.noRecordsText}>No Body Fat Prediction Records</Text>
                    }
                </View>

                <View style={styles.recordsContainer}>
                    <View style={styles.colorViewContainer}>
                        <View style={styles.colorView}></View>
                        <Text style={styles.colorViewText}>Happy</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonSatisfy} onPress={(event) => {
                    event.preventDefault()
                    navigation.navigate('SatisfyScreen', {userId: route.params.userId})
                }}>
                    <Text style={styles.textButton}>Go to Next Page</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.buttonBottom} onPress={(event) => {
                    event.preventDefault()
                    navigation.navigate('PredictFatLevel', {userId: route.params.userId})
                }}>
                    <Text style={styles.textButton}>Recheck Body Fat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom} onPress={(event) => {
                    event.preventDefault()
                    navigation.navigate('MoodDetection', {userId: route.params.userId})
                }}>
                    <Text style={styles.textButton}>Recheck Mood</Text>
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
        height: '40%'
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
        margin: 10,
        height: '40%',
    },
    noRecordsText: {
        fontSize: 15,
        color: 'red',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    buttonSatisfy: {
        marginTop: 10,
        backgroundColor: '#9b59b6',
        height: 45,
        width: '40%',
        marginLeft: '30%',
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 2,
    },
    colorViewContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '200%',
        height: 40,
        marginTop: 40,
        marginLeft: 50
    },
    colorView: {
        backgroundColor: 'red',
        width: 40,
        height: 40,
        borderRadius: 40
    },
    colorViewText: {
        color: 'red',
        margin: 10,
        textAlign: 'center',
        width: 100
    }
})

export default HistorySummary;