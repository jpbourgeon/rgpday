/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import AppBarWithDrawer from './'
import jssSerializer from '../../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The AppBarWithDrawer component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<AppBarWithDrawer />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
