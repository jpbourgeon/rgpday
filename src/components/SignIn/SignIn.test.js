/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import SignIn from './'
import jssSerializer from '../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The SignIn component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<SignIn />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
