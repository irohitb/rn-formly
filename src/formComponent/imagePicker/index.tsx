import * as React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {View, Text, TouchableOpacity,  Image} from 'react-native'
import {SingleImageProps, MultipleImageProps} from '@src/types/formComponents'
import styles from './style'

export const SingleImageSelector = ({
  upsideEmit,  
  cropWidth, 
  cropHeight, 
  imageComponentStyle, 
  defaultColor,
  value
}: SingleImageProps) => {
  const selectImage = async () => {
    try {
      const imageDocRecieved = await ImagePicker.openPicker({
          width: cropWidth,
          height: cropHeight,
          cropping: true,
          multiple: false
        })
        if (Array.isArray(imageDocRecieved)) {
          throw new Error("Bug in rn-formly library, Expected single image but recieved multiple Image")
        }
        upsideEmit(imageDocRecieved)  
      } catch (error) {
        throw new Error(error)
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



export const MultipleImageSelector = ({upsideEmit,  
  cropWidth, 
  cropHeight, 
  imageComponentStyle, 
  defaultColor,
  maximumNoOfImages,
  value
  }:MultipleImageProps) => {
  //Filling objects with null array 

  const imageValue = value && Array.isArray(value) ? value :  Array(maximumNoOfImages ? maximumNoOfImages: 9).fill(null)
  const selectImage = async (index:number) => {
    try {
      const imageDocRecieved = await ImagePicker.openPicker({
          width: cropWidth,
          height: cropHeight,
          cropping: true
        })
        const currentImageDoc = [...imageValue]
        currentImageDoc[index] = imageDocRecieved
        upsideEmit(currentImageDoc) 
      } catch (error) {
        throw new Error(error)
      }
    }

  return (
    <View style={styles.mainImageContainer}>
      <View style={styles.multipleImageContainerSubChild}>
        {imageValue.map((el, index) => {
          if (el) {
            return (
            <TouchableOpacity 
            onPress={() => selectImage(index)}
            key={index} 
            style={[styles.multipleImageContainerSingleChild, imageComponentStyle]}>
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
