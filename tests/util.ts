import { RedBlackTree, RedBlackTreeColor, RedBlackTreeNode } from '../src/rbt'

export class RedBlackTreeChecker {
  tree: RedBlackTree
  insertedNumbers: Array<number>

  constructor() {
    this.tree = new RedBlackTree()
    this.insertedNumbers = []
  }

  insert(x: number) {
    this.tree.insert(x)
    this.insertedNumbers.push(x)
  }

  check() {
    if (!this.tree.root) {
      return true
    }

    this.checkRootColor()
    this.checkInsertedElements()
    this.checkConsecutiveRedNodes()
    this.checkNumberOfBlackNodesInPath()
  }

  private checkRootColor() {
    if (this.tree.root?.color !== RedBlackTreeColor.Black) {
      throw new Error("Expected root to be black but wasn't")
    }
  }

  private checkInsertedElements() {
    const notFound: Array<number> = []

    for (const n of this.insertedNumbers) {
      if (this.tree.search(n) === null) {
        notFound.push(n)
      }
    }

    if (notFound.length > 0) {
      throw new Error(`Expected to find ${notFound.join(',')} but didn't`)
    }
  }

  private checkConsecutiveRedNodes() {
    this.checkConsecutiveRedNodesUnderNode(this.tree.root)
  }

  private checkConsecutiveRedNodesUnderNode(node?: RedBlackTreeNode) {
    if (!node) {
      return
    }

    if (node.color === RedBlackTreeColor.Black) {
      this.checkConsecutiveRedNodesUnderNode(node.left)
      this.checkConsecutiveRedNodesUnderNode(node.right)

      return
    }

    if (node.right) {
      if (node.right.color === RedBlackTreeColor.Red) {
        throw new Error(`Detected two consecutive red nodes: ${node.right?.data} and ${node.data}`)
      }

      this.checkConsecutiveRedNodesUnderNode(node.right)
    }

    if (node.left) {
      if (node.left.color === RedBlackTreeColor.Red) {
        throw new Error(`Detected two consecutive red nodes: ${node.left?.data} and ${node.data}`)
      }

      this.checkConsecutiveRedNodesUnderNode(node.left)
    }
  }

  private checkNumberOfBlackNodesInPath() {
    const paths = this.constructAllPaths(this.tree.root)

    const blacks = paths.map(
      (path) =>
        path.map((node) => node.color).filter((color) => color === RedBlackTreeColor.Black).length
    )

    const expected = blacks[0]
    if (!blacks.every((numOfBlacks) => numOfBlacks === expected)) {
      throw new Error(`Detected a path with bad number of blacks`)
    }
  }

  private constructAllPaths(node?: RedBlackTreeNode): Array<Array<RedBlackTreeNode>> {
    if (!node) {
      return []
    }

    const pathsLeft = this.constructAllPaths(node.left)
    const pathsRight = this.constructAllPaths(node.right)

    return [
      ...pathsLeft.map((path) => [node, ...path]),
      ...pathsRight.map((path) => [node, ...path]),
    ]
  }
}
