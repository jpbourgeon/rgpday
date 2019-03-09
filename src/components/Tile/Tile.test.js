/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Tile from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Tile component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Tile />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
