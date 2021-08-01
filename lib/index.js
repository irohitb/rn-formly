import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions, } from 'react-native';
import ProgressBar from 'react-native-form-progress';
import { DateTyper, CheckBoxes, SingleImageSelector, MultipleImageSelector, Otp, InputText, AutoComplete, } from './formComponent/index';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './style';
const SignupFormComponent = ({ inputFields, buttonSelectedStyle, progressBar = {
    blink: false,
}, backgroundViewColor = 'white', defaultColor = 'black', helperTextStyle, globalButtonText = 'Next', buttonSelectedTextStyle, textStyle, onButtonClick, errorStyle, defaultErrorMessage = 'Sorry Something went wrong', buttonNotSelectedStyle, buttonNotSelectedTextStyle, backIconStyle, onFinish, startingIndex = 0, }) => {
    // All the component
    const [index, setIndex] = React.useState(startingIndex);
    const [payload, setPayloadData] = React.useState({});
    const [state, setState] = React.useState({
        loading: false,
        error: {
            status: false,
            message: null,
        },
        buttonDisable: false,
    });
    let componentDidMount = React.useRef(false);
    // Current Component based on indux
    const currentComponent = inputFields[index];
    const { key, type, label, helper, buttonText, validator, defaultValue, templateOptions, } = currentComponent;
    let { required } = currentComponent;
    // typescript does not support block space ts-ignore
    // Since this file was originally in JS so later in code we handle if it is undefined (when we create hasmap)
    // TS wants to check when destructuring
    let { 
    //@ts-ignore
    templateStyle, 
    //@ts-ignore
    options, 
    //@ts-ignore
    multipleSelect, 
    //@ts-ignore
    cropHeight, 
    //@ts-ignore
    cropWidth, 
    //@ts-ignore
    dateFormat, 
    //@ts-ignore
    noOfTextInput, 
    //@ts-ignore
    componentProps, 
    //@ts-ignore
    asyncFunction, 
    //@ts-ignore
    loaderRequired, 
    //@ts-ignore
    listViewStyle, 
    //@ts-ignore
    listTextStyle, } = templateOptions;
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
        if (validator === undefined && !payload[key] && required)
            return () => true;
        if (validator)
            return validator;
        return () => false;
    };
    const inputValidator = inputValidatorSelector();
    // --- Progress bar ---
    let progressBarProps = {
        currentProgress: index,
        totalNumberOfProgressBars: inputFields.length,
        colorOfProgressBar: progressBar.colorOfProgressBar || defaultColor,
    };
    // All Functions declareation
    // --------------------------
    const onChangeHandler = (data, errorMessage = null, ...rest) => {
        // Error Message is usually passed from the child components (look ad date componenet example)
        if (!errorMessage && (data === '' || data)) {
            // Doing data = "" in case someone want to remove last char of a string
            const currentData = { ...payload };
            currentData[key] = { data, ...rest };
            setPayloadData(currentData);
        }
        else if (errorMessage) {
            const currentState = { ...state, status: true, message: errorMessage };
            setState(currentState);
        }
        return;
    };
    const getValueFromState = async () => {
        if (index === inputFields.length - 1) {
            if (onFinish) {
                return onFinish;
            }
            else {
                return;
            }
        }
        else {
            const defaultError = { status: false, message: '' };
            const currentState = { ...state, loading: true, error: defaultError };
            setState({ ...currentState });
            const currentValue = payload[key];
            try {
                const eventTrack = await onButtonClick(index, key, currentValue, payload);
                if (index < inputFields.length) {
                    setIndex(index + 1);
                }
                const currentState = { ...state, buttonDisable: true, loading: false };
                setState({ ...currentState });
            }
            catch (error) {
                const copyState = { ...state, loading: false };
                const defaultError = { status: false, message: defaultErrorMessage };
                if (error.message) {
                    defaultError.message = error.message;
                }
                copyState.error = { ...defaultError };
                setState({ ...currentState });
            }
        }
    };
    const decreaseStateIndex = () => {
        if (index > 0) {
            return setIndex(index - 1);
        }
        return;
    };
    // React Hooks
    // --------------------
    // Fired whenever payload changes, for validation
    React.useEffect(() => {
        if (!componentDidMount.current) {
            componentDidMount.current = true;
        }
        else {
            const currentData = payload[key];
            const checkValidation = inputValidator(index, key, currentData, payload);
            setState({ ...state, buttonDisable: checkValidation });
        }
    }, [payload, index]);
    const mapSignUpComponents = {
        text: (React.createElement(InputText, Object.assign({}, componentProps, { textInputStyle: templateStyle, defaultColor: defaultColor, upsideEmit: (text) => onChangeHandler(text), value: payload[key] || defaultValue || '' }))),
        dateTyper: (React.createElement(DateTyper, Object.assign({}, componentProps, { textInputStyle: [
                {
                    color: defaultColor,
                    width: (Dimensions.get('window').width * 0.6) / 8,
                },
                styles.nextInputStyle,
                templateStyle,
            ], upsideEmit: onChangeHandler, dateFormat: dateFormat, value: payload[key] ? `${payload[key]}` : '' }))),
        checkboxes: options === undefined ? null : (React.createElement(CheckBoxes, { options: options, upsideEmit: onChangeHandler, defaultColor: defaultColor, multipleSelect: multipleSelect })),
        image: (React.createElement(SingleImageSelector, { upsideEmit: onChangeHandler, value: { ...payload[key] }, defaultColor: defaultColor, cropWidth: cropWidth, cropHeight: cropHeight })),
        images: (React.createElement(MultipleImageSelector, { upsideEmit: onChangeHandler, defaultColor: defaultColor, cropWidth: cropWidth, cropHeight: cropHeight, value: [...payload[key]] })),
        otp: noOfTextInput === undefined ? null : (React.createElement(Otp, Object.assign({}, componentProps, { noOfTextInput: noOfTextInput, upsideEmit: onChangeHandler, value: Array.isArray(payload[key]) ? [...payload[key]] : null, textInputStyle: [
                {
                    color: defaultColor,
                    width: (Dimensions.get('window').width * 0.6) / 8,
                },
                styles.nextInputStyle,
                templateStyle,
            ] }))),
        autoComplete: asyncFunction === undefined ? null : (React.createElement(AutoComplete, Object.assign({}, componentProps, { upsideEmit: onChangeHandler, value: { ...payload[key] }, defaultColor: defaultColor, asyncFunction: asyncFunction, loaderRequired: loaderRequired, listViewStyle: listViewStyle, listTextStyle: listTextStyle }))),
    };
    const renderComponent = mapSignUpComponents[type];
    const { loading, error, buttonDisable } = state;
    return (React.createElement(View, { style: { flex: 1 } },
        React.createElement(View, { style: { backgroundColor: backgroundViewColor, height: '100%' } },
            React.createElement(Spinner, { visible: loading }),
            React.createElement(ProgressBar, Object.assign({}, progressBarProps)),
            index !== 0 ? (React.createElement(TouchableOpacity, { onPress: decreaseStateIndex, style: styles.backButton },
                React.createElement(Text, { style: [styles.backButtonText, backIconStyle] },
                    " ",
                    '<',
                    " "))) : (React.createElement(TouchableOpacity, { style: styles.nonBackButton })),
            React.createElement(View, { style: styles.renderComponentView },
                React.createElement(Text, { style: [{ color: defaultColor }, styles.textStyling, textStyle] },
                    ' ',
                    label),
                renderComponent,
                error.status ? (React.createElement(Text, { style: [styles.subText, styles.errorColor, helperTextStyle] }, error.message)) : null,
                React.createElement(Text, { style: [styles.subText, errorStyle] }, helper),
                React.createElement(TouchableOpacity, { style: [
                        required && buttonDisable
                            ? styles.defaultButtonNotSelected
                            : { borderColor: defaultColor, color: defaultColor },
                        styles.defaultButton,
                        userButtonStyle,
                    ], onPress: getValueFromState, disabled: required && buttonDisable },
                    React.createElement(Text, { style: [
                            required && buttonDisable
                                ? styles.defaultButtonNotSelected
                                : { borderColor: defaultColor, color: defaultColor },
                            styles.defaultButtonText,
                            userButtonTextStyle,
                        ] }, usedButtonText))))));
};
export default SignupFormComponent;
