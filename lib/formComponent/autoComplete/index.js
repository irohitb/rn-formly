import * as React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, } from 'react-native';
import debounce from '@src/utils/debouncing';
import styles from './styles';
const DEFAULT_ERROR_MESSAGE = 'Error While Loading the data';
const AutoComplete = ({ upsideEmit, defaultColor, value, asyncFunction, textInputStyle, loaderRequired, listTextStyle, listViewStyle, debouncingTime = 500, debouncingEnable = true, ...rest }) => {
    let parentViewRef = React.useRef();
    const [state, setState] = React.useState({
        layoutProperties: null,
        modalOpen: false,
        loading: false,
        suggestions: [],
    });
    const shouldSearch = React.useRef(debounce(getNewSuggestionData, debouncingTime));
    const onFocus = async () => {
        const { layoutProperties } = state;
        let copyState = { ...state };
        if (parentViewRef.current.measure && !layoutProperties) {
            parentViewRef.current.measure((fx, fy, width, height, px, py) => {
                copyState.layoutProperties = {
                    width: width,
                    height: height,
                    offsetX: px,
                    offsetY: py,
                };
            });
        }
        //To check if values have data or not (we get from props)
        //Set that as first suggestion
        const valueArr = Object.values(value);
        if (valueArr.length > 0 && value.title) {
            const suggestions = await asyncFunction(value.title);
            copyState.suggestions = [...suggestions];
        }
        setState(copyState);
    };
    async function getNewSuggestionData(text) {
        const { layoutProperties, modalOpen } = state;
        const copyState = { ...state };
        if (loaderRequired) {
            copyState.loading = true;
        }
        if (layoutProperties && !modalOpen) {
            copyState.modalOpen = true;
        }
        try {
            setState(copyState);
            const suggestions = await asyncFunction(text);
            copyState.suggestions = [...suggestions];
        }
        catch (error) {
            if (modalOpen) {
                copyState.modalOpen = false;
            }
            if (!error.message) {
                error.message = DEFAULT_ERROR_MESSAGE;
            }
            upsideEmit(null, false, error);
        }
        if (loaderRequired) {
            copyState.loading = false;
        }
        setState(copyState);
    }
    const onChangeHandler = (text) => {
        shouldSearch.current(text);
    };
    const onSelection = (selectedObj) => {
        const { modalOpen, loading } = state;
        const copysState = { ...state };
        // If loading or modal open is is true, set to false
        copysState.loading = !loading || false;
        copysState.modalOpen = !modalOpen || false;
        upsideEmit(selectedObj, true);
    };
    if (!state.modalOpen) {
        return (React.createElement(View, null,
            React.createElement(TextInput, Object.assign({}, rest, { ref: parentViewRef, style: [
                    { color: defaultColor, borderColor: defaultColor },
                    styles.defaultTextInputStyle,
                    textInputStyle,
                ], onChangeText: (text) => onChangeHandler(text), onFocus: onFocus, value: value.title }))));
    }
    else {
        return (React.createElement(View, { style: [
                styles.modelOpenViewMain,
                {
                    marginTop: state.layoutProperties
                        ? -state.layoutProperties.offsetY + 83.5
                        : 0,
                },
            ] },
            React.createElement(View, { needsOffscreenAlphaCompositing: true, style: styles.modelOpenViewSub },
                React.createElement(TextInput, Object.assign({}, rest, { ref: parentViewRef, style: [
                        { color: defaultColor, borderColor: defaultColor },
                        styles.defaultTextInputStyle,
                        textInputStyle,
                    ], onChangeText: (text) => onChangeHandler(text), onFocus: onFocus, value: value.title, autoFocus: true })),
                state.loading ? (React.createElement(View, { style: styles.loadingView },
                    React.createElement(ActivityIndicator, { size: "large", color: defaultColor }))) : (React.createElement(FlatList, { data: state.suggestions, renderItem: ({ item }) => (React.createElement(TouchableOpacity, { onPress: () => onSelection(item), style: [styles.flatlistIndividualComponent, listViewStyle] },
                        React.createElement(Text, { style: [
                                styles.flatListIndividualComponentText,
                                listTextStyle,
                            ] },
                            ' ',
                            item.title))), keyExtractor: (item) => item.id.toString() })))));
    }
};
export default AutoComplete;
