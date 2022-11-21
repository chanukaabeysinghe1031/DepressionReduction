import React, {useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PieChart from 'react-native-pie-chart';

const MoodDetectionScreen = ({route, navigation}) => {

    const [predictionContainerStyle, setPredictionContainerStyle] = useState(false)
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState('data:image/jpeg;base64,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');
    const [loginMessage, setLoginMessage] = useState(null);
    const [predictedMood, setPredictedMood] = useState(null);


    const handlePrediction = async (credentials) => {
        const url = "http://192.168.1.8:3006/api/moods/predictMood";
        setLoginMessage("Loading Prediction")
        const formData = new FormData();
        formData.append('userId', route.params.userId)
        formData.append('moodImage', {
            uri: image.path,
            name: "moodImage.jpg",
            type: image.mime
        })
        console.log(image.mime)
        let res = await fetch(url, {
            method: 'post',
            body: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        let respnseJSON = await res.json();
        console.log(respnseJSON.Prediction)
        setPredictedMood(respnseJSON.Prediction)
        setPredictionContainerStyle(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Predict Your Mood</Text>
            </View>
            {
                predictionContainerStyle == true &&
                <View style={styles.displayPredictionContainer}>
                    <Text style={styles.youareText}>Your current mood is </Text>
                    <Text style={styles.prediction}>{predictedMood}</Text>
                </View>

            }

            <View style={styles.wrapper}>
                <ImageBackground
                    source={{uri: imageURL}}
                    style={{height: 300, width: 300, alignSelf: 'center'}}
                />

                <View style={styles.cameraButtonsContainer}>
                    {/* <TouchableOpacity 
                        style={styles.button}  
                        onPress = {()=>{
                            ImagePicker.openCamera({
                                width: 300,
                                height: 400,
                                cropping: true,
                            }).then(image => {
                                setImageURL(image.path);
                                setImage(image);
                            });                            
                        }}
                    >
                        <Text style={styles.buttonText}>TAKE AN IMAGE</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePrediction}
                    >
                        <Text style={styles.buttonText}>PREDICT MOOD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            ImagePicker.openPicker({
                                width: 300,
                                height: 400,
                                cropping: true
                            }).then(image => {
                                setImageURL(image.path);
                                setImage(image);
                            });
                        }}
                    >
                        <Text style={styles.buttonText}>UPLOAD IMAGE</Text>
                    </TouchableOpacity>


                    <ScrollView style={styles.row}>
                        {
                            predictedMood === "Sad" || predictedMood === "Angry" ||
                            predictedMood === "Fear" || predictedMood === "Disguist" ?
                                <View>
                                    <TouchableOpacity onPress={
                                        () => {
                                            console.log(route.params.userId)
                                            navigation.navigate('PredictFatLevel', {userId: route.params.userId}
                                            )
                                        }
                                    }>
                                        <Text style={styles.link}>Predict Body Fat Level</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={
                                        () => {
                                            console.log(route.params.userId)
                                            navigation.navigate('HistorySummary', {userId: route.params.userId}
                                            )
                                        }
                                    }>
                                        <Text style={styles.link}>History Summary</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button2}
                                        onPress={() => {
                                            if(predictedMood==="Sad"){
                                                const videos= [
                                                    {
                                                        name: "Video 1",
                                                        url:"sad1"
                                                    },
                                                    {
                                                        name: "Video 2",
                                                        url:"sad3"
                                                    },
                                                    {
                                                        name: "Video 3",
                                                        url:"sad4"
                                                    },
                                                    {
                                                        name: "Video 4",
                                                        url:"sad5"
                                                    },
                                                ]
                                                navigation.navigate('SuggestedVideos', {
                                                    mood: predictedMood,
                                                    videos:videos,
                                                    userId: route.params.userId
                                                })
                                            }else if (predictedMood==="Angry"){
                                                const videos = [
                                                    {
                                                        name: "Video 1",
                                                        url:"anger1"
                                                    },
                                                    {
                                                        name: "Video 2",
                                                        url:"anger2"
                                                    },
                                                    {
                                                        name: "Video 3",
                                                        url:"anger3"
                                                    },
                                                    {
                                                        name: "Video 4",
                                                        url:"anger4"
                                                    },
                                                    {
                                                        name: "Video 5",
                                                        url:"anger5"
                                                    },
                                                    {
                                                        name: "Video 6",
                                                        url:"anger6"
                                                    },
                                                ]
                                                navigation.navigate('SuggestedVideos', {
                                                    mood: predictedMood,
                                                    videos:videos,
                                                    userId: route.params.userId
                                                })
                                            }else if(predictedMood==="Disgust"){
                                                const videos = [
                                                    {
                                                        name: "Video 1",
                                                        url:"disgust1"
                                                    },
                                                    {
                                                        name: "Video 2",
                                                        url:"disgust2"
                                                    },
                                                    {
                                                        name: "Video 3",
                                                        url:"disgust3"
                                                    },
                                                    {
                                                        name: "Video 4",
                                                        url:"disgust4"
                                                    },
                                                    {
                                                        name: "Video 5",
                                                        url:"disgust5"
                                                    },
                                                ]
                                                navigation.navigate('SuggestedVideos', {
                                                    mood: predictedMood,
                                                    videos:videos,
                                                    userId: route.params.userId
                                                })
                                            }else if(predictedMood==="Fear"){
                                                const videos = [
                                                    {
                                                        name: "Video 1",
                                                        url:"fear1"
                                                    },
                                                    {
                                                        name: "Video 2",
                                                        url:"fear2"
                                                    },
                                                ]
                                                navigation.navigate('SuggestedVideos', {
                                                    mood: predictedMood,
                                                    videos:videos,
                                                    userId: route.params.userId
                                                })
                                            }else{
                                                const videos= [
                                                    {
                                                        name: "Video 1",
                                                        url:"happy1"
                                                    },
                                                    {
                                                        name: "Video 2",
                                                        url:"happy2"
                                                    },
                                                    {
                                                        name: "Video 3",
                                                        url:"happy3"
                                                    },
                                                ]
                                                navigation.navigate('SuggestedVideos', {
                                                    mood: predictedMood,
                                                    videos:videos,
                                                    userId: route.params.userId
                                                })
                                            }
                                        }}
                                    >
                                        <Text style={styles.buttonText}>See Suggestions</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View></View>

                        }

                    </ScrollView>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },

    displayPredictionContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#9b59b6',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        paddingLeft: 20
    },
    youareText: {
        textAlign: 'right',
        color: '#9b59b6',
        fontSize: 20,
        marginTop: 10,
    },
    prediction: {
        textAlign: 'left',
        fontSize: 30,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#9b59b6',
    },
    wrapper: {
        width: '100%',
        // borderWidth:1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
        paddingTop: '10%'
    },
    input: {
        color: 'black',
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: '#bbb',
    },
    cameraButtonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 0,
        height: 200
    },
    button: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderColor: 'white',
        borderRadius: 10,
        borderBottomWidth: 2,
        backgroundColor: '#9b59b6',
        marginBottom: 20,
        color: 'white',
        fontWeight: 'bold'
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
    link: {
        textAlign: 'center',
        color: '#9b59b6'
    },
    text: {
        color: 'black',
        textAlign: 'center'
    },
    row:{
        width:'100%',
    }
})
export default MoodDetectionScreen;