/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import EditScenario from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The EditScenario component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<EditScenario />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
