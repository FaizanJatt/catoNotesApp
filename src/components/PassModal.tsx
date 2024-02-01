import {useContext, useEffect, useState} from 'react';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import RegisterModal from './RegisterModal';
import {AuthenticateContext} from '../../store/context/Authenticate-context';
import {SettingContext} from '../../store/context/Settings-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EyeIcon from '../../assets/svg/EyeIcon.svg';

function PassModal(): JSX.Element {
  const {bg, color, fontSize, opacity} = useContext(SettingContext);
  const navigation = useNavigation();
  const {authenticateUser} = useContext(AuthenticateContext);
  const [enteredPass, setEnteredPass] = useState('');
  const [showPassError, setShowPassError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [pass, setPass] = useState<string>('');

  function passSubmitHandler() {
    if (enteredPass === pass) {
      authenticateUser();
      navigation.navigate('Authorized');
    } else {
      setShowPassError(true);
    }
  }

  const checkPasswordAsyncHandler = async () => {
    const retrivedPass = await AsyncStorage.getItem('lockPassword');
    if (retrivedPass) {
      setPass(retrivedPass);
    }
  };

  useEffect(() => {
    (async () => {
      await checkPasswordAsyncHandler();
    })();
  }, []);

  return (
    <>
      {!pass && <RegisterModal />}
      <SafeAreaView style={[styles.modalView, {backgroundColor: bg}]}>
        <ImageBackground
          source={require('../../assets/jpg/sampleBg.jpg')}
          className="w-[100vw] h-[100vh] justify-center items-center  "
          style={{opacity: opacity}}>
          <View>
            <Text
              style={[styles.modalText, {color: color, fontSize: fontSize}]}>
              Please enter password
            </Text>
          </View>
          <View className="flex-row ">
            <TextInput
              style={styles.modalInput}
              // autoFocus={true}
              onChangeText={text => {
                setShowPassError(false);
                setEnteredPass(text);
              }}
              secureTextEntry={showPassword}
            />
            <Pressable
              className=" justify-center items-center  -left-8 "
              onPress={() => setShowPassword(prev => !prev)}>
              <EyeIcon />
            </Pressable>
          </View>
          {showPassError && (
            <Text
              style={[styles.modalText, {color: color, fontSize: fontSize}]}>
              Password is incorrect
            </Text>
          )}
          <View>
            <Pressable>
              <Text
                onPress={passSubmitHandler}
                style={[styles.modalBtn, {color: color, fontSize: fontSize}]}>
                Click to confirm
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  modalText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalInput: {
    backgroundColor: 'hotpink',
    width: 300,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  modalBtn: {
    backgroundColor: '#ee91f2',
    padding: 14,
    borderRadius: 12,
    fontWeight: 'bold',
  },
});

export default PassModal;
