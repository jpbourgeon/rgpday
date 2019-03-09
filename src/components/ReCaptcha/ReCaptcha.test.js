/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import ReCaptcha from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The ReCaptcha component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ReCaptcha />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
