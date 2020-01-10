import React, {useState, useEffect} from 'react' 
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import ProgressBar from "react-native-form-prorgress"
import {
  DateTyper, 
  CheckBoxes, 
  PickerBottom, 
  PickerAtPosition, 
  SingleImageSelector,
  MultipleImageSelector, 
  Otp,
  InputText, 
  AutoComplete
} from './formComponent/index'
import Spinner from 'react-native-loading-spinner-overlay'

 const SignupFormComponent = (props) => {

  const {
    keyboardAutoOpenForText, 
    inputFields, 
    buttonSelectedStyle, 
    ProgressBarProps,  
    backgroundViewColor, 
    defaultColor, 
    helperTextStyle, 
    globalButtonText,
    buttonSelectedTextStyle,
    textStyle,
    onButtonClick,
    errorStyle,
    defaultErrorMessage,
    buttonNotSelectedStyle,
    buttonNotSelectedTextStyle,
    backIconStyle,
    onFinish
  } = props

  // All the component 
  const [index, setIndex] = useState(0)
  const [payload, setPayloadData] = useState({})
  const [Loading, toggleLoadingData] = useState(false)
  const [Error, setErrorData] = useState({status: false, message: ''})
  const [buttonDisable, toggleButtonDisable] = useState(true)
  // Current Component based on indux
  const currentComponent = inputFields[index]
  const {
    key, 
    type, 
    label, 
    helper, 
    buttonText, 
    validator
  } = currentComponent
  let {required} = currentComponent
  const templateOptions =  currentComponent.templateOptions || {}
  // if no template options, initlalize an empty object
  const {
    templateStyle, 
    options, 
    multipleSelect, 
    // Image Props
    imageComponentStyle,
    cropHeight,
    cropWidth,
    //---- Date Format
    dateFormat,
    //---- OTP 
    noOfTextInput, 
    componentProps,
    //---- AutoComplete 
    asyncFunction,
    loaderRequired
  }  = templateOptions

  // Button Touch 
  const usedButtonText =  buttonText || globalButtonText
  // Setting button touch style based on state/validation
  const userButtonStyle = required ? buttonNotSelectedStyle : buttonSelectedStyle
  const userButtonTextStyle = required ? buttonNotSelectedTextStyle: buttonSelectedTextStyle
  // Initially setting up button state based on input from the json (required)

  // Setting up/mutating props 

  // --- Validators --- 
  // Validator hook effect in the bottom 
  const inputValidatorSelector = () => {
    if (validator  === undefined && !payload[key] && required) return () => true
    if (validator) return validator
    return () => false
  }
  const inputValidator = inputValidatorSelector()

  // --- Progress bar ---
  ProgressBarProps.currentProgress = index 
  ProgressBarProps.totalNumberOfProgressBars = inputFields.length
  ProgressBarProps.colorOfProgressBar = ProgressBarProps.colorOfProgressBar || defaultColor

  // All Functions declareation 
  // --------------------------
  const onChangeHandler =  (data, errorMessage=null) => {
    // Error Message is usually passed from the child components (look ad date componenet example )
    if (!errorMessage && (data === '' || data)) { // Doing data = "" in case someone want to remove last char of a string
      const currentData = {...payload}
      currentData[key] = data
      setPayloadData(currentData)
    } else if (errorMessage) {
      setErrorData({status: true, message: errorMessage})
    }
    return
  }

  const getValueFromState  = async () => {
    if (index === inputFields.length - 1) {
      if (onFinish) return onFinish
      else return 
    }
    setErrorData({status: false, message: ''})
    toggleLoadingData(true)
    const currentValue = payload[key]
    try {
      const eventTrack = await onButtonClick(index, key, currentValue, payload)
      if (index < inputFields.length) setIndex(index + 1)
      toggleButtonDisable(true)
      return toggleLoadingData(false)
    } catch (error) {
      if (error.message) setErrorData({status: true, message: error.message})
      else setErrorData({status: false, message: defaultErrorMessage})
      return toggleLoadingData(false)
    }
  }

  const decreaseStateIndex = () => {
    if (index > 0) return setIndex(index - 1)
    return 
  }

  // React Hooks
  // --------------------
  // Fired whenever payload changes, for validation
  useEffect(() => {
    const currentData = payload[key]
    const checkValidation = inputValidator(index, key, currentData, payload) 
    toggleButtonDisable(checkValidation)
  },[payload, index])
  
  const mapSignUpComponents = {
    text: (
      <InputText  
        {...componentProps}
        textInputStyle={templateStyle}
        defaultColor={defaultColor}
        upsideEmit={text => onChangeHandler(text)}
        value={payload[key] ? `${payload[key]}` : ''} 
      />
    ),
    dateTyper: (
      <DateTyper
      textInputStyle={[{color: defaultColor, width: (Dimensions.get('window').width * 0.6)/8 }, styles.nextInputStyle, templateStyle]} 
      upsideEmit={onChangeHandler}
      dateFormat={dateFormat}
      value={payload[key] ? `${payload[key]}` : ''}/>
    ),
    checkboxes: options === undefined ? null : (
      <CheckBoxes 
      options={options}
      upsideEmit={onChangeHandler}
      defaultColor={defaultColor}
      imageComponentStyle={imageComponentStyle}
      cropHeight={cropHeight}
      />
    ), 
    pickerBottom:  options === undefined ? null : ( //Not Implmeneted yet
      <PickerBottom
      options={options}
      upsideEmit={onChangeHandler}
      value={payload[key] ? `${payload[key]}` : ''}/>
    ), 
    picker:  options === undefined ? null : (
      <PickerAtPosition 
      options={options}
      upsideEmit={onChangeHandler} 
      value={payload[key] ? `${payload[key]}` : ''}
      />
    ),
    image:  (
      <SingleImageSelector
      upsideEmit={onChangeHandler}
      value={{...payload[key]}}
      defaultColor={defaultColor}
      cropWidth={cropWidth}
      cropHeight={cropHeight}
      />
    ),
    images:  (
      <MultipleImageSelector
        upsideEmit={onChangeHandler}
        defaultColor={defaultColor}
        cropWidth={cropWidth}
        cropHeight={cropHeight}
        value={Array.isArray(payload[key]) ? [...payload[key]] : null}
      />
    ), 
    otp: noOfTextInput === undefined ? null : (
      <Otp
        noOfTextInput={noOfTextInput}
        upsideEmit={onChangeHandler}
        value={Array.isArray(payload[key]) ? [...payload[key]] : null}
        textInputStyle={[{color: defaultColor, width: (Dimensions.get('window').width * 0.6)/8 }, styles.nextInputStyle, templateStyle]} 
      />
    ),
    autoComplete: asyncFunction === undefined ? null : (
      <AutoComplete
        {...componentProps}
        upsideEmit={onChangeHandler}
        value={{...payload[key]}}
        defaultColor={defaultColor}
        asyncFunction={asyncFunction}
        loaderRequired={loaderRequired}
      />
    )
  }

  const renderComponent = mapSignUpComponents[type]

  return (
    <View style={{ flex: 1}}>
    <View style={{backgroundColor: backgroundViewColor, height: '100%'}}>  
    <Spinner
      visible={Loading} />
      <ProgressBar {...ProgressBarProps} />
      {/* Back button */}
        {index !== 0 ? (
          <TouchableOpacity onPress={decreaseStateIndex} style={styles.backButton}>
            <Text style={[styles.backButtonText]}> {'<'} </Text> 
          </TouchableOpacity> ) : <TouchableOpacity style={styles.nonBackButton}></TouchableOpacity>}
        <View style={styles.renderComponentView}>
          <Text style={[{color: defaultColor}, styles.textStyling, textStyle]}> {label}</Text>
          {renderComponent}
           { Error.status ?  (<Text style={[styles.subText, styles.errorColor,  helperTextStyle]}>{Error.message}</Text>): null }
          <Text style={[styles.subText, errorStyle]}>{helper}</Text>
          <TouchableOpacity 
            style={[required && buttonDisable ? styles.defaultButtonNotSelected : {borderColor: defaultColor, color: defaultColor}, styles.defaultButton, userButtonStyle]}
            onPress={getValueFromState}
            disabled={required && buttonDisable}
            > 
            <Text style={[ required && buttonDisable? styles.defaultButtonNotSelected : {borderColor: defaultColor, color: defaultColor}, styles.defaultButtonText, userButtonTextStyle]}> {usedButtonText} </Text> 
          </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}


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



SignupFormComponent.propTypes = { 
  keyboardAutoOpenForText: PropTypes.bool,  
  textStyle: PropTypes.object,
  inputFields: PropTypes.array.isRequired,
  ProgressBarProps: PropTypes.object, 
  helperTextStyle: PropTypes.object,
  backgroundViewColor:  PropTypes.string, 
  defaultColor: PropTypes.string,
  onFinish: PropTypes.func,
  //Buttons
  buttonSelectedStyle: PropTypes.object,
  globalButtonText: PropTypes.string.isRequired,
  buttonSelectedTextStyle: PropTypes.object,
  onButtonClick: PropTypes.func.isRequired,
  buttonNotSelectedStyle: PropTypes.object,
  buttonNotSelectedTextStyle: PropTypes.object,
  //Errors
  errorStyle: PropTypes.object, 
  defaultErrorMessage: PropTypes.string,
  backIconStyle: PropTypes.object
}
SignupFormComponent.defaultProps = {
  keyboardAutoOpenForText: true,
  ProgressBarProps: {
    blink: true,
  },
  backgroundViewColor: 'white',
  defaultColor: 'black', 
  defaultErrorMessage: 'Sorry Something went wrong'
}



export default SignupFormComponent






