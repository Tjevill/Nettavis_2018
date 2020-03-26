import * as React from "react";
import { Component } from "react-simplified";
import { shallow, mount } from "enzyme";
// Component imports
import { ConvertTime } from "./widgets.js";

describe("Tester ConvertTime", () => {
  it("Burde returnere pent formartert tidsfrimerke: ", () => {
    const timestamp = String("2018-11-18 20:27:46");
    let wrapper = shallow(<ConvertTime datetime="2018-11-17T20:34:51.000Z" />);
    let instance: ?ConvertTime = ConvertTime.instance();
    expect(typeof instance).toEqual("object");
    expect(wrapper.props().children[2]).toEqual(
      "17. november, 2018, kl. 20:34"
    );
  });
});
