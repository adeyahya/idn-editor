import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './Wrapper';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

describe('Wrapper', () => {
  const initialState = {
    draft: 100
  }
  const mockStore = configureStore();
  let store, container

  beforeEach(()=>{
    store = mockStore(initialState)
    container = shallow(<Wrapper store={store} /> )
  })

  it('+++ render the connected(SMART) component', () => {
    expect(container.length).toEqual(1)
  });

  it('+++ check Prop match with initialState', () => {
    expect(container.prop('draft')).toEqual(initialState.draft);
  })
})
