import * as React from 'react'
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import {determineColorIntensity} from '@src/utils/colors'
import {SignupCheckBoxesProps} from '@src/types/index'
import styles from './style'
 

interface Color {
  color?: string
  backgroundColor?: string
}

const signupCheckBoxes = ({
  selectedStyleText, 
  unselectedStyleText, 
  selectedStyle, 
  unselectedStyle, 
  upsideEmit, 
  defaultColor,
  options,
  multipleSelect=false
}:SignupCheckBoxesProps) => {

  let colorIntensityView:Color, colorIntensityText:Color
  if (defaultColor) {
    const colorIntensity = determineColorIntensity(defaultColor)
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

  const [state, setState] = React.useState(fixedOptions)
  const componentDidMount = React.useRef(false)
  
  React.useEffect(() => {
    if (!componentDidMount.current) {
      componentDidMount.current = true
    } else {
      upsideEmit(state)
    }
  }, [state])

  const toggleState = (index:number) => {
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


export default signupCheckBoxes