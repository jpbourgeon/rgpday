/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Loading from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Loading component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Loading />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
