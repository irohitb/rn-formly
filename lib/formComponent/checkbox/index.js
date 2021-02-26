import * as React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { determineColorIntensity } from '@src/utils/colors';
import styles from './style';
const signupCheckBoxes = ({ selectedStyleText, unselectedStyleText, selectedStyle, unselectedStyle, upsideEmit, defaultColor, options, multipleSelect = false, value, }) => {
    let colorIntensityView, colorIntensityText;
    if (defaultColor) {
        const colorIntensity = determineColorIntensity(defaultColor);
        colorIntensityView = { backgroundColor: defaultColor };
        if (colorIntensity === 'light') {
            colorIntensityText = { color: '#37474F' };
        }
        else if (colorIntensity === 'dark') {
            colorIntensityText = { color: 'FAFAFA' };
        }
    }
    const fixedOptions = options.map((element) => {
        if (!element.hasOwnProperty('value'))
            element.value = false;
        return element;
    });
    const [state, setState] = React.useState(value && value.length > 0 ? value : fixedOptions);
    const componentDidMount = React.useRef(false);
    React.useEffect(() => {
        if (!componentDidMount.current) {
            componentDidMount.current = true;
        }
        else {
            upsideEmit(state);
        }
    }, [state]);
    const toggleState = (index) => {
        let copyState = [...state];
        const previousState = copyState[index]['value'];
        if (!multipleSelect) {
            // Setting all other values as false,
            // since the array for checkbox won't in normal scenario be big, we can just itterate and set it to false
            copyState = copyState.map((element) => {
                element.value = false;
                return element;
            });
        }
        copyState[index]['value'] = !previousState;
        setState(copyState);
    };
    return (React.createElement(View, null, state.map((option, index) => {
        if (!option.value) {
            return (React.createElement(TouchableOpacity, { style: [styles.boxStyle, styles.unselectedStyle, unselectedStyle], onPress: () => toggleState(index), key: index },
                React.createElement(Text, { style: [
                        styles.boxText,
                        styles.unselectedStyleText,
                        unselectedStyleText,
                    ] }, option.label)));
        }
        else if (option.value) {
            return (React.createElement(TouchableOpacity, { style: [
                    styles.boxStyle,
                    styles.selectedStyle,
                    colorIntensityView,
                    selectedStyle,
                ], onPress: () => toggleState(index), key: index },
                React.createElement(Text, { style: [
                        styles.boxText,
                        styles.selectedStyleText,
                        colorIntensityText,
                        selectedStyleText,
                    ] }, option.label)));
        }
    })));
};
export default signupCheckBoxes;
