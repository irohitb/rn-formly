import * as React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions,  Image} from 'react-native'
import {SingleImageProps, MultipleImageProps} from '@src/types'

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
