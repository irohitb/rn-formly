// This is main formly array 
import { 
    Text, 
    Otp, 
    DateTyper, 
    CheckBox, 
    AutoComplete, 
    SingleImagePicker, 
    MultipleImagePicker
} from './inputFields'
import {TextStyle, ViewStyle} from 'react-native'
import ProgressBar from "react-native-form-progress"
export type InputField = Array<Text | Otp | DateTyper | CheckBox | AutoComplete | SingleImagePicker | MultipleImagePicker>


export interface Props {
    inputFields: InputField
    onButtonClick: (index:number, key: string, currentValue: any, payload: any[]) => void
    textStyle?: TextStyle
    helperTextStyle?: TextStyle
    backgroundViewColor?: string
    defaultColor?: string
    onFinish?: () => void
    backIconStyle?: TextStyle
    globalButtonText?: string 
    buttonSelectedTextStyle?: TextStyle
    errorStyle?: TextStyle
    defaultErrorMessage?:string
    buttonNotSelectedTextStyle?:TextStyle 
    progressBar?: typeof ProgressBar
    buttonSelectedStyle:ViewStyle
    buttonNotSelectedStyle: ViewStyle
}