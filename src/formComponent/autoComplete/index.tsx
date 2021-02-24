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
import {AutoCompleteProps, AutoCompleteObj} from '@src/types'


const DEFAULT_ERROR_MESSAGE = 'Error While Loading the data'

const styles = StyleSheet.create({
  defaultTextInputStyle: {
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

interface layoutProperties {
  width: number,
  height: number, 
  offsetX: number,
  offsetY: number
}
interface IState {
  layoutProperties: layoutProperties | null, 
  modalOpen: boolean, 
  loading: boolean,
  suggestions: AutoCompleteObj[],

}

const AutoComplete = ({
  upsideEmit,
  defaultColor,
  value,
  asyncFunction,
  textInputStyle,
  loaderRequired,
  listTextStyle,
  listViewStyle,
  debouncingTime=500, 
  debouncingEnable=true,
  ...rest
}: AutoCompleteProps) => {
  let parentViewRef = React.useRef(null)
  const [state, setState] = useState<IState>({
    layoutProperties: null, 
    modalOpen: false, 
    loading: false,
    suggestions: []
  })
  
  const onFocus = async () => {
    const {layoutProperties} = state
    let copyState = {...state}
      if (parentViewRef.measure && !layoutProperties) {
        parentViewRef.measure( (fx:number, fy:number, width:number, height:number, px:number, py:number) => {
          copyState.layoutProperties = {
            width: width, 
            height: height, 
            offsetX: px,
            offsetY: py
          }
      })
    }
    //To check if values have data or not (we get from props)
    //Set that as first suggestion
    const valueArr = Object.values(value)
    if (valueArr.length > 0 && value.title)  {
      const suggestions = await asyncFunction(value.title)
      copyState.suggestions = [...suggestions]
    }
    setState(copyState)
  }

  const onchangeHandler = async (text:string) => {
    const {layoutProperties, modalOpen} = state
    const copyState = {...state}
    if (loaderRequired) {
      copyState.loading = true
    }
    if(layoutProperties && !modalOpen) {
      copyState.modalOpen = true
    }
    try {
    setState(copyState)
    const suggestions = await asyncFunction(text)
    copyState.suggestions = [...suggestions]
    } 
    catch (error) {
      if(modalOpen) {
        copyState.modalOpen = false
      }
      if (!error.message)  {
        error.message = DEFAULT_ERROR_MESSAGE
      }
      upsideEmit(null, false, error)
    }
    if (loaderRequired) {
      copyState.loading = false
    }
    setState(copyState)
  }

  const onSelection = (selectedObj:AutoCompleteObj) => {
    const {modalOpen, loading} = state
    const copysState = {...state}
    // If loading or modal open is is true, set to false
    copysState.loading = !loading || false
    copysState.modalOpen = !modalOpen || false
    upsideEmit(selectedObj, true)
  }

  if (!state.modalOpen) {
      return (
        <View>
            <TextInput
            {...rest}
            ref={component => {parentViewRef = component}}
            style={[{color: defaultColor, borderColor: defaultColor}, styles.defaultTextInputStyle, textInputStyle]}
            onChangeText={(text) => onchangeHandler(text)}
            onFocus={onFocus}
            value={value.title}
          />
        </View>
      )
  } else {
    return (
      <View style={[styles.modelOpenViewMain, {marginTop:state.layoutProperties ? -state.layoutProperties.offsetY + 83.5 : 0 }]}>
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
          { state.loading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color={defaultColor} />
            </View>
           ): (
            <FlatList 
            data={state.suggestions}
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
export default AutoComplete