/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Board from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Board component', () => {
  it('should render correctly', () => {
    const config = { scenarioId: '2019-INGE-01' }
    const tree = renderer.create(<Board config={config} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
