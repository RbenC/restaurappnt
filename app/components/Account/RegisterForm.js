import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements'; 
import { validateEmail } from '../../utils/validations';
import { size, isEmpty } from 'lodash';
import * as firebase from "firebase";
import { useNavigation }  from "@react-navigation/native";


export default function RegisterForm(){    
    const [showPassword, setshowPassword] = useState(false);
    const [showRepeatPassword, setshowRepeatPassword] = useState(false);
    const [formData, setformData] = useState(defaultFormValue());
    const navigation = useNavigation();
    
    const onSubmit = () => {
        //console.log(formData);
        //console.log(validateEmail(formData.email))
        if(
            isEmpty(formData.email) ||
            isEmpty(formData.password) ||
            isEmpty(formData.repeatPassword) 
        ) {
            console.log("Todos los campos son obligatorios");
        } else if(!validateEmail(formData.email) )  {
            console.log("Email no válido");
            
        } else if (formData.password !== formData.repeatPassword) {
            console.log("Las contraseñas deben ser iguales");
            
        } else if(size (formData.password) < 6 ) {
            console.log("más de 6 caracteres para las contraseñas")
            
        } else {
            //console.log("Ok.  Pueden enviarse los datos a firebase");
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then((response) => {
                navigation.navigate("Account");
            })
            .catch((err)=> {
                console.log(err);
            })
        }        
    };

    const onChange = (e, type) =>{
        //console.log(type);
        //console.log(e.nativeEvent.text);
        //setformData({
        //    [type]:e.nativeEvent.text
        //})

        setformData({ ...formData, [type]:e.nativeEvent.text })
    } 

    
    
    return (
        <View style={styles.formContainer}>  
            <Input
                placeholder="Correo electrónico"
                containerStyle={[styles.inputForm]}
                onChange={(e)=> onChange(e, 'email')}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={[styles.iconRight]}
                    />
                }               
            />
            <Input
                placeholder="Contraseña"
                containerStyle={[styles.inputForm]}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e)=> onChange(e, 'password')}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={[styles.iconRight]}
                        onPress={() => setshowPassword(!showPassword)}
                    />
                }  
                
            />
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={[styles.inputForm]}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                onChange={(e)=> onChange(e, 'repeatPassword')}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="eye-outline"
                        iconStyle={[styles.iconRight]}
                        onPress={()=> setshowRepeatPassword(!showRepeatPassword)}
                    />
                }  
            />   
            <Button            
                title="Unirse"
                containerStyle= {[styles.btnContainerRegister]}
                buttonStyle = {[styles.btnRegister]}
                onPress={onSubmit}
            />              
        </View>
        
    )
}




function defaultFormValue(){
    return {
        email:'',
        password:'',
        repeatPassword:''
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems: "center",
        justifyContent: "center", 
        marginTop:30,
    },
    inputForm:{
        width:"100%",
        marginTop:20,
    },
    btnContainerRegister:{
        marginTop: 20,
        width: "95%"
    },
    btnRegister:{
        backgroundColor: "#00a680",
    },
    iconRight:{
        color:"#c1c1c1",
    },
})