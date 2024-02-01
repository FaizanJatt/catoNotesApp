import {createContext, useEffect} from 'react';
import React from 'react';
import {PropsWithChildren, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SettingContext = createContext({
  color: 'black',
  bg: 'white',
  fontSize: 12,
  opacity: 0.5,
  setColor: () => {},
  setBackgroundColor: () => {},
  setFontSize: () => {},
  setOpacity: () => {},
});

function SettingContextProvider({children}: PropsWithChildren) {
  const [color, setC] = useState('black');
  const [bg, setB] = useState('white');
  const [fontSize, setF] = useState(12);
  const [O, setO] = useState(0.5);

  const getAllItemsInAsyncStorage = async () => {
    const BG = await AsyncStorage.getItem('bgColor');
    const COLOR = await AsyncStorage.getItem('color');
    const FONT = await AsyncStorage.getItem('fontSize');
    const OPACITY = await AsyncStorage.getItem('opacity');
    if (COLOR) {
      setC(COLOR);
    }
    if (BG) {
      setB(BG);
    }

    if (FONT) {
      setF(Number(FONT));
    }
    if (OPACITY) {
      setO(Number(OPACITY));
    }
  };

  useEffect(() => {
    getAllItemsInAsyncStorage();
  }, []);

  function setColor(text: string) {
    setC(text);
  }
  function setBackgroundColor(text: string) {
    setB(text);
  }
  function setFontSize(size: number) {
    setF(size);
  }
  function setOPACITY(size: number) {
    setO(size);
  }

  const value = {
    color: color,
    bg: bg,
    fontSize: fontSize,
    opacity: O,
    setColor: setColor,
    setBackgroundColor: setBackgroundColor,
    setFontSize: setFontSize,
    setOpacity: setOPACITY,
  };

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
}

export default SettingContextProvider;
