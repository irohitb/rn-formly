import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {View, Picker, StyleSheet, Dimensions} from 'react-native'


export const PickerAtPosition = (props) => {
  const {options, upsideEmit, value} = props
  const [selectedValue, changeSelectedValue] = useState(value)
  const onValueChange = (itemValue, itemIndex) => {
    changeSelectedValue(itemValue)
    upsideEmit(itemValue)
  }


  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        style={styles.pickerDefault}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue, itemIndex)}>
        {options.map((element, index) => {
          return (
            <Picker.Item  key={index} label={element.label} value={element.value} />
          )
        })}
      </Picker>
    </View>
  )
}

PickerAtPosition.propTypes = {
  options: PropTypes.array.isRequired, 
  upsideEmit: PropTypes.func.isRequired,
  value: PropTypes.string
}



