/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import GetRecaptchaToken from './'
import jssSerializer from '../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The GetRecaptchaToken component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<GetRecaptchaToken />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
