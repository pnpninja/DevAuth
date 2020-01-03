import { AsyncStorage } from 'react-native';
import _ from 'lodash';

export const tokenKey = 'access-token';
export const loginTimeKey = 'login-time';

const checkSignInStatus = async () => {
  const accessToken = await AsyncStorage.getItem(tokenKey);
  const loginTime = _.toInteger(await AsyncStorage.getItem(loginTimeKey));

  if (!accessToken || !loginTime) return false;
  if (loginTime + 86399000 < new Date().getTime()) return false;
  
  return accessToken;
}

export default checkSignInStatus;