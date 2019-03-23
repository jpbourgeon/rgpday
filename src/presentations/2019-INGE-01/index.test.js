/* global describe, it, expect */
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import PresentationComponent from './'

import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The 2019-INGE-01 Presentation component', () => {
  it('should render correctly', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<PresentationComponent />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
