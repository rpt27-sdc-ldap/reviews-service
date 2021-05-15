import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import PhoneUserInfo from '../src/Components/phoneUserInfo.js';
import mockSuccessAjax from './mockSuccessAjax';
import successData  from './successData.json';
import renderer from 'react-test-renderer'

// it ('should match snapShot', () => {
//   let review = mockSuccessAjax(successData);
//   review = review.slice(0, 1);
//   const tree = renderer.create(<PhoneUserInfo review={review} />).toJSON();

//   expect(tree).toMatchSnapshot();
// });

it ('should render phoneUserinfo', () => {
  let review = mockSuccessAjax(successData);
  review = review.slice(0, 1);
  const phoneUser = shallow(<PhoneUserInfo review={review} />);
  expect(phoneUser.find('.phoneUserInfo').exists()).toBe(true);
})