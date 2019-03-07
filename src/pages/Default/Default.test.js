/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Default from './'
import jssSerializer from '../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Default component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Default />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
