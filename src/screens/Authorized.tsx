import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {SettingContext} from '../../store/context/Settings-context';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Authorized(): JSX.Element {
  const {bg, color, fontSize, opacity} = useContext(SettingContext);
  const [createNoteMode, setCreateNoteMode] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>('');
  const [Notes, setNotes] = useState<string[]>([]);
  function addNoteHandler() {
    const tempNotes = Notes;
    tempNotes.push(noteText);
    setNotes(tempNotes);
    setNoteText('');
    setCreateNoteMode(false);
    saveNoteListToAsyncStorage(tempNotes);
  }

  const deleteNoteHandler = (msg: string) => {
    const tempNotes = Notes.filter(each => each !== msg);
    setNotes(tempNotes);
    saveNoteListToAsyncStorage(tempNotes);
  };

  const saveNoteListToAsyncStorage = async (notesArr: string[]) => {
    await AsyncStorage.setItem('notes', JSON.stringify(notesArr));
  };
  const retrieveNotesAsyncStorage = async () => {
    const retrievedNotes = await AsyncStorage.getItem('notes');
    if (retrievedNotes) {
      const parsedData = await JSON.parse(retrievedNotes);
      if (parsedData.length !== Notes.length) {
        setNotes(parsedData);
      }
    }
  };
  useEffect(() => {
    (async () => {
      await retrieveNotesAsyncStorage();
    })();
  });

  return (
    <>
      <View style={[styles.rootView, {backgroundColor: bg}]}>
        <ImageBackground
          source={require('../../assets/jpg/sampleBg.jpg')}
          className="w-[100vw] h-[100vh] justify-center items-center"
          style={{opacity: opacity}}>
          <Modal
            visible={createNoteMode}
            animationType="slide"
            transparent={true}>
            <View className="   flex-1 justify-center items-center ">
              <View
                style={{borderColor: color}}
                className=" h-[400] w-[90vw] border-2 border-solid">
                <TextInput
                  style={{fontSize: fontSize, color: color}}
                  placeholder="Note Message here..."
                  placeholderTextColor={color}
                  className="p-3"
                  multiline={true}
                  value={noteText}
                  onChangeText={setNoteText}
                />
                <Pressable
                  className=" absolute  bottom-0 right-0"
                  onPress={addNoteHandler}>
                  <View className="p-2 ">
                    <Text
                      className=" "
                      style={{
                        color: color,
                        fontSize: 17,
                      }}>
                      Save
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View className="flex-1 justify-start items-center w-[90%] mt-10">
            <View className=" h-[70vh] justify-center items-center  ">
              <FlatList
                renderItem={item => (
                  <View className="w-[40vw]  border-2 border-solid  h-[200] justify-start p-2 ml-2 mr-2 rounded-3xl">
                    <Text className=" text-center" style={{color: color}}>
                      {item.item}
                    </Text>
                    <Pressable
                      className="absolute right-0 bottom-0  p-1"
                      onPress={() => deleteNoteHandler(item.item)}>
                      <Ionicons
                        name="close-outline"
                        size={32}
                        color={'red'}></Ionicons>
                    </Pressable>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{rowGap: 8, columnGap: 8}}
                data={Notes}
                keyExtractor={(item, i) =>
                  i.toString() + '-' + Math.random() * 999
                }
                ListEmptyComponent={
                  <Text style={{fontSize: fontSize, color: color}} className="">
                    Create a new note to get started!
                  </Text>
                }
                numColumns={2}
              />
            </View>
            <Pressable className="mt-5" onPress={() => setCreateNoteMode(true)}>
              <Text
                className="border border-solid p-2 "
                style={{fontSize: fontSize, color: color, borderColor: color}}>
                Create a New Note +
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Authorized;
