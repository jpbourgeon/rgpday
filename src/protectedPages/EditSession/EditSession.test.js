/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import EditSession from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The EditSession component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<EditSession />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
