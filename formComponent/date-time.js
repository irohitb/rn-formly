import React, {useState} from 'react' 
import PropTypes from 'prop-types'
import {View, TextInput, Text, StyleSheet} from 'react-native'
import NextTextInput from 'react-native-next-input'


const ERROR_DEFAULT_MESSAGE = 'Invalid Date, Please check the entered date again'

const styles = StyleSheet.create({
  textInputStyle: {
    textAlign: 'center', 
    marginLeft: 5, 
    marginRight: 5, 
    fontSize: 16,
    borderBottomWidth: 1,
    color: 'black'
  },
  nextInputStyle: {
    textAlign: 'center', 
    marginLeft: 5, 
    marginRight: 5, 
    fontSize: 20,
    borderBottomWidth: 1,
    marginTop: 50
  }
})


// Used for Date 
const dateFormatter = {
  DDMMYYYY: (input) => {
   const date = new Date(input.replace(/(\d{2})(\d{2})(\d{4})/, "$2-$1-$3"))
   if (date instanceof Date && !isNaN(date)) return date
   else throw new Error()
  }, 
  MMDDYYYY: (input) => {
    const date = new Date(input.replace(/(\d{2})(\d{2})(\d{4})/, "$1-$2-$3"))
    if (date instanceof Date && !isNaN(date)) return date
    else throw new Error()
  }, 
  YYYYMMDD: (input) => {
    const date = new Date(input.replace(/(\d{4})(\d{2})(\d{2})/, "$3-$2-$1"))
    if (date instanceof Date && !isNaN(date)) return date
    else throw new Error()
  }
}

function formatDate(date, formateType) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return reverseDateFormatter[formateType](year, month, day)
}

const reverseDateFormatter = {
  DDMMYYYY: (year, month, day) => {
    return [day, month, year].join('').split('')
  },
  MMDDYYYY: (year, month, day) => {
    return [month, day, year].join('').split('')
  }, 
  YYYYMMDD: (year, month, day) => {
    return [year, month, day].join('').split('')
  }
}


const DateTyper = (props) => {
  const {dateFormat, textInputStyle, upsideEmit} = props
  let {value} = props
  if (value) {
    try {
    value = formatDate(value, dateFormat)
    } catch(error) {
      console.error(error)
      value=null
    }
  } else {
    value = null
  }
  // Creating placeholder for our Next Input component
  const inputTextPlaceHolder = dateFormat.split('')
  // On change Value 
  const onChangeHandler = (dateArray, currentValue, refForTheCurrentValue) => {
    // Would filter out value 
    const filterArray = dateArray.filter(value => value)
    try {
      if (filterArray.length === 8) {
          //update in state
          const dateString = dateArray.join('')
          const date = dateFormatter[dateFormat](dateString)
          upsideEmit(date)
      }
    } catch (error) {
      upsideEmit(null, ERROR_DEFAULT_MESSAGE)
    }
  }  

  return (
    <> 
      <NextTextInput
        inputErrorMarker='red'
        onChangeValue={onChangeHandler}
        noOfTextInput={8}
        textInputStyle={[styles.textInputStyle, textInputStyle]}
        placeholder={inputTextPlaceHolder}
        value={value}
      />
    </>
  )
}

DateTyper.propTypes = {
  dateFormat: PropTypes.string,
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  upsideEmit: PropTypes.func.isRequired,
  value: PropTypes.string
}

DateTyper.defaultProps = {
  dateFormat: 'DDMMYYYY'
}

export default DateTyper

//Formats 