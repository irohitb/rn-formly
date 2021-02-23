import {TextInput, StyleSheet, Dimensions, StyleProp, TextStyle, ImageStyle} from 'react-native'
import {Image as ImageType} from 'react-native-image-crop-picker';

interface TextBaseProps {
    value?:  string, 
    upsideEmit: (val: string) => void ,
    textInputStyle?:  TextStyle
    defaultColor: string
}

export type TextInputProps = TextBaseProps & TextInput


export interface OTPprops  {
    noOfTextInput: number
    upsideEmit: (values: Array<string>, value:string, refForTheCurrentValue:number) => void,
    value: Array<string>,
    textInputStyle?:  TextStyle
    inputTextPlaceHolder?: Array<string>
  }

export interface ImageBaseProps {
    cropHeight?: number,
    cropWidth?: number, 
    imageComponentStyle: ImageStyle, 
    defaultColor: string, 
  }
  

  export interface SingleImageProps extends ImageBaseProps {
    value?: ImageType
    upsideEmit: (value: ImageType) => void,
  }

  interface MultipleImageProps extends ImageBaseProps {
    value?: Array<ImageType | null>
    maximumNoOfImages?: number
    upsideEmit: (value: Array<ImageType | null>) => void,
  }
  