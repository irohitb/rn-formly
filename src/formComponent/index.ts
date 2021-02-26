export { default as DateTyper } from './dateTime';
export { default as CheckBoxes } from './checkbox';
export { SingleImageSelector, MultipleImageSelector } from './imagePicker';
export { default as Otp } from './otp';
export { InputText } from './text';
export { default as AutoComplete } from './autoComplete';

interface a {
  name?: string;
  lastName?: string;
}

interface b {
  email?: string;
  phone?: number;
}

const something: a | b = {
  name: 'Célio',
  lastName: 'Garcia',
};

const options: a & b = { ...something };

const { email, phone, name, lastName } = options;
