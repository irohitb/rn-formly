// This is main formly array
import { TextStyle, TextInput, ViewStyle, ImageStyle } from 'react-native';
import { NextInputProps } from 'react-native-next-input/lib';
import {
  DateSupportedFormats,
  PickerCheckBoxOptions,
  AutoCompleteObj,
} from '@src/types/formComponents/index';
import { Image as ImageType } from 'react-native-image-crop-picker';

export interface BaseProps {
  key: string;
  label: string;
  required?: boolean;
  helper?: string;
  validator?: (
    index: number,
    key: string,
    currentData: any,
    payload: { [key: string]: any }
  ) => void;
  buttonText?: string;
}

export interface Text extends BaseProps {
  type: 'text';
  defaultValue?: string;
  templateOptions: {
    componentProps?: Partial<TextInput>;
    templateStyle?: TextStyle;
  };
}

export interface Otp extends BaseProps {
  type: 'otp';
  defaultValue?: Array<string>;
  templateOptions: {
    noOfTextInput: number;
    textInputStyle?: TextStyle;
    componentProps?: Partial<NextInputProps>;
  };
}

export interface DateTyper extends BaseProps {
  type: 'dateTyper';
  defaultValue?: Array<string> | string;
  templateOptions: {
    dateFormat: DateSupportedFormats;
    componentProps?: Partial<NextInputProps>;
  };
}

export interface CheckBox extends BaseProps {
  type: 'checkboxes';
  defaultValue?: PickerCheckBoxOptions[];
  templateOptions: {
    multipleSelect?: boolean;
    options?: PickerCheckBoxOptions[];
    selectedStyle?: ViewStyle;
    unselectedStyle?: ViewStyle;
    selectedStyleText?: TextStyle;
    unselectedStyleText?: TextStyle;
  };
}

//TODO: Change naming of auto-complete
export interface AutoComplete extends BaseProps {
  type: 'autoComplete';
  defaultValue?: AutoCompleteObj;
  templateOptions: {
    textInputStyle?: TextStyle;
    loaderRequired?: boolean;
    listTextStyle?: TextStyle;
    listViewStyle?: ViewStyle;
    debouncingTime?: number;
    debouncingEnable?: boolean;
    componentProps?: Partial<NextInputProps>;
  };
}

export interface ImagePickerTemplate {
  cropHeight?: number;
  cropWidth?: number;
  imageComponentStyle?: ImageStyle;
}

export interface ImagePickerMultipleImageTemplate extends ImagePickerTemplate {
  maximumNoOfImages?: number;
}

export interface SingleImagePicker extends BaseProps {
  type: 'image';
  defaultValue?: ImageType;
  templateOptions: ImagePickerTemplate;
}

export interface MultipleImagePicker extends BaseProps {
  type: 'images';
  defaultValue?: Array<ImageType>;
  templateOptions: ImagePickerMultipleImageTemplate;
}
