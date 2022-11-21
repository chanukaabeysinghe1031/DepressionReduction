import axios from 'axios';
import React , {useState,useEffect} from 'react';
import {
    TextInput,
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';

export default function VideoPlayerScreen({route,navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.displayPredictionContainer}>
        <Text style={styles.youareText}>{route.params.name} </Text>
      </View>
      <VideoPlayer
          video={{ uri: 'http://192.168.1.8:3006/uploads/'+route.params.url+".mp4" }}
          videoWidth={1600}
          videoHeight={900}
          thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
      />
      <TouchableOpacity onPress={()=>navigation.navigate('MoodDetection',{userId:route.params.userId})}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
       flex:1,
       backgroundColor:'black'
  },
  titleContainer:{
      width:'100%',
      height:100,

      backgroundColor:'black',
  },
  title:{
      fontSize:25,
      marginTop:30,
      textAlign:'center',
      color:'#ecf0f1',
      fontWeight:'bold',
      alignItems:'center',
      justifyContent:'center',
  },
    displayPredictionContainer:{
      backgroundColor:'#6c5ce7',
      flexDirection:'row',
      alignSelf:'center',
      width:'100%',
      height:200,
      paddingTop:30,
      paddingBottom:30,
      paddingLeft:20,
      paddingRight:20,
      justifyContent:'center',
      borderBottomLeftRadius:100,
      borderBottomRightRadius:100,
      marginBottom:40
  },
  youareText:{
    width:'100%',
    textAlign:'center',
    color:'white',
    fontSize:20,
  },
  backgroundVideo: {
    flex:1,

    height:300,
    width:300
  },
  link:{
    width:'60%',
    marginLeft:'20%',
    padding:10,
    backgroundColor:'#6c5ce7',
    marginTop:100,
    textAlign:'center',
    color:'white'
  }
 
})