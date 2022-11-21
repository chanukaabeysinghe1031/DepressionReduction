import React from 'react';
import {Text,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MoodDetectionScreen from '../screens/MoodDetectionScreen';
import PredictFatLevelScreen from '../screens/PredictFatLevelScreen';
import WelcomePageScreen from '../screens/WelcomePageScreen';
import SuggestedVideosScreen from '../screens/SuggestedVideosScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import SuggestedVideosBodyFatScreen from '../screens/SuggestedVideosBodyFatScreen';
import DepressionReCheckScreen from '../screens/DepressionReCheckScreen';
import DoctorLoginScreen from "../screens/LoginDoctorScreen";
import DoctorRegisterScreen from "../screens/RegisterDoctorScreen";
import SatisfyScreen from "../screens/SatisfyScreen";
import DoctorHomeScreen from "../screens/DoctorHome";
import ThankYouScreen from "../screens/ThankYouScreen";
import MakeAppointmentScreen from "../screens/MakeAppointmentScreen";
import HistorySummary from "../screens/HistorySummary";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Welcome' component={WelcomePageScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='MoodDetection' component={MoodDetectionScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='SuggestedVideos' component={SuggestedVideosScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='VideoPlayer' component={VideoPlayerScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='PredictFatLevel' component={PredictFatLevelScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='DoctorLogin' component={DoctorLoginScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='DoctorRegistration' component={DoctorRegisterScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='SatisfyScreen' component={SatisfyScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='SuggestedVideosForBodyFat' component={SuggestedVideosBodyFatScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='RecheckDepression' component={DepressionReCheckScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='DoctorHome' component={DoctorHomeScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='MakeAppointment' component={MakeAppointmentScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='ThankYou' component={ThankYouScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='HistorySummary' component={HistorySummary} options={{headerShown:false}}></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;