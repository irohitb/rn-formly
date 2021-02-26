import * as React from 'react';
import styles from './styles';
import NextTextInput from 'react-native-next-input';
const ERROR_DEFAULT_MESSAGE = 'Invalid Date, Please check the entered date again';
// Used for Date
const dateFormatter = {
    DDMMYYYY: (input) => {
        const formatInput = input.join('');
        const date = new Date(formatInput.replace(/(\d{2})(\d{2})(\d{4})/, '$2-$1-$3'));
        if (date instanceof Date)
            return date;
        else
            throw new Error(ERROR_DEFAULT_MESSAGE);
    },
    MMDDYYYY: (input) => {
        const formatInput = input.join('');
        const date = new Date(formatInput.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3'));
        if (date instanceof Date)
            return date;
        else
            throw new Error(ERROR_DEFAULT_MESSAGE);
    },
    YYYYMMDD: (input) => {
        const formatInput = input.join('');
        const date = new Date(formatInput.replace(/(\d{4})(\d{2})(\d{2})/, '$3-$2-$1'));
        if (date instanceof Date)
            return date;
        else
            throw new Error(ERROR_DEFAULT_MESSAGE);
    },
};
const DateTyper = ({ dateFormat = 'DDMMYYYY', textInputStyle, upsideEmit, value = [], ...rest }) => {
    if (value.length > 8) {
        console.warn('Value supplied for data Typer might be incorrect');
    }
    // if array, convert to string
    let formatedValue = value && Array.isArray(value) ? value.join('') : value;
    // Creating placeholder for our Next Input component
    const inputTextPlaceHolder = dateFormat.split('');
    // On change Value
    const onChangeHandler = (dateArray, currentValue, refForTheCurrentValue) => {
        // Would filter out value
        const filterArray = dateArray.filter((value) => value);
        if (filterArray.length === 8) {
            //update in state
            const date = dateFormatter[dateFormat](dateArray).toString().split('');
            upsideEmit(date, currentValue, refForTheCurrentValue);
        }
    };
    const textInputMergedStyle = {
        ...styles.textInputStyle,
        textInputStyle,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(NextTextInput, { onChangeValue: onChangeHandler, noOfTextInput: 8, textInputStyle: textInputMergedStyle, placeholder: inputTextPlaceHolder, value: formatedValue.split('') })));
};
export default DateTyper;
//Formats
