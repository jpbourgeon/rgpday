/* global describe, it, expect */
/* eslint-disable import/first */
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Service from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Service protected page', () => {
  it('should render correctly', () => {
    const config = { scenarioId: '2019-INGE-01' }
    const renderer = new ShallowRenderer()
    renderer.render(<Service config={config} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
