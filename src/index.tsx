import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ProgressBar from 'react-native-form-progress';
import {
  DateTyper,
  CheckBoxes,
  SingleImageSelector,
  MultipleImageSelector,
  Otp,
  InputText,
  AutoComplete,
} from '@src/formComponent/index';
import Spinner from 'react-native-loading-spinner-overlay';
import { Props } from '@src/types/main';

const SignupFormComponent = ({
  inputFields,
  buttonSelectedStyle,
  progressBar = {
    blink: false,
  },
  backgroundViewColor = 'white',
  defaultColor = 'black',
  helperTextStyle,
  globalButtonText = 'Next',
  buttonSelectedTextStyle,
  textStyle,
  onButtonClick,
  errorStyle,
  defaultErrorMessage = 'Sorry Something went wrong',
  buttonNotSelectedStyle,
  buttonNotSelectedTextStyle,
  backIconStyle,
  onFinish,
  startingIndex = 0,
}: Props) => {
  // All the component
  const [index, setIndex] = React.useState(startingIndex);
  const [payload, setPayloadData] = React.useState<{ [key: string]: any }>({});
  const [Loading, toggleLoadingData] = React.useState(false);
  const [Error, setErrorData] = React.useState({ status: false, message: '' });
  const [buttonDisable, toggleButtonDisable] = React.useState(true);
  // Current Component based on indux
  const currentComponent = inputFields[index];
  const {
    key,
    type,
    label,
    helper,
    buttonText,
    validator,
    defaultValue,
    templateOptions,
  } = currentComponent;
  let { required } = currentComponent;
  // if no template options, initlalize an empty object
  const {
    templateStyle,
    options,
    multipleSelect,
    // Image Props
    cropHeight,
    cropWidth,
    //---- Date Format
    dateFormat,
    //---- OTP
    noOfTextInput,
    componentProps,
    //---- AutoComplete
    asyncFunction,
    loaderRequired,
    listViewStyle,
    listTextStyle,
  } = templateOptions;

  // Button Touch
  const usedButtonText = buttonText || globalButtonText;
  // Setting button touch style based on state/validation
  const userButtonStyle = required
    ? buttonNotSelectedStyle
    : buttonSelectedStyle;
  const userButtonTextStyle = required
    ? buttonNotSelectedTextStyle
    : buttonSelectedTextStyle;
  // Initially setting up button state based on input from the json (required)

  // Setting up/mutating props

  // --- Validators ---
  // Validator hook effect in the bottom
  const inputValidatorSelector = () => {
    if (validator === undefined && !payload[key] && required) return () => true;
    if (validator) return validator;
    return () => false;
  };
  const inputValidator = inputValidatorSelector();

  // --- Progress bar ---
  progressBar.defaultProgress = index;
  progressBar.totalNumberOfProgressBars = inputFields.length;
  progressBar.colorOfProgressBar =
    progressBar.colorOfProgressBar || defaultColor;

  // All Functions declareation
  // --------------------------
  const onChangeHandler = (data: any, errorMessage = null, ...rest: any) => {
    // Error Message is usually passed from the child components (look ad date componenet example )
    if (!errorMessage && (data === '' || data)) {
      // Doing data = "" in case someone want to remove last char of a string
      const currentData = { ...payload };
      currentData[key] = data;
      setPayloadData(currentData);
    } else if (errorMessage) {
      setErrorData({ status: true, message: errorMessage });
    }
    return;
  };

  const getValueFromState = async () => {
    if (index === inputFields.length - 1) {
      if (onFinish) return onFinish;
      else return;
    }
    setErrorData({ status: false, message: '' });
    toggleLoadingData(true);
    const currentValue = payload[key];
    try {
      const eventTrack = await onButtonClick(index, key, currentValue, payload);
      if (index < inputFields.length) setIndex(index + 1);
      toggleButtonDisable(true);
      return toggleLoadingData(false);
    } catch (error) {
      if (error.message) setErrorData({ status: true, message: error.message });
      else setErrorData({ status: false, message: defaultErrorMessage });
      return toggleLoadingData(false);
    }
  };

  const decreaseStateIndex = () => {
    if (index > 0) return setIndex(index - 1);
    return;
  };

  // React Hooks
  // --------------------
  // Fired whenever payload changes, for validation
  React.useEffect(() => {
    const currentData = payload[key];
    const checkValidation = inputValidator(index, key, currentData, payload);
    toggleButtonDisable(checkValidation);
  }, [payload, index]);

  const mapSignUpComponents = {
    text: (
      <InputText
        {...componentProps}
        textInputStyle={templateStyle}
        defaultColor={defaultColor}
        upsideEmit={(text) => onChangeHandler(text)}
        value={payload[key] || defaultValue || ''}
      />
    ),
    dateTyper: (
      <DateTyper
        {...componentProps}
        textInputStyle={[
          {
            color: defaultColor,
            width: (Dimensions.get('window').width * 0.6) / 8,
          },
          styles.nextInputStyle,
          templateStyle,
        ]}
        upsideEmit={onChangeHandler}
        dateFormat={dateFormat}
        value={payload[key] ? `${payload[key]}` : ''}
      />
    ),
    checkboxes:
      options === undefined ? null : (
        <CheckBoxes
          options={options}
          upsideEmit={onChangeHandler}
          defaultColor={defaultColor}
          multipleSelect={multipleSelect}
        />
      ),
    image: (
      <SingleImageSelector
        upsideEmit={onChangeHandler}
        value={{ ...payload[key] }}
        defaultColor={defaultColor}
        cropWidth={cropWidth}
        cropHeight={cropHeight}
      />
    ),
    images: (
      <MultipleImageSelector
        upsideEmit={onChangeHandler}
        defaultColor={defaultColor}
        cropWidth={cropWidth}
        cropHeight={cropHeight}
        value={Array.isArray(payload[key]) ? [...payload[key]] : null}
      />
    ),
    otp:
      noOfTextInput === undefined ? null : (
        <Otp
          {...componentProps}
          noOfTextInput={noOfTextInput}
          upsideEmit={onChangeHandler}
          value={Array.isArray(payload[key]) ? [...payload[key]] : null}
          textInputStyle={[
            {
              color: defaultColor,
              width: (Dimensions.get('window').width * 0.6) / 8,
            },
            styles.nextInputStyle,
            templateStyle,
          ]}
        />
      ),
    autoComplete:
      asyncFunction === undefined ? null : (
        <AutoComplete
          {...componentProps}
          upsideEmit={onChangeHandler}
          value={{ ...payload[key] }}
          defaultColor={defaultColor}
          asyncFunction={asyncFunction}
          loaderRequired={loaderRequired}
          listViewStyle={listViewStyle}
          listTextStyle={listTextStyle}
        />
      ),
  };

  const renderComponent = mapSignUpComponents[type];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: backgroundViewColor, height: '100%' }}>
        <Spinner visible={Loading} />
        <ProgressBar {...progressBar} />
        {/* Back button */}
        {index !== 0 ? (
          <TouchableOpacity
            onPress={decreaseStateIndex}
            style={styles.backButton}
          >
            <Text style={[styles.backButtonText, backIconStyle]}> {'<'} </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nonBackButton}></TouchableOpacity>
        )}
        <View style={styles.renderComponentView}>
          <Text
            style={[{ color: defaultColor }, styles.textStyling, textStyle]}
          >
            {' '}
            {label}
          </Text>
          {renderComponent}
          {Error.status ? (
            <Text style={[styles.subText, styles.errorColor, helperTextStyle]}>
              {Error.message}
            </Text>
          ) : null}
          <Text style={[styles.subText, errorStyle]}>{helper}</Text>
          <TouchableOpacity
            style={[
              required && buttonDisable
                ? styles.defaultButtonNotSelected
                : { borderColor: defaultColor, color: defaultColor },
              styles.defaultButton,
              userButtonStyle,
            ]}
            onPress={getValueFromState}
            disabled={required && buttonDisable}
          >
            <Text
              style={[
                required && buttonDisable
                  ? styles.defaultButtonNotSelected
                  : { borderColor: defaultColor, color: defaultColor },
                styles.defaultButtonText,
                userButtonTextStyle,
              ]}
            >
              {' '}
              {usedButtonText}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

SignupFormComponent.propTypes = {
  textStyle: PropTypes.object,
  inputFields: PropTypes.array.isRequired,
  progressBar: PropTypes.object,
  helperTextStyle: PropTypes.object,
  backgroundViewColor: PropTypes.string,
  defaultColor: PropTypes.string,
  onFinish: PropTypes.func,
  //Buttons
  buttonSelectedStyle: PropTypes.object,
  globalButtonText: PropTypes.string,
  buttonSelectedTextStyle: PropTypes.object,
  onButtonClick: PropTypes.func.isRequired,
  buttonNotSelectedStyle: PropTypes.object,
  buttonNotSelectedTextStyle: PropTypes.object,
  //Errors
  errorStyle: PropTypes.object,
  defaultErrorMessage: PropTypes.string,
  backIconStyle: PropTypes.object,
};

SignupFormComponent.defaultProps = {
  progressBar: {
    blink: false,
  },
  globalButtonText: 'Next',
  backgroundViewColor: 'white',
  defaultColor: 'black',
  defaultErrorMessage: 'Sorry Something went wrong',
};

export default SignupFormComponent;
