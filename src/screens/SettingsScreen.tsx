import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {ColorPicker} from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import FontSlider from '../../utils/FontSlider';
import {useContext} from 'react';
import {SettingContext} from '../../store/context/Settings-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OpacitySlider from '../../utils/opacitySlider';

function SettingScreen(): JSX.Element {
  const {
    bg,
    color,
    fontSize,
    opacity,
    setBackgroundColor,
    setColor,
    setFontSize,
    setOpacity,
  } = useContext(SettingContext);

  const saveItemHandler = async (itemName: string, val: string) => {
    await AsyncStorage.setItem(itemName, val);
  };

  const Picker = func => (
    <ColorPicker
      onColorSelected={color => func(color)}
      style={{height: 200, width: 200}}
      sliderComponent={Slider}
    />
  );
  return (
    <>
      <SafeAreaView
        style={[
          styles.r,
          {
            backgroundColor: bg,
          },
        ]}>
        <ImageBackground
          source={require('../../assets/jpg/sampleBg.jpg')}
          className="w-[100vw] h-[100vh] justify-center items-center  "
          style={{opacity: opacity}}>
          <Text style={{color: color, fontSize: fontSize}}>
            Background Color Selector
          </Text>
          {Picker((e: string) => {
            saveItemHandler('bgColor', e);
            setBackgroundColor(e);
          })}
          <View>
            <Text style={{color: color, fontSize: fontSize}}>
              Font Color Selecter
            </Text>
            {Picker((e: string) => {
              saveItemHandler('color', e);
              setColor(e);
            })}
          </View>
          <View>
            <Text style={{color: color, fontSize: fontSize}}>
              Font Size Selecter
            </Text>
            <FontSlider
              setFontSize={(fS: number) => {
                saveItemHandler('fontSize', fS.toString());
                setFontSize(fS);
              }}
            />
            <Text style={{color: color, fontSize: fontSize}}>
              Background Opacity Selecter
            </Text>
            <OpacitySlider
              setOpacity={(opacityVal: number) => {
                saveItemHandler('opacity', opacityVal.toString());
                setOpacity(opacityVal);
              }}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  r: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingScreen;
