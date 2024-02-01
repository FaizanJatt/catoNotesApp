import React from 'react';
import Slider from '@react-native-community/slider';

interface FontSliderProps {
  setOpacity: () => void;
}

const OpacitySlider = ({setOpacity}: FontSliderProps) => {
  return (
    <Slider
      style={{width: 200, height: 40}}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      onValueChange={size => {
        setOpacity(size);
      }}
    />
  );
};

export default OpacitySlider;
