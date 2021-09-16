import React, {FC} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import {BackButton} from 'react-router-native';
import {useStore} from '@store';
import {observer} from 'mobx-react-lite';

const Home: FC = observer(() => {
  const {picture} = useStore();
  const winDim = useWindowDimensions();

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={{color: '#fffc', fontSize: 20, marginBottom: 20}}>
        Upload a Picture
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => picture.takePhoto()}>
        <Image
          style={styles.icon}
          source={require('../img/1x/photo_camera_black_24dp.png')}
        />
        <Text>From Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => picture.selecFromGalery()}>
        <Image
          style={styles.icon}
          source={require('../img/1x/insert_photo_black_24dp.png')}
        />
        <Text>From Galery</Text>
      </TouchableOpacity>
      {picture.currentPicture && (
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => picture.removeCurrentPicture()}>
            <Image source={require('../img/1x/close_black_24dp.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => picture.uploadCurrentPicture()}>
            <Image source={require('../img/1x/done_white_24dp.png')} />
          </TouchableOpacity>
          <Image
            source={{
              uri: picture.currentPicture.uri,
              width: picture.currentPicture.width,
              height: picture.currentPicture.height,
            }}
            style={[
              styles.imagePreview,
              {
                width: winDim.width - 40,
                height:
                  ((winDim.width - 40) * picture.currentPicture.height!) /
                  picture.currentPicture.width!,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: '#fffa',
    borderRadius: 5,
    flexDirection: 'row',
    marginVertical: 10,
  },
  removeButton: {
    backgroundColor: '#abb2b7',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: -10,
    top: -10,
    zIndex: 2,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
  },
  acceptButton: {
    backgroundColor: '#22b08a',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: -10,
    bottom: -10,
    zIndex: 2,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
  },
  icon: {
    marginRight: 10,
  },
  imagePreview: {
    borderRadius: 5,
    justifyContent: 'space-around',
    resizeMode: 'contain',
  },
  container: {
    padding: 20,
    flex: 1,
  },
});

export default Home;
