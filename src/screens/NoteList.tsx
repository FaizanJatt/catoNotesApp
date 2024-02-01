import {View, Text} from 'react-native';
import {useContext} from 'react';
import {SettingContext} from '../../store/context/Settings-context';
function NoteList(): JSX.Element {
  const {bg, color, fontSize} = useContext(SettingContext);
  return (
    <>
      <View style={{flex: 1, backgroundColor: bg, alignItems: 'center'}}>
        <Text style={{color: color, fontSize: fontSize}}>Note List</Text>
      </View>
    </>
  );
}

export default NoteList;
