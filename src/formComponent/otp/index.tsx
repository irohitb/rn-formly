import * as React from 'react'
import {StyleSheet, TextStyle} from 'react-native'
import NextTextInput from 'react-native-next-input'
import {OTPprops} from '@src/types'

const styles = StyleSheet.create({
  textInputStyle: {
    textAlign: 'center', 
    marginLeft: 5, 
    marginRight: 5, 
    fontSize: 16,
    borderBottomWidth: 1,
    color: 'black'
  }
})

interface Props  {
  noOfTextInput: number
  upsideEmit: (values: Array<string>, value:string, refForTheCurrentValue:number) => void,
  value: Array<string>,
  textInputStyle?:  TextStyle
  inputTextPlaceHolder?: Array<string>
}

const Otp = ({
  noOfTextInput,
  upsideEmit,
  value,
  textInputStyle,
  inputTextPlaceHolder
}:Props) => {

  const onChangeHandler = (dateArray:Array<string>, currentValue:string, refForTheCurrentValue:number) => {
    const stringifyArray = dateArray.join('')
    if (stringifyArray.length === noOfTextInput) {
      upsideEmit(dateArray, currentValue, refForTheCurrentValue)
    }
  }

  const textStyles = {
    ...styles.textInputStyle
    ...textInputStyle, 

  }

  return (
   <>
    <NextTextInput
    onChangeValue={onChangeHandler}
    noOfTextInput={noOfTextInput}
    textInputStyle={textStyles}
    placeholder={inputTextPlaceHolder}
    value={value}
  />
   </>
  )
}

export default Otp
