import {useState, useContext} from 'react';
import {AuthenticateContext} from '../../store/context/Authenticate-context';
import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {SettingContext} from '../../store/context/Settings-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterModal(): JSX.Element {
  const {bg, color, fontSize} = useContext(SettingContext);
  const AuthenticateCtx = useContext(AuthenticateContext);
  const modalIsOpen = AuthenticateCtx.password === '';
  const [password, setPassword] = useState({
    pass: '',
    confirmPass: '',
  });
  const [showPassError, setShowPassError] = useState(false);

  function passwordHandler(type: 'pass' | 'confirmPass', text: string) {
    setPassword(prev => {
      return {
        ...prev,
        [`${type}`]: text,
      };
    });
  }

  async function passwordSubmitHandler() {
    if (password.pass === password.confirmPass) {
      AuthenticateCtx.addPassword(password.pass);
      await AsyncStorage.setItem('lockPassword', password.pass);
    } else {
      setShowPassError(true);
    }
  }

  return (
    <>
      <Modal visible={modalIsOpen}>
        <SafeAreaView style={[styles.modalView, {backgroundColor: bg}]}>
          <View>
            <Text
              style={[styles.modalText, {fontSize: fontSize, color: color}]}>
              Set Password
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.modalInput}
              autoFocus={true}
              onChangeText={text => {
                setShowPassError(false), passwordHandler('pass', text);
              }}
            />
          </View>
          <View>
            <Text
              style={[styles.modalText, {fontSize: fontSize, color: color}]}>
              Confirm Password
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.modalInput}
              autoFocus={true}
              onChangeText={text => {
                setShowPassError(false), passwordHandler('confirmPass', text);
              }}
            />
          </View>
          {showPassError && (
            <Text style={{color: 'black'}}>Password Do not Match</Text>
          )}
          <View>
            <Pressable>
              <Text style={styles.modalBtn} onPress={passwordSubmitHandler}>
                Click to confirm
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'pink',
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

export default RegisterModal;
