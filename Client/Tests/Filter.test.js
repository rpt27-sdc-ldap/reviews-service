import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import FilterBy from '../src/Components/filterBy.js';
import mockSuccessAjax from './mockSuccessAjax';
import successData  from './successData.json';
import renderer from 'react-test-renderer'

it ('should render filterByDiv', () => {
  const filterByBody = shallow(<FilterBy />);
  expect(filterByBody.find('.filterByDiv').exists()).toBe(true);
})

it ('should register change for sortReviews', () => {
  const sortReviews = jest.fn();
  const filterByBody = shallow(<FilterBy sortReviews={sortReviews} />);
  filterByBody.find('#filterBy').simulate('change');
  expect(sortReviews).toBeCalled();
})

it ('should not register click for sortReviews', () => {
  const sortReviews = jest.fn();
  const filterByBody = shallow(<FilterBy sortReviews={sortReviews} />);
  filterByBody.find('#filterBy').simulate('click');
  expect(sortReviews).toHaveBeenCalledTimes(0);
})