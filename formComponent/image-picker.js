import React, { useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native'
import PropTypes from 'prop-types'


const styles = StyleSheet.create({
  mainImageContainer: {
    width: Dimensions.get('window').width * 0.8,
    maxWidth:  Dimensions.get('window').width * 0.8,
    marginTop: 20,
    display: 'flex', 
    alignItems: 'center'
  },
  // Single Image Styling
  imageView: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: '#F5F5F5'
  }, 
  circleView: {
    borderRadius: Math.round((Dimensions.get('window').width*0.6) + (Dimensions.get('window').height*0.3)) / 2,
    display: 'flex',
    alignItems: 'flex-end', 
    justifyContent: 'flex-end'
  }, 
  TextPlusSign: {
    fontSize: 72
  }, 
  multipleImageContainerSubChild: {
    display: 'flex', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  multipleImageContainerSingleChild: {
    width: 85,
    height: 100,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'flex-end', 
    justifyContent: 'flex-end'
  },
  multipleImagePlus: {
    fontSize: 32,
  }
  // Multiple Images Styling 
})

export const SingleImageSelector = (props) => {
  const {
    upsideEmit,  
    cropWidth, 
    cropHeight, 
    imageComponentStyle, 
    containerShape, 
    defaultColor,
  } = props
  
  const objectCheck = Object.keys(props.value)
  const value = objectCheck && objectCheck.length > 0 ? props.value : null
  const selectImage = async () => {
    try {
      const imageDocRecieved = await ImagePicker.openPicker({
          width: cropWidth,
          height: cropHeight,
          cropping: true
        })
        upsideEmit(imageDocRecieved)  
      } catch (error) {
      }
  }

  if (!value) {
    return (
      <View style={styles.mainImageContainer}>
        <TouchableOpacity onPress={selectImage}
        style={[styles.imageView, styles.circleView, imageComponentStyle]}> 
          <Text style={[styles.TextPlusSign, {color: defaultColor}]}> + </Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.mainImageContainer}>
      <TouchableOpacity onPress={selectImage}
      style={[styles.imageView, styles.circleView, imageComponentStyle]}> 
      <Image source={{uri: value.path}} style={[styles.imageView, styles.circleView, imageComponentStyle]} />
      </TouchableOpacity>
      </View>
    )
  }
}


SingleImageSelector.propTypes = {
  upsideEmit: PropTypes.func.isRequired,
  cropHeight: PropTypes.number,
  cropWidth: PropTypes.number, 
  imageComponentStyle: PropTypes.object, 
  defaultColor: PropTypes.string, 
  value: PropTypes.object
}


export const MultipleImageSelector = (props) => {
  //Filling objects with null array 
  const {
    upsideEmit,  
    cropWidth, 
    cropHeight, 
    imageComponentStyle, 
    containerShape, 
    defaultColor,
    maximumNoOfImages
  } = props

  const value = props.value && Array.isArray(props.value) ? props.value :  Array(maximumNoOfImages ? maximumNoOfImages: 9).fill(null)
  const selectImage = async (index) => {
    try {
      const imageDocRecieved = await ImagePicker.openPicker({
          width: cropWidth,
          height: cropHeight,
          cropping: true
        })
        const currentImageDoc = [...value]
        currentImageDoc[index] = imageDocRecieved
        upsideEmit(currentImageDoc) 
      } catch (error) {
        console.warn(error)
      }
    }

  return (
    <View style={styles.mainImageContainer}>
      <View style={styles.multipleImageContainerSubChild}>
        {value.map((el, index) => {
          if (el) {
            return (
            <TouchableOpacity 
            onPress={() => selectImage(index)}
            key={index} 
            style={[styles.multipleImageContainerSingleChildImage, imageComponentStyle]}>
              <Image source={{uri: el.path}} style={[styles.multipleImageContainerSingleChild, imageComponentStyle]} />
            </TouchableOpacity>
            )
          } else {
            return (
              <TouchableOpacity 
                onPress={() => selectImage(index)}
                key={index} 
                style={[styles.multipleImageContainerSingleChild, imageComponentStyle]}>
              <Text style={[styles.multipleImagePlus, {color:defaultColor}]}>+</Text>
              </TouchableOpacity>
            )
          }
        })}
      </View>
    </View>
  )
}


MultipleImageSelector.propTypes = {
  upsideEmit: PropTypes.func.isRequired,
  cropHeight: PropTypes.number,
  cropWidth: PropTypes.number, 
  imageComponentStyle: PropTypes.object, 
  defaultColor: PropTypes.string, 
  value: PropTypes.array,
  maximumNoOfImages: PropTypes.number
}


