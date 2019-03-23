/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Scenarios from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Scenarios protected page', () => {
  it('should render correctly', () => {
    const config = { isAdmin: true }
    const tree = renderer.create(<Scenarios config={config} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
