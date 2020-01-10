import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import {ColorCalculator} from './../../utils/index'

// TODO: Checkbox scroll View implementation 
const styles = StyleSheet.create({
  boxStyle: {
    marginTop: 50,
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.8,
    borderWidth: 1, 
    padding: 5, 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    height: 50
  }, 
  boxText: {
    fontSize: 20
  }, 
  selectedStyle: {
    backgroundColor: 'black',
    borderColor: 'white'
  }, 
  selectedStyleText: {
    color: 'white'
  }, 
  unselectedStyle: {
    borderColor: '#9E9E9E'
  },
  unselectedStyleText: {
    color: '#9E9E9E'
  }
})


const signupCheckBoxes = (props) => {
  const { options, multipleSelect} = props
  const {selectedStyleText, unselectedStyleText, selectedStyle, unselectedStyle, upsideEmit, defaultColor} = props
  let colorIntensityView, colorIntensityText

  if (defaultColor) {
    const initColorCalculator = new ColorCalculator(defaultColor)
    const colorIntensity = initColorCalculator.determineColorIntensity
    colorIntensityView = {backgroundColor: defaultColor}
    if (colorIntensity === 'light') {
      colorIntensityText = {color:'#37474F'}
    } else if (colorIntensity === 'dark') {
      colorIntensityText = {color: 'FAFAFA'}
    }
  }


  const fixedOptions = options.map(element => {
      if (!element.hasOwnProperty('value')) element.value = false 
      return element
    })

  const [state, setState] = useState(fixedOptions)

  

  const toggleState = (index) => {
    let copyState = [...state]
    const previousState = copyState[index]['value']
    if (multipleSelect) {
      // Setting all other values as false, since the array for checkbox won't in normal scenario be big, we can just itterate and set it to false
      copyState = copyState.map(element => {
        element.value = false
        return element
      })
    } 
    copyState[index]['value'] = !previousState 
    setState(copyState)
    upsideEmit(copyState)
  }


  return (
    <View>
    {state.map((option, index) => {
      if (!option.value) {
      return (
            <TouchableOpacity 
            style={[styles.boxStyle, styles.unselectedStyle, unselectedStyle]}
            onPress={() => toggleState(index)}
            key={index}>
              <Text style={[styles.boxText, styles.unselectedStyleText, unselectedStyleText]}>{option.label}</Text>
            </TouchableOpacity>
        )
      } else if (option.value) {
        return (
            <TouchableOpacity style={[styles.boxStyle, styles.selectedStyle, colorIntensityView,  selectedStyle]}
            onPress={() => toggleState(index)}
            key={index}>
              <Text style={[styles.boxText, styles.selectedStyleText, colorIntensityText,  selectedStyleText]}>{option.label}</Text>
            </TouchableOpacity>
        )
      }
    })}
    </View>
  )
}

signupCheckBoxes.propTypes = {
  options: PropTypes.array.isRequired,
  multipleSelect: PropTypes.bool, 
  selectedStyle: PropTypes.object,
  unselectedStyle: PropTypes.object, 
  selectedStyleText: PropTypes.object, 
  unselectedStyleText: PropTypes.object, 
  defaultColor: PropTypes.string,
  upsideEmit: PropTypes.func.isRequired
}

signupCheckBoxes.defaultProps = {
  multipleSelect: false
}



export default signupCheckBoxes