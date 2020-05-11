import React from "react";
import { render } from "react-native-testing-library";
import Otp from  "../formComponent/otp";
import {
    StyleSheet,
    Dimensions
} from 'react-native'

const styles = StyleSheet.create({
    nextInputStyle: {
        textAlign: 'center', 
        marginLeft: 5, 
        marginRight: 5, 
        fontSize: 20,
        borderBottomWidth: 1,
        marginTop: 50
    }
})

describe('render otp component correct', () => {
 it('should render text like otp', () => {
    const props = {
        noOfTextInput:4,
        upsideEmit:() => {},
        value:[1,2,3,4],
        textInputStyle: [{width: (Dimensions.get('window').width * 0.6)/8 }, styles.nextInputStyle]
    }
    const component = render(<Otp {...props} />)
    // if component is getting rendered
    expect(component.toJSON()).toMatchSnapshot();
    // this checks if display value is there
    expect(component.getByDisplayValue("1")).toBeDefined();
    expect(component.getByDisplayValue("2")).toBeDefined();
    expect(component.getByDisplayValue("3")).toBeDefined();
    expect(component.getByDisplayValue("4")).toBeDefined();
 })
})
