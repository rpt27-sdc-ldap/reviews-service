import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import App from '../src/Components/App.js';


it ('should initialize App with an empty array of reviews', async () => {
  // let mockGetter = jest.fn();
  // App.prototype.reviewGetter = mockGetter;
  let app = mount(<App />);
  let reviewArray = app.state('reviews');
  expect(reviewArray).toStrictEqual([]);
})

it ('should render revierShell if reviewGetter returns null', async () => {
  let mockGetter = jest.fn(() => {return 'error'});
  App.prototype.reviewGetter = mockGetter;
  let app = shallow(<App />)
  let wait = await mockGetter();
  expect(app.exists('.reviewsShell').toEqual(true));
})

it ('should have a filters class with 2 children', async () => {
  let app = shallow(<App />);
  expect(app.find('.filters').children()).toHaveLength(2);
})

it('should have a shallow wrapper instance not equal to null', () => {
  const app = shallow(<App />);
  const instance = app.instance();
  expect(instance).toBeInstanceOf(App);
});


it ('should call setCanadaClass', () => {
  App.prototype.setCanadaClass = jest.fn(() => {return 'canada'});
  const spy = jest.spyOn(App.prototype, "setCanadaClass");
  const app = shallow(<App />);
  app.instance().setCanadaClass();
  expect(spy).toHaveBeenCalled();
})



