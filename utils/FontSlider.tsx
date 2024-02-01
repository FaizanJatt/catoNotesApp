import React from 'react';
import Slider from '@react-native-community/slider';

interface FontSliderProps {
  setFontSize: () => void;
}

const FontSlider = ({setFontSize}: FontSliderProps) => {
  return (
    <Slider
      style={{width: 200, height: 40}}
      minimumValue={12}
      maximumValue={24}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      onValueChange={size => {
        setFontSize(size);
      }}
    />
  );
};

export default FontSlider;
