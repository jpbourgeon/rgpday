/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Presentation from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Presentation component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Presentation config={{ scenarioId: '2019-INGE-01' }} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
