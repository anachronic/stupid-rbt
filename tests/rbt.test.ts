import { RedBlackTreeChecker } from './util'

describe('A Red Black Tree', () => {
  it('is valid if nothing is inserted', () => {
    const checker = new RedBlackTreeChecker()

    expect(() => checker.check()).not.toThrow()
  })

  it('is valid if only one element is inserted', () => {
    const checker = new RedBlackTreeChecker()

    checker.insert(1)

    expect(() => checker.check()).not.toThrow()
  })

  it('is valid if left/right childs are inserted', () => {
    const checker = new RedBlackTreeChecker()

    checker.insert(5)
    checker.insert(4)
    checker.insert(6)

    expect(() => checker.check()).not.toThrow()
  })

  it('is valid if one recoloring is needed', () => {
    const checker = new RedBlackTreeChecker()

    checker.insert(3)
    checker.insert(1)
    checker.insert(4)
    checker.insert(5)

    expect(() => checker.check()).not.toThrow()
  })

  it('is valid if one rotation is needed', () => {
    const checker = new RedBlackTreeChecker()

    checker.insert(3)
    checker.insert(1)
    checker.insert(5)
    checker.insert(7)
    checker.insert(6)

    expect(() => checker.check()).not.toThrow()
  })

  it('is valid for inserts from 0 to 10000', () => {
    const checker = new RedBlackTreeChecker()

    for (let i = 0; i < 10000; i++) {
      checker.insert(i)
    }
    expect(() => checker.check()).not.toThrow()
  })

  it('is valid for inserts from 10000 down to 0', () => {
    const checker = new RedBlackTreeChecker()

    for (let i = 10000; i >= 0; i--) {
      checker.insert(i)
    }

    expect(() => checker.check()).not.toThrow()
  })
})
