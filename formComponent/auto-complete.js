import React, {useRef, useState} from 'react'
import {
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'


const DEFAULT_ERROR_MESSAGE = 'Error While Loading the data'

const styles = StyleSheet.create({
  defaultTextInputStyle: {
    width: 'auto',
    marginTop: 50,
    padding: 5,
    justifyContent: 'center',
    borderBottomWidth: 1, 
    width: Dimensions.get('window').width * 0.8,
    fontSize: 24,
    marginBottom: 20
  }, 
  modelOpenViewMain: {
    zIndex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'rgba(0,0,0,0.7)',
    flex: 1,
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  modelOpenViewSub: {
    backgroundColor:'rgba(255,255,255, 0.9)',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    height: Dimensions.get('window').height*0.4,
    width: Dimensions.get('window').width * 0.9,
    paddingBottom: 10,
    marginTop: Dimensions.get('window').height * 0.1
  }, 
  flatlistIndividualComponent: {
    height: 30, 
    marginTop: 20,
    paddingRight: 10
  }, 
  flatListIndividualComponentText: {
    fontSize: 21
  }, 
  loadingView: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '50%'
  }
})

const AutoComplete = (props) => {
    const {
    upsideEmit,
    defaultColor,
    value,
    asyncFunction,
    textInputStyle,
    loaderRequired,
    listTextStyle,
    listViewStyle,
    ...rest
  } = props
  let parentViewRef = null
  const [layoutProperties, setLayoutProperties] = useState(null)
  const [modalOpen, setModelOpen] = useState(false)
  const [suggestions, setSuggestion] = useState([])
  const [loading, setLoadingStatus] = useState(false)

  
  const onFocus = async (text) => {
    if (parentViewRef.measure && !layoutProperties) {
      parentViewRef.measure( (fx, fy, width, height, px, py) => {
        setLayoutProperties({
          width: width, 
          height: height, 
          offsetX: px,
          offsetY: py
        })
      })
    }
    //To check if values have data or not
    const valueArr = Object.values(value)
    if (valueArr.length > 0 && value.title)  {
      const suggestions = await asyncFunction(value.title)
      setSuggestion(suggestions)
    }
  }

  const onchangeHandler = async (text) => {
    try {
    if (loaderRequired) setLoadingStatus(true)
    if(layoutProperties && !modalOpen) setModelOpen(true)
    const emitObj = {
      title: text
    }
    const suggestions = await asyncFunction(text)
    setSuggestion(suggestions)
    upsideEmit(emitObj)
    } catch (error) {
      if(modalOpen) setModelOpen(false)
      if (error.message)  upsideEmit(null, error.message)
      else upsideEmit(null, DEFAULT_ERROR_MESSAGE)
    }
    if (loaderRequired) setLoadingStatus(false)
  }

  const onSelection = (selectedObj) => {
    if(modalOpen) setModelOpen(false)
    const emitObj = {
      title: selectedObj.title, 
      value: selectedObj.value, 
      id: selectedObj.id
    }
    upsideEmit(selectedObj)
  }

  if (!modalOpen) {
      return (
        <View>
            <TextInput
            {...rest}
            ref={component => parentViewRef = component}
            style={[{color: defaultColor, borderColor: defaultColor}, styles.defaultTextInputStyle, textInputStyle]}
            onChangeText={(text) => onchangeHandler(text)}
            onFocus={onFocus}
            value={value.title}
          />
        </View>
      )
  } else {
    return (
      <View style={[styles.modelOpenViewMain, {marginTop: -layoutProperties.offsetY + 83.5}]}>
       <View needsOffscreenAlphaCompositing style={styles.modelOpenViewSub}>
        <TextInput
          {...rest}
          ref={component => parentViewRef = component}
          style={[{color: defaultColor, borderColor: defaultColor}, styles.defaultTextInputStyle, textInputStyle]}
          onChangeText={(text) => onchangeHandler(text)}
          onFocus={onFocus}
          value={value.title}
          autoFocus={true}
          />
          { loading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color={defaultColor} />
            </View>
           ): (
            <FlatList 
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelection(item)} style={[styles.flatlistIndividualComponent, listViewStyle]}>
                <Text style={[styles.flatListIndividualComponentText, listTextStyle]}> {item.title}</Text>
            </TouchableOpacity>
            )} 
            keyExtractor={(item) => item.id.toString()}/>
           )
            }
          </View>
        </View>
    )
  }
}

AutoComplete.propTypes = {
  upsideEmit: PropTypes.func.isRequired,
  defaultColor: PropTypes.string,
  value: PropTypes.object,
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  asyncFunction: PropTypes.func.isRequired,
  loaderRequired: PropTypes.bool, 
  listTextStyle: PropTypes.object, 
  listViewStyle: PropTypes.object
}

export default AutoComplete