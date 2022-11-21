import React , {useState,useEffect} from 'react';
import {
    TextInput,
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Animated,
    Easing,
} from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions
} from 'react-native/Libraries/NewAppScreen'
import LinearGradient from 'react-native-linear-gradient';


const WelcomePageScreen = ({navigation}) => {

    return(
        <View style={styles.container} colors={["#72c2d9","#35a9ad","#03958b"]}>
            <View style={styles.topPart}>
                <Text style={styles.titleTextStyle}>WELCOME</Text>
            </View>
            <View style={styles.bottomPart}>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Login')}>
                    <Text style={styles.subText}>REDUCE YOUR DEPRESSION WITH US</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomPart}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('DoctorLogin')}>
                    <Text style={styles.subText}>If you are doctor, login from here.</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#bdc3c7'
    },
    topPart:{
        flex:2,
        backgroundColor:"#ecf0f1",
        alignItems:"center",
        width:"100%",
        justifyContent:"center",
        paddingVertical:100,
        borderBottomRightRadius:500,
        borderTopLeftRadius:500,
        borderColor:"#9b59b6",
        borderWidth:1
    },
    bottomPart:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
    },
    titleTextStyle:{
        color:"#9b59b6",
        fontSize:30,
        letterSpacing:15,
        fontWeight:'900',
        fontFamily:"sans-serif-medium"
    },
    subText:{
        backgroundColor:'#9b59b6',
        height:30,
        width:300,
        alignItems:'center',
        textAlign:"center",
        justifyContent:"center",
        fontSize:14,
        paddingTop:4,
        borderRadius:20,
        shadowColor:"black",
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.6,
        color:"#ecf0f1"
    }
});

export default WelcomePageScreen;