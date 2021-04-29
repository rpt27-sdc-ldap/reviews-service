
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import App from '../src/Components/App.js';
import Enzyme from 'enzyme';
import { Promise } from 'bluebird';
import Mongoose from 'mongoose';
Enzyme.configure({ adapter: new Adapter() });
import 'babel-polyfill';
import $ from 'jquery';

// jest.mock('$');

it('should update Dom', async () => {

  const wrapper = shallow(<App />);
  // const div = wrapper.find(this.state);
  const result = wrapper.state();
  expect(result).toStrictEqual({reviews: '', carouselReviews: ''});

});










// beforeEach(() => {
//   App.mockClear();
// });

// it('should have a working API', done => {
//   const instance = wrapper.instance();
//   function ajaxGetAsync(url) {
//     return new Promise(function (resolve, reject) {
//       let person = new Person('Lorem', 'Ipsum');
//       let spy = jest.spyOn(person, 'sayMyName').mockImplementation(() => 'Hello');

//       expect(person.sayMyName()).toBe("Hello");
//       expect(person.bla()).toBe("bla");

//       // unnecessary in this case, putting it here just to illustrate how to "unmock" a method
//       spy.mockRestore();
//     });
// }
//   instance.componentDidMount();
//   const reviewsState = instance.state.reviews;
//   const carouselReviewsState = instance.state.carouselReviews;

//   expect(typeof reviewsState).toBE('array');
//   expect(typeof carouselReviewsState).toBE('array');

// })
