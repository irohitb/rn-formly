import { Text, Otp, DateTyper, CheckBox, AutoComplete, SingleImagePicker, MultipleImagePicker } from './inputFields';
import { TextStyle, ViewStyle } from 'react-native';
import { ProgressBarProps } from 'react-native-form-progress';
export declare type InputField = Array<Text | Otp | DateTyper | CheckBox | AutoComplete | SingleImagePicker | MultipleImagePicker>;
export interface Props {
    inputFields: InputField;
    onButtonClick: (index: number, key: string, currentValue: any, payload: {
        [key: string]: any;
    }) => Promise<void>;
    textStyle?: TextStyle;
    helperTextStyle?: TextStyle;
    backgroundViewColor?: string;
    defaultColor?: string;
    onFinish?: () => void;
    backIconStyle?: TextStyle;
    globalButtonText?: string;
    buttonSelectedTextStyle?: TextStyle;
    errorStyle?: TextStyle;
    defaultErrorMessage?: string;
    buttonNotSelectedTextStyle?: TextStyle;
    progressBar?: Partial<ProgressBarProps>;
    buttonSelectedStyle: ViewStyle;
    buttonNotSelectedStyle: ViewStyle;
    startingIndex: number;
}
