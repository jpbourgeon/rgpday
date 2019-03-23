/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Home from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Home page', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
