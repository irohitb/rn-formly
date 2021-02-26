import * as React from 'react';
import NextTextInput from 'react-native-next-input';
import styles from './style';
const Otp = ({ noOfTextInput, upsideEmit, value, textInputStyle, inputTextPlaceHolder, ...rest }) => {
    const onChangeHandler = (dateArray, currentValue, refForTheCurrentValue) => {
        const stringifyArray = dateArray.join('');
        if (stringifyArray.length === noOfTextInput) {
            upsideEmit(dateArray, currentValue, refForTheCurrentValue);
        }
    };
    const textStyles = {
        ...styles.textInputStyle,
        ...textInputStyle,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(NextTextInput, Object.assign({ onChangeValue: onChangeHandler, noOfTextInput: noOfTextInput, textInputStyle: textStyles, placeholder: inputTextPlaceHolder, value: value }, rest))));
};
export default Otp;
