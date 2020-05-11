import React from 'react'
import {SingleImageSelector} from './../formComponent/image-picker'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });


describe('Check if image component renders', () => {
    test('image component renders', () => {
        const props = {
            upsideEmit: () => {},
        }
      const wrapper = shallow(<SingleImageSelector {...props}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });