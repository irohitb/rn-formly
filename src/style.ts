import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    mainView: {
      flex: 1
    }, 
    btnDefualtStyle: {
      color: 'green',
      backgroundColor: 'white', 
      width: 200,
      height: 50
    }, 
    renderComponentView: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: 30,
    }, 
    textStyling: {
      fontSize: 28,
      fontWeight: 'bold'
    }, 
    defaultTextInputStyle: {
      width: 'auto',
      marginTop: 50,
      padding: 5,
      justifyContent: 'center',
      borderBottomWidth: 1, 
      width: Dimensions.get('window').width * 0.8,
      fontSize: 24
    }, 
    subText: {
      fontWeight: "300", 
      marginTop: 50, 
      fontSize: 16,
      width: Dimensions.get('window').width * 0.8,
      textAlign: 'center',
      color: '#757575'
    }, 
    defaultButton: {
      marginTop: 50,
      borderRadius: 20,
      width: Dimensions.get('window').width * 0.8,
      borderWidth: 1, 
      padding: 5, 
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "center",
    }, 
    defaultButtonText: {
      fontSize: 25,
      fontWeight: 'bold'
    }, 
    errorColor: {
      marginTop: 20, 
      color: 'red',
      fontSize: 14,
      fontWeight: 'bold'
    }, 
    nextInputStyle: {
      textAlign: 'center', 
      marginLeft: 5, 
      marginRight: 5, 
      fontSize: 20,
      borderBottomWidth: 1,
      marginTop: 50
    }, 
    defaultButtonNotSelected: {
      color: '#9E9E9E',
      borderColor: '#9E9E9E'
    }, 
    backButton: {
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'flex-start',
      marginTop: 10, 
      marginLeft: 10
    },
    backButtonText: {
      fontSize: 28,
      color: '#BDBDBD'
    },
    nonBackButton: {
      marginTop: 38 // Margin top here is 38 because our back button style have margin top 10 and font size 28 (10+28) 
    }
  })

  export default styles
