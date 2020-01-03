import { AsyncStorage, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 667;
const shortSize = width < height ? width : height;
const longSize = width < height ? height : width;

const scaleWidth = shortSize / baseWidth;
const scaleHeight = longSize / baseHeight;
const scale = Math.min( scaleWidth, scaleHeight );

export const scaledSize = size => Math.ceil( size * scale );
export const moderateScale = (size, factor = 0.5) => size + ( scaledSize(size) - size ) * factor;

export const __ONESIGNAL_APP_ID = '5cab2e35-0003-46d0-b3fb-5320a5a66332';

export const __ONESIGNAL_USER_ID_KEY = 'onesignal_user_id';

export const __SIGN_IN_FLAG = 'is_signed_in';

export const __USER_PROFILE = 'user_profile';

export const handleSignOut = async () => {
  try {
    await AsyncStorage.removeItem(__SIGN_IN_FLAG);
    return null;
  } catch (error) {
    return error.message;
  }
}

export const theme = {
  primary: '#900',
}

export const defaultStyles = {
  hr: {
    marginVertical: 16,
    alignSelf: 'stretch', 
    borderTopWidth: 1, 
    borderColor: 'gray'
  }
}