/* global describe, it, expect */
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Presentation from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The 2019-INGE-01 Presentation component', () => {
  it('should render correctly', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Presentation
      config={{ scenarioId: '2019-INGE-01' }}
      location={{ hash: '#start' }}
    />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
