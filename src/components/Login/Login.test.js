/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Login from './'
import jssSerializer from '../../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Login component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Login />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})