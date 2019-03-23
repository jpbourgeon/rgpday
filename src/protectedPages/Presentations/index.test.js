/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Presentations from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Presentations protected page', () => {
  it('should render correctly', () => {
    const config = { isAdmin: true }
    const tree = renderer.create(<Presentations config={config} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
