import React from "react";
import { render } from "react-native-testing-library";

import { InputText } from "../formComponent/text";

describe("render app components", () => {
  it("should render text", () => {
    const props = {
      upsideEmit: () => {},
      textInputStyle: [],
      value: "Hello World",
    };
    const component = render(<InputText {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
    expect(component.getByDisplayValue("Hello World")).toBeDefined();
  });
});
