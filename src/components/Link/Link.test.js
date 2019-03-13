/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Link from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Link component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Link to='/'>Hello world</Link>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
