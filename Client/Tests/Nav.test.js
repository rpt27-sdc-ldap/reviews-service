import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import Nav from '../src/Components/nav.js';
import mockSuccessAjax from './mockSuccessAjax';
import successData  from './successData.json';
import renderer from 'react-test-renderer'

it ('should match snapshot', () => {
  const state  = {reviews: [], carouselReviews: [], itemsToShow: 10, Audible: 'Audible', Canada: 'Canada', reviewBodyClass: 'defaultReview', readMoreDisplay: 'readMore', hideMeDisplay: 'hideHideMeButton'};

  const tree = renderer.create(<Nav state={state}/>).toJSON();
  expect(tree).toMatchSnapshot();
})

it ('should render audible class correctly', () => {
  const state  = {reviews: [], carouselReviews: [], itemsToShow: 10, Audible: 'Audible', Canada: 'Canada', reviewBodyClass: 'defaultReview', readMoreDisplay: 'readMore', hideMeDisplay: 'hideHideMeButton'};

  const navBody = shallow(<Nav state={state} />);
  expect((navBody.find('.Audible')).exists()).toBe(true);
})