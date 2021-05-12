import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import App from '../src/Components/App.js';


it ('should initialize App with an empty array of reviews', async () => {
  let mockGetter = jest.fn();
  App.prototype.reviewGetter = mockGetter;
  let app = mount(<App />);
  let reviewArray = app.state('reviews').toString();
  expect(reviewArray).toEqual('[]');
})