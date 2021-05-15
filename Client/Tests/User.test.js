import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import User from '../src/Components/user.js';
import mockSuccessAjax from './mockSuccessAjax';
import successData  from './successData.json';
import renderer from 'react-test-renderer';

it ('should render nameAndDate if date is missing', () =>{
  const data = mockSuccessAjax(successData);
  let review = data.slice(0, 1);
  review = review[0];
  let realDate = review.date;
  review.date = undefined;
  const userBody = shallow(<User review={review} />);
  expect(userBody.find('.nameAndDate').exists()).toBe(true);
  review.date = realDate;
})

it ('should render name and date if date exists', () => {
  const data = mockSuccessAjax(successData);
  let review = data.slice(0, 1);
  review = review[0];
  const userBody = shallow(<User review={review} />);
  expect(userBody.find('.nameAndDate').exists()).toBe(true);
})

// it ('should match snapshot', () => {
//   const data = mockSuccessAjax(successData);
//   let review = data.slice(0, 1);
//   review = review[0];
//   const tree = renderer.create(<User review={review}/>).toJSON();
//   expect(tree).toMatchSnapshot();
// })