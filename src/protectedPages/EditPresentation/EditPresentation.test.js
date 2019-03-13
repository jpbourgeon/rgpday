/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import EditPresentation from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The EditPresentation component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<EditPresentation />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
