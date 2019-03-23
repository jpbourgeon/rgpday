/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Service from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Service protected page', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Service />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
