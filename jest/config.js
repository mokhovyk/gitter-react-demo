require("babel-polyfill");
import 'raf/polyfill';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.mount = mount;
global.toJson = toJson;

global.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});
