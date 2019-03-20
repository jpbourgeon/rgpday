/* global jest, describe, it, expect */
/* eslint-disable import/first */
jest.mock('normalize-diacritics', () => require('src/utils/emptyFunction'))
import { emptyFunction as normalizeSync } from 'normalize-diacritics' /* eslint-disable-line */
import React from 'react'
import renderer from 'react-test-renderer'
import EditTeam from './'
import jssSerializer from 'src/utils/jssSnapshotSerializer'

expect.addSnapshotSerializer(jssSerializer)

describe('The EditTeam component', () => {
  it('should render correctly', () => {
    const config = {
      isAdmin: true
    }
    const tree = renderer.create(<EditTeam config={config} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
