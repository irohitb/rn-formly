import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  boxStyle: {
    marginTop: 50,
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.8,
    borderWidth: 1,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  boxText: {
    fontSize: 20,
  },
  selectedStyle: {
    backgroundColor: 'black',
    borderColor: 'white',
  },
  selectedStyleText: {
    color: 'white',
  },
  unselectedStyle: {
    borderColor: '#9E9E9E',
  },
  unselectedStyleText: {
    color: '#9E9E9E',
  },
});
export default styles;
