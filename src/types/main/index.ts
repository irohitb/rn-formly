// This is main formly array 
import {TextStyle, TextInput} from 'react-native'
import NextTextInput from 'react-native-next-input/lib';
import {DateSupportedFormats} from '../formComponents/index'

export interface BaseProps {
    key: string
    label: string,
    required?: boolean
    helper?: string
    validator?: (index:number, key: string, currentData:any, payload: any[]) => void
    buttonText?: string
}


export interface Text extends BaseProps {
    type: 'text'
    defaultValue?: string
    templateOptions: {
        componentProps?: TextInput
    }
    templateStyle:TextStyle
}

export interface Otp extends BaseProps {
    type: 'otp',
    defaultValue?: Array<string>
    templateOptions: {
        noOfTextInput: number
        textInputStyle?:  TextStyle
        componentProps?: typeof NextTextInput
    }
}

export interface DateTyper extends BaseProps {
    type: 'dateTyper', 
    defaultValue?: Array<string> | string
    templateOptions: {
        dateFormat: DateSupportedFormats
        componentProps?: typeof NextTextInput
    }
}


export interface 


