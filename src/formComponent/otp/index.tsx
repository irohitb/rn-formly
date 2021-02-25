import * as React from 'react';
import NextTextInput from 'react-native-next-input';
import { OTPprops } from '@src/types/formComponents';
import styles from './style';

const Otp = ({
  noOfTextInput,
  upsideEmit,
  value,
  textInputStyle,
  inputTextPlaceHolder,
  ...rest
}: OTPprops) => {
  const onChangeHandler = (
    dateArray: Array<string>,
    currentValue: string,
    refForTheCurrentValue: number
  ) => {
    const stringifyArray = dateArray.join('');
    if (stringifyArray.length === noOfTextInput) {
      upsideEmit(dateArray, currentValue, refForTheCurrentValue);
    }
  };

  const textStyles = {
    ...styles.textInputStyle,
    ...textInputStyle,
  };

  return (
    <>
      <NextTextInput
        onChangeValue={onChangeHandler}
        noOfTextInput={noOfTextInput}
        textInputStyle={textStyles}
        placeholder={inputTextPlaceHolder}
        value={value}
        {...rest}
      />
    </>
  );
};

export default Otp;
