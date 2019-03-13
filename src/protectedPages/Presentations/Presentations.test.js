/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Presentations from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Presentations component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Presentations />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
