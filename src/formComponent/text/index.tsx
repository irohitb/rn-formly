import * as React from 'react' 
import {TextInput} from 'react-native'
import {TextInputProps} from '@src/types'
import styles from './style'


export const InputText = ({
  value,
  textInputStyle,
  defaultColor,
  upsideEmit,
  ...rest
}: TextInputProps) => {  

  const onChangeHandler = (text:string) => {
    upsideEmit(text)
    return 
  }
  return (
    <>
      <TextInput  
      style={[{color: defaultColor, borderColor: defaultColor}, styles.defaultTextInputStyle, textInputStyle]}
      onChangeText={text => onChangeHandler(text)}
      value={value}
      {...rest}
      />
    </>
  )
}








