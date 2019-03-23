/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Score from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Score protected page', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Score />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
