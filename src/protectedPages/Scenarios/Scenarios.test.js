/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Scenarios from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Scenarios component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Scenarios />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
