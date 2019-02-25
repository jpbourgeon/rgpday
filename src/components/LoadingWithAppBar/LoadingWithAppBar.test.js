/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import LoadingWithAppBar from './'
import jssSerializer from '../../../utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The LoadingWithAppBar component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<LoadingWithAppBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
