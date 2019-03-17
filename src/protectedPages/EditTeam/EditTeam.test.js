/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import EditTeam from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The EditTeam component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<EditTeam />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
