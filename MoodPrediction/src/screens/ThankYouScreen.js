import React , {useState} from 'react';
import {
    TextInput,
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const ThankYouScreen= ({route,navigation}) => {
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>

                <Text style={styles.titleTextStyle}>Thank you for using Depression Reduction System.</Text>

                <View style={styles.button}>
                    <Button title="Logout" onPress={
                        ()=>navigation.navigate('Login',{userId:route.params.userId})
                    }/>
                </View>


                {/* <View><Button title="Login" style={styles.button}/></View> */}
            </View>
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
        width:'80%',
        // borderWidth:1,
        borderColor:'#bbb',
        borderRadius:5,
        paddingHorizontal:14,
        paddingTop:'10%'
    },
    input:{
        color:'black',
        marginBottom:20,
        borderWidth:1,
        padding:10,
        borderColor:'#bbb',
    },
    button:{
        marginTop:50,
        width:300,
        alignItems:'center',
        justifyContent:'center',
    },
    link:{
        color:'blue'
    },
    text:{
        color:'black',
        textAlign:'center'
    },
    titleTextStyle:{
        color:'blue',
        fontSize:18,
        marginTop:30,
        textAlign:'center',
        fontWeight:'bold'
    },
})

export default ThankYouScreen;