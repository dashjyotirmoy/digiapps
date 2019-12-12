import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DashboardController from "./DashboardController";
import DefinitionLoader from '../../libs/ProductDefinationBar/DefinitionLoader.js";';
configure({ adapter: new Adapter() });
describe("<DashboardController/>", () => {
  it("should render all the components from config.json", () => {
    jest.mock(DashboardController);
    // const wrapper = shallow(<DashboardController />);
    // expect(wrapper.find(DefinitionLoader)).toHaveLength(1);
  });
});
