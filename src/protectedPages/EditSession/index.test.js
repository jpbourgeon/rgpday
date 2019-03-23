/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import EditSession from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The EditSession protected page', () => {
  it('should render correctly', () => {
    const config = { isAdmin: true }
    const tree = renderer.create(<EditSession config={config} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
