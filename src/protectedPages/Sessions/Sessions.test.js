/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Sessions from './'
import jssSerializer from '../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Sessions component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Sessions />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
