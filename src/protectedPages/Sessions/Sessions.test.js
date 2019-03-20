/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Sessions from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Sessions component', () => {
  it('should render correctly', () => {
    const config = { isAdmin: true }
    const tree = renderer.create(<Sessions config={config} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
