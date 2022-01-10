export enum RedBlackTreeColor {
  Red,
  Black,
}

class RedBlackTreeNode {
  public left?: RedBlackTreeNode
  public right?: RedBlackTreeNode

  constructor(public color: RedBlackTreeColor, public data: number) {}
}

export class RedBlackTree {
  root?: RedBlackTreeNode

  constructor() {
    this.root = undefined
  }

  public insert(data: number) {
    if (!this.root) {
      this.root = new RedBlackTreeNode(RedBlackTreeColor.Black, data)

      return
    }

    // const newNode = new RedBlackTreeNode(
    //   RedBlackTreeColor.Red,
    //   data
    // )
    // insert something
  }

  public search(query: number) {
    let currentNode = this.root

    while (currentNode) {
      if (currentNode.data === query) {
        return query
      }

      if (query < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    // not found
    return null
  }
}
