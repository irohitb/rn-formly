import {TextInput, ViewStyle, TextStyle, ImageStyle} from 'react-native'
import {Image as ImageType} from 'react-native-image-crop-picker';
import NextTextInput from 'react-native-next-input'

interface TextBaseProps {
    value?:  string, 
    upsideEmit: (val: string) => void ,
    textInputStyle?:  TextStyle
    defaultColor: string
}

export type TextInputProps = TextBaseProps & Partial<TextInput>


export interface OTPBaseProps  {
    noOfTextInput: number
    upsideEmit: (values: Array<string>, value:string, refForTheCurrentValue:number) => void,
    value: Array<string>,
    textInputStyle?:  TextStyle
    inputTextPlaceHolder?: Array<string>
}

export type OTPprops = OTPBaseProps & Partial<typeof NextTextInput>

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

 export interface MultipleImageProps extends ImageBaseProps {
    value?: Array<ImageType | null>
    maximumNoOfImages?: number
    upsideEmit: (value: Array<ImageType | null>) => void,
  }
  
  export interface AutoCompleteObj {
      id: number | string
      title: string
      value: string
      [key:string]: any
  }

  export interface ErrorMessage {
    message: string, 
    [key:string]: any
  }

  
  export interface AutoCompleteBaseProps { 
    upsideEmit: (val: AutoCompleteObj | null | string, selection: boolean, errorMessage?: ErrorMessage) => void,
    defaultColor?: string,
    value: AutoCompleteObj
    asyncFunction: (val:string) => Promise<AutoCompleteObj[]>,
    textInputStyle: TextStyle,
    loaderRequired?: boolean,
    listTextStyle?: TextStyle
    listViewStyle?:ViewStyle
    debouncingTime?: number
    debouncingEnable?: boolean
  }

  export type AutoCompleteProps = AutoCompleteBaseProps & Partial<TextInput>

  export type DateSupportedFormats = 'DDMMYYYY' | 'MMDDYYYY' | 'YYYYMMDD'

  export interface DateTyperBase {
    dateFormat?:DateSupportedFormats
    textInputStyle?: TextStyle,
    upsideEmit: (values: Array<string>, value:string, refForTheCurrentValue:number) => void,
    value?: string | Array<string>
  }

  export type DateTyperProps = DateTyperBase & Partial<typeof NextTextInput>

 export interface PickerCheckBoxOptions {
    key: string,
    label: string,
    value: boolean
  }

  export interface SignupCheckBoxesProps {
    options: PickerCheckBoxOptions[],
    multipleSelect: boolean, 
    selectedStyle: TextStyle,
    unselectedStyle: TextStyle 
    selectedStyleText: TextStyle, 
    unselectedStyleText: TextStyle,
    defaultColor: string,
    value?: PickerCheckBoxOptions[]
    upsideEmit: (val: PickerCheckBoxOptions[]) => void
  }
  
