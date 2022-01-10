export enum RedBlackTreeColor {
  Red,
  Black,
}

export class RedBlackTreeNode {
  public left?: RedBlackTreeNode
  public right?: RedBlackTreeNode
  public parent?: RedBlackTreeNode

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

    const newNode = new RedBlackTreeNode(RedBlackTreeColor.Red, data)

    const parent = this.findParentFor(data)

    if (parent === null) {
      throw new Error('element already exists')
    }

    if (data < parent.data) {
      parent.left = newNode
    } else {
      parent.right = newNode
    }
    newNode.parent = parent

    // now that's inserted, check if coloring is needed
    const aunt = this.auntForNode(newNode)
    if (!aunt) {
      return
    }

    if (parent.color === RedBlackTreeColor.Red) {
      if (aunt.color === RedBlackTreeColor.Red) {
        if (!aunt.parent) {
          return
        }
        this.recolorAround(aunt.parent)
      } else {
        // rotate
      }
    }

    this.checkRootRecoloring()
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

  private findParentFor(n: number) {
    let parent = null
    let currentNode = this.root

    while (currentNode) {
      if (currentNode.data === n) {
        return null
      }

      parent = currentNode
      if (n < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    // arrived at null
    return parent
  }

  private auntForNode(node: RedBlackTreeNode) {
    const parent = node.parent

    if (!parent) {
      return null
    }

    const grandma = parent.parent

    if (!grandma) {
      return null
    }

    if (grandma.left?.data === parent.data) {
      return grandma.right
    } else {
      return grandma.left
    }
  }

  private recolorAround(node: RedBlackTreeNode) {
    node.color = RedBlackTreeColor.Red

    if (node.left) {
      node.left.color = RedBlackTreeColor.Black
    }

    if (node.right) {
      node.right.color = RedBlackTreeColor.Black
    }
  }

  private checkRootRecoloring() {
    if (!this.root) {
      return
    }

    this.root.color = RedBlackTreeColor.Black
  }
}
