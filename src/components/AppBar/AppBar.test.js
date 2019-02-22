/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import AppBar from './'
import jssSerializer from '../../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The AppBar component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<AppBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
