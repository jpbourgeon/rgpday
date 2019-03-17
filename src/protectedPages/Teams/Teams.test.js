/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Teams from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Teams component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Teams />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
