/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Default from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Default page', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Default />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
