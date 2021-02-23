import * as React from 'react' 
import {TextInput, StyleSheet, Dimensions} from 'react-native'
import {TextInputProps} from '@src/types'

const styles = StyleSheet.create({
  defaultTextInputStyle: {
    marginTop: 50,
    padding: 5,
    justifyContent: 'center',
    borderBottomWidth: 1, 
    width: Dimensions.get('window').width * 0.8,
    fontSize: 24
  }
})

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








