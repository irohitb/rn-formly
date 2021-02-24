import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    defaultTextInputStyle: {
      marginTop: 50,
      padding: 5,
      justifyContent: 'center',
      borderBottomWidth: 1, 
      width: Dimensions.get('window').width * 0.8,
      fontSize: 24
    }
  })
  

  export default styles