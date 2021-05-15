import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import Stars from '../src/Components/stars.js';
import mockSuccessAjax from './mockSuccessAjax';
import successData  from './successData.json';
import renderer from 'react-test-renderer';

it ('should render the stars component correctly', () => {
  let review = mockSuccessAjax(successData).slice(0, 1);
  const tree = renderer.create(<Stars review={review}/>).toJSON();

  expect(tree).toMatchSnapshot();
})

it ('shouldRender the number of overallStars', () => {
  let review = mockSuccessAjax(successData).slice(0, 1);
  const starBody = shallow(<Stars review={review} />);

  expect(starBody.find('.overallStars').exists()).toBe(true);
})

it ('should not render if double data is passed in', () => {
  let review = {overalstars: 5, storyStars: 4, performanceStars: 5};
  const starBody = shallow(<Stars review={review} />);

  expect(starBody.find('.overallStars')).toMatchSnapshot();
})