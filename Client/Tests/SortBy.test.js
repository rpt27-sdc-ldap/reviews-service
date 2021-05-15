import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import SortBy from '../src/Components/sortBy.js';
import mockSuccessAjax from './mockSuccessAjax';
import successData  from './successData.json';
import renderer from 'react-test-renderer'

it ('should call sortReviews function', () => {
  const sortReviews = jest.fn();
  const sort = shallow(<SortBy sortReviews={sortReviews} />);
  sort.find('#sortBy').simulate('change');
  expect(sortReviews).toHaveBeenCalled();
})

it ('should render options ', () => {
  const wrapper = shallow(<SortBy />);
  expect(wrapper.find('#sortBy').children()).toHaveLength(2);
})