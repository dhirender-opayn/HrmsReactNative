import {DefaultTheme} from '@react-navigation/native';
import Colors from '../Common/Colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.color.black,
    background: Colors.color.white,
  },
};
