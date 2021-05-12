import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import App from '../src/Components/App.js';


it ('should initialize App with an empty array of reviews', async () => {
  let mockGetter = jest.fn();
  App.prototype.reviewGetter = mockGetter;
  let app = mount(<App />);
  let reviewArray = app.state('reviews');
  expect(reviewArray).toStrictEqual([]);
})

it ('should have a filters class with 2 children', async () => {
  let mockGetter = jest.fn();
  App.prototype.reviewGetter = mockGetter;
  let app = mount(<App />);
  expect(app.find('.filters').children()).toHaveLength(2);
})

test('shallow wrapper instance should not be null', () => {
  const app = shallow(<App />);
  const instance = app.instance();
  expect(instance).toBeInstanceOf(App);
});

