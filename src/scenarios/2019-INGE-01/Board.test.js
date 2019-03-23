/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import BoardComponent from './Board'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The 2019-INGE-01 Board component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BoardComponent team={{ name: 'hello world' }} services={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
