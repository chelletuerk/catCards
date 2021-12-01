// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

//I, unfortunately, didn't have enough time to write more tests. TDD is
//no easy process! With that being said, I certainly would be writing
//unit tests for basic functionality. Here is a very very small example
//pertinent tests I would be writing. I would also incorporate the jest
//testing suit included with React.

//I'm very aware my tests aren't passing though. :/

import '@testing-library/jest-dom';
import { shallow, mount } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import Card from './card.tsx'
import Badge from './badge.tsx'

describe('Card', () => {
  it('renders a div', function() {
  expect(shallow(<Card />).contains(<div/>)).to.equal(true);
  });
});

describe('Badge', () => {
  it('renders a div', function() {
  expect(shallow(<Badge />).contains(<button/>)).to.equal(true);
  });
});
