/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import CallToAction from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The CallToAction component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<CallToAction />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
