import {checkRedBlackTree} from './util'
import { RedBlackTree } from '../src/rbt'

describe('A Red Black Tree', () => {
  it('is valid if nothing is inserted', () => {
    const tree = new RedBlackTree()

    expect(checkRedBlackTree(tree)).toEqual(true)
  })
})
