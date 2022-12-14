/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import About from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The About page', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<About />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
