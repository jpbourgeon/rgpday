/* global describe, it, expect */
/* eslint-disable import/first */
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Score from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Score protected page', () => {
  it('should render correctly', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Score />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
