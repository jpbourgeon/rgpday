/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Navigation from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Navigation component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Navigation location={{ pathname: 'dashboard/serious-game' }} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
