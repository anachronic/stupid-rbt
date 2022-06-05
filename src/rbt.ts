export type RedBlackTreeColor = 'red' | 'black'

export class RedBlackTreeNode {
  public left?: RedBlackTreeNode
  public right?: RedBlackTreeNode
  public parent?: RedBlackTreeNode

  constructor(public color: RedBlackTreeColor, public data: number) {}
}

export class RedBlackTree {
  root?: RedBlackTreeNode

  public insert(data: number) {
    if (!this.root) {
      this.root = new RedBlackTreeNode('black', data)

      return
    }

    let newNode = new RedBlackTreeNode('red', data)

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

    let grandParent = parent?.parent

    while (newNode.parent?.color === 'red') {
      grandParent = newNode.parent.parent
      if (!grandParent) {
        break
      }

      // if newNode is on the left side of its grandparent
      if (newNode.data < grandParent.data) {
        const aunt = grandParent.right
        const auntColor = aunt?.color || 'black'

        if (auntColor === 'red') {
          // recolor up to grandparent
          grandParent.color = 'red'
          newNode.parent.color = 'black'

          if (aunt) {
            aunt.color = 'black'
          }

          newNode = grandParent
        } else {
          if (newNode.data > newNode.parent.data) {
            newNode = newNode.parent
            this.leftRotate(newNode)
          }
          // aunt is black and newNode is to the left of its parent (and its
          // parent is to the left of its parent)
          if (newNode.parent?.parent) {
            this.rightRotate(newNode.parent.parent)

            grandParent.color = 'red'
            newNode.parent.color = 'black'
          }
        }
      } else {
        const aunt = grandParent.left
        const auntColor = aunt?.color || 'black'

        if (auntColor === 'red') {
          // recolor up to grandparent
          grandParent.color = 'red'
          newNode.parent.color = 'black'

          if (aunt) {
            aunt.color = 'black'
          }

          newNode = grandParent
        } else {
          if (newNode.data < newNode.parent.data) {
            newNode = newNode.parent
            this.rightRotate(newNode)
          }

          if (newNode.parent?.parent) {
            this.leftRotate(newNode.parent.parent)

            grandParent.color = 'red'
            newNode.parent.color = 'black'
          }
        }
      }
    }

    this.root.color = 'black'
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

  private leftRotate(node: RedBlackTreeNode): void {
    if (!node.right) {
      throw new Error("Makes no sense to rotate left if there's nothing to the right")
    }

    const originalParent = node.parent

    const right = node.right
    const rightLeft = node.right?.left

    right.left = node
    node.parent = right

    node.right = rightLeft
    if (rightLeft) {
      rightLeft.parent = node
    }

    if (!originalParent) {
      delete right.parent
      this.root = right
      return
    }

    if (node.data > originalParent.data) {
      originalParent.right = right
    } else {
      originalParent.left = right
    }
    right.parent = originalParent
  }

  private rightRotate(node: RedBlackTreeNode): void {
    if (!node.left) {
      throw new Error("Makes no sense to rotate right if there's nothing to the left")
    }

    const originalParent = node.parent

    const left = node.left
    const leftRight = node.left?.right

    left.right = node
    node.parent = left

    node.left = leftRight

    if (leftRight) {
      leftRight.parent = node
    }

    if (!originalParent) {
      delete left.parent
      this.root = left
      return
    }

    if (node.data > originalParent.data) {
      originalParent.right = left
    } else {
      originalParent.left = left
    }
    left.parent = originalParent
  }
}
