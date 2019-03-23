/* global describe, it, expect, jest */
/* eslint-disable import/first */
jest.mock('react-dom')
import { createPortal } from 'react-dom' /* eslint-disable-line */
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Board from './'

import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Rules component', () => {
  it('should render correctly', () => {
    const config = { scenarioId: '2019-INGE-01' }
    const renderer = new ShallowRenderer()
    renderer.render(<Board config={config} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
