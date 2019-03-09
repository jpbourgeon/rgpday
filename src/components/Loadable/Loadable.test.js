/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Loadable from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Loadable component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Loadable />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
