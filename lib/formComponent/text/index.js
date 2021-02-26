import * as React from 'react';
import { TextInput } from 'react-native';
import styles from './style';
export const InputText = ({ value, textInputStyle, defaultColor, upsideEmit, ...rest }) => {
    const onChangeHandler = (text) => {
        upsideEmit(text);
        return;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(TextInput, Object.assign({ style: [
                { color: defaultColor, borderColor: defaultColor },
                styles.defaultTextInputStyle,
                textInputStyle,
            ], onChangeText: (text) => onChangeHandler(text), value: value }, rest))));
};
