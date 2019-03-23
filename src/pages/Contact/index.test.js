/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Contact from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Contact page', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Contact />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
