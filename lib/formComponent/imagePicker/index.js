import * as React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';
export const SingleImageSelector = ({ upsideEmit, cropWidth, cropHeight, imageComponentStyle, defaultColor, value, }) => {
    const selectImage = async () => {
        try {
            const imageDocRecieved = await ImagePicker.openPicker({
                width: cropWidth,
                height: cropHeight,
                cropping: true,
                multiple: false,
            });
            if (Array.isArray(imageDocRecieved)) {
                throw new Error('Bug in rn-formly library, Expected single image but recieved multiple Image');
            }
            upsideEmit(imageDocRecieved);
        }
        catch (error) {
            throw new Error(error);
        }
    };
    if (!value) {
        return (React.createElement(View, { style: styles.mainImageContainer },
            React.createElement(TouchableOpacity, { onPress: selectImage, style: [styles.imageView, styles.circleView, imageComponentStyle] },
                React.createElement(Text, { style: [styles.TextPlusSign, { color: defaultColor }] },
                    ' ',
                    "+",
                    ' '))));
    }
    else {
        return (React.createElement(View, { style: styles.mainImageContainer },
            React.createElement(TouchableOpacity, { onPress: selectImage, style: [styles.imageView, styles.circleView, imageComponentStyle] },
                React.createElement(Image, { source: { uri: value.path }, style: [styles.imageView, styles.circleView, imageComponentStyle] }))));
    }
};
export const MultipleImageSelector = ({ upsideEmit, cropWidth, cropHeight, imageComponentStyle, defaultColor, maximumNoOfImages, value, }) => {
    //Filling objects with null array
    const imageValue = value && Array.isArray(value)
        ? value
        : Array(maximumNoOfImages ? maximumNoOfImages : 9).fill(null);
    const selectImage = async (index) => {
        try {
            const imageDocRecieved = await ImagePicker.openPicker({
                width: cropWidth,
                height: cropHeight,
                cropping: true,
            });
            const currentImageDoc = [...imageValue];
            currentImageDoc[index] = imageDocRecieved;
            upsideEmit(currentImageDoc);
        }
        catch (error) {
            throw new Error(error);
        }
    };
    return (React.createElement(View, { style: styles.mainImageContainer },
        React.createElement(View, { style: styles.multipleImageContainerSubChild }, imageValue.map((el, index) => {
            if (el) {
                return (React.createElement(TouchableOpacity, { onPress: () => selectImage(index), key: index, style: [
                        styles.multipleImageContainerSingleChild,
                        imageComponentStyle,
                    ] },
                    React.createElement(Image, { source: { uri: el.path }, style: [
                            styles.multipleImageContainerSingleChild,
                            imageComponentStyle,
                        ] })));
            }
            else {
                return (React.createElement(TouchableOpacity, { onPress: () => selectImage(index), key: index, style: [
                        styles.multipleImageContainerSingleChild,
                        imageComponentStyle,
                    ] },
                    React.createElement(Text, { style: [styles.multipleImagePlus, { color: defaultColor }] }, "+")));
            }
        }))));
};
