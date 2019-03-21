/* global describe, it, expect, jest */
/* eslint-disable import/first */
jest.mock('react-dom')
import { createPortal } from 'react-dom' /* eslint-disable-line */
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Rules from './'

import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Rules component', () => {
  it('should render correctly', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Rules />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
