import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import ReviewBody from '../src/Components/reviewBody.js';
import mockSuccessAjax from './mockSuccessAjax';
import successData  from './successData.json';

it ('should not render Review body if it receives an empty array', () => {
  let reviews = [];
  let reviewBody = shallow(<ReviewBody className="hiddenReview" reviews={reviews} />);
  let columnsContainer = reviewBody.find('.columnsContainers');
  expect(columnsContainer.exists()).toBe(false);
})

it ('should render Review body if it receives an array of reviews', () => {
  let reviews = mockSuccessAjax(successData);
  let reviewBody = shallow(<ReviewBody className="hiddenReview" reviews={reviews} />);
  let columnsContainer = reviewBody.find('.columnsContainers');
  expect(columnsContainer.exists()).toBe(true);
})

it('should have reviewbody class of hiddenReview if hidden review is passed as prop', () => {
  let reviews = mockSuccessAjax(successData);
  let reviewBody = shallow(<ReviewBody className="hiddenReview" reviews={reviews} reviewBodyClass={'hiddenReview'} />);
  let reviewBodyClassDiv = reviewBody.find('.hiddenReview');
  expect(reviewBodyClassDiv.exists()).toBe(true);
})

it ('should Call read more function if user clicks the readmore button', () => {
  let reviews = mockSuccessAjax(successData);
  reviews = reviews.slice(0, 1);
  let readMoreFunc = jest.fn();
  let reviewBody = shallow(<ReviewBody className="hiddenReview" reviews={reviews} reviewBodyClass={'hiddenReview'} readMoreDisplay={'readMore'} readMore={readMoreFunc}/>);
  reviewBody.find('.readMore').simulate('click');
  expect(readMoreFunc.mock.calls.length).toEqual(1);
})

it ('should not call readmore function if user clicks the hideme button', () => {
  let reviews = mockSuccessAjax(successData);
  reviews = reviews.slice(0, 1);
  let readMoreFunc = jest.fn();
  let hideMeFunc = jest.fn();
  let reviewBody = shallow(<ReviewBody className="hiddenReview" reviews={reviews} reviewBodyClass={'hiddenReview'} hideMeDisplay={'hideMe'} readMore={readMoreFunc} hideMe={hideMeFunc}/>);
  reviewBody.find('.hideMe').simulate('click');
  expect(readMoreFunc.mock.calls.length).toEqual(0);
})