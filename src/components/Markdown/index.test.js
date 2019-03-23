/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import Markdown from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The Markdown component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Markdown>{`# Hello world`}</Markdown>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
