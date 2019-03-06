/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import GetReCaptchaTokens from './GetReCaptchaTokens'
import jssSerializer from '../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The GetReCaptchaTokens component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<GetReCaptchaTokens />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
