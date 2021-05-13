import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import "@babel/polyfill";
import App from '../src/Components/App.js';
import mockSuccessAjax from './mockSuccessAjax';
import successData  from './successData.json';
import renderer from 'react-test-renderer'


it ('should initialize App with an empty array of reviews', async () => {
  let mockGetter = jest.fn();
  App.prototype.reviewGetter = mockGetter;
  let app = mount(<App />);
  let reviewArray = app.state('reviews');
  expect(reviewArray).toStrictEqual([]);
})

it ('should render reviewShell if reviewGetter returns null', () => {
  let mockGetter = jest.fn(() => {return 'error'});
  App.prototype.reviewGetter = mockGetter;
  let app = shallow(<App />)
  mockGetter();
  expect(app.find('.reviewsShell').children()).toHaveLength(4);
})

it ('should render data if reviewGetter returns data', () => {
  let app = mount(<App />);
  let data = mockSuccessAjax(successData);
  app.setState({reviews: data});
  expect(app.find('.reviewBody').children()).toHaveLength(11);
})

it ('app body should match snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
})


it ('should render page if reivewBody returns error', () => {
  let app = mount(<App />);
  app.setState({reviews: []});
  expect(app.find('.reviewBody').children()).toHaveLength(1);
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

it ('should register click for showMore', () => {
  let showMore = jest.fn();
  App.prototype.showMore = showMore;
  const app = shallow(<App />);
  let showMoreButton = app.find('.showMore');
  showMoreButton.simulate('click');
  expect(showMore).toHaveBeenCalled();
  expect((showMoreButton).exists()).toBe(true);
})





