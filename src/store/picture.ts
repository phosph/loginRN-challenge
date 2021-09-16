import {makeAutoObservable, runInAction} from 'mobx';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import {ToastAndroid} from 'react-native';

const promisfy =
  (callback: typeof launchCamera | typeof launchImageLibrary) =>
  (options: CameraOptions | ImageLibraryOptions) =>
    new Promise<ImagePickerResponse>(resolve =>
      callback(options, r => resolve(r)),
    );

export const launchCameraAsync = promisfy(launchCamera);
export const launchImageLibraryAsync = promisfy(launchImageLibrary);

export default class Picture {
  constructor() {
    makeAutoObservable(this);
  }

  currentPicture: Asset | null = null;

  async takePhoto(): Promise<boolean> {
    const response = await launchCameraAsync({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
    });
    console.log(JSON.stringify(response));

    if (response.didCancel) return false;
    if (response.errorCode) throw new Error(response.errorCode);

    runInAction(() => {
      this.currentPicture = response.assets?.[0] ?? null;
    });

    return true;
  }

  async selecFromGalery(): Promise<boolean> {
    const response = await launchImageLibraryAsync({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
    });
    console.log(JSON.stringify(response));

    if (response.didCancel) return false;
    if (response.errorCode) throw new Error(response.errorCode);

    runInAction(() => {
      this.currentPicture = response.assets?.[0] ?? null;
    });

    return true;
  }

  removeCurrentPicture() {
    this.currentPicture = null;
  }
  uploadCurrentPicture() {
    ToastAndroid.show('accepted', ToastAndroid.SHORT);
    // console.log('upload');
    // this.currentPicture = null;
  }
}
