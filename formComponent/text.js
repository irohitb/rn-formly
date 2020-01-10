import React, {useState, useEffect} from 'react' 
import PropTypes from 'prop-types'
import {TextInput, StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
  defaultTextInputStyle: {
    width: 'auto',
    marginTop: 50,
    padding: 5,
    justifyContent: 'center',
    borderBottomWidth: 1, 
    width: Dimensions.get('window').width * 0.8,
    fontSize: 24
  }
})

export const InputText = (props) => {  
  const {
    value,
    textInputStyle,
    defaultColor,
    upsideEmit,
    ...rest
  } = props
  
  const onChangeHandler = (text) => {
    upsideEmit(text)
    return 
  }
  return (
    <>
      <TextInput  
      {...rest}
      style={[{color: defaultColor, borderColor: defaultColor}, styles.defaultTextInputStyle, textInputStyle]}
      onChangeText={text => onChangeHandler(text)}
      value={value}
      />
    </>
  )
}

InputText.propTypes = {
  value:  PropTypes.string, 
  upsideEmit: PropTypes.func.isRequired,
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultColor: PropTypes.string
}







