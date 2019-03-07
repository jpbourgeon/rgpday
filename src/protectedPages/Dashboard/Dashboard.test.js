/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Dashboard from './'
import jssSerializer from '../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Dashboard component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Dashboard />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
