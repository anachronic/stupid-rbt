import { RedBlackTree, RedBlackTreeColor } from '../src/rbt'

export function checkRedBlackTree(tree: RedBlackTree) {
  if (!tree.root) {
    return true
  }

  return tree.root.color === RedBlackTreeColor.Black
}


