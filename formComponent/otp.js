import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import NextTextInput from 'react-native-next-input'

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

const Otp = (props) => {

  const {
    noOfTextInput,
    upsideEmit,
    value,
    textInputStyle,
    inputTextPlaceHolder
  } = props

  const onChangeHandler = (dateArray, currentValue, refForTheCurrentValue) => {
    const stringifyArray = dateArray.join('')
    if (stringifyArray.length === noOfTextInput) {
      upsideEmit(dateArray)
    }
  }

  return (
   <>
    <NextTextInput
    onChangeValue={onChangeHandler}
    noOfTextInput={noOfTextInput}
    textInputStyle={[styles.textInputStyle, textInputStyle]}
    placeholder={inputTextPlaceHolder}
    value={value}
  />
   </>
  )
}

Otp.propTypes = {
  noOfTextInput: PropTypes.number.isRequired,
  upsideEmit: PropTypes.func.isRequired,
  value: PropTypes.array,
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}


export default Otp
