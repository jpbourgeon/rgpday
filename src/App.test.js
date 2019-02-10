/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import App from './App'
import jssSerializer from '../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The App component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
