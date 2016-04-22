import {
  ok,
  throws,
  strictEqual,
  deepStrictEqual,
  ifError
} from 'assert'
import mergeDeep from '../'

describe('mergeDeep()', () => {
  it('Wrong types', () => {
    throws(() => {
      mergeDeep()
    }, Error)

    throws(() => {
      mergeDeep({ })
    }, Error)

    throws(() => {
      mergeDeep({ }, [ ])
    }, Error)

    throws(() => {
      mergeDeep([ ])
    }, Error)

    throws(() => {
      mergeDeep([ ], { })
    }, Error)
  })

  it('Succes', () => {
    ok(mergeDeep({ }, { }))

    ok(mergeDeep([ ], [ ]))
  })

  describe('Merge', () => {
    describe('Object', () => {
      const target = {
        prop1: 'value1',
        prop2: 'value2',
        obj: { },
        arr: [ ]
      }
      const received = {
        prop2: 'value3',
        prop3: 'value4',
        obj: 'value5',
        arr: null
      }

      mergeDeep(target, received)

      it('Merge', () => {
        strictEqual(target.prop1, 'value1')

        strictEqual(target.prop2, 'value3')

        strictEqual(target.prop3, 'value4')

        strictEqual(target.obj, 'value5')

        strictEqual(target.arr, null)
      })
    })

    describe("Deep object", () => {
      const target = {
        obj1: {
          prop1: 'value1',
          prop2: 'value2'
        },
        obj2: null,
        obj3: { }
      }
      const received = {
        obj1: {
          prop2: 'value3',
          prop3: 'value4'
        },
        obj2: {
          prop1: 'value1'
        },
        obj3: null
      }

      mergeDeep(target, received)

      it('Merge', () => {
        strictEqual(target.obj1.prop1, 'value1')

        strictEqual(target.obj1.prop2, 'value3')

        strictEqual(target.obj1.prop3, 'value4')

        strictEqual(typeof target.obj2, 'object')

        strictEqual(target.obj2.prop1, 'value1')

        strictEqual(typeof target.obj3, 'object')
      })
    })

    describe('Array', () => {
      const target = [
        {
          prop1: 'value1'
        },
        {
          prop1: 'value1',
          prop2: 'value2'
        },
        {
          prop1: 'value1'
        }
      ]
      const received = [
        {
          prop1: 'value2',
          prop2: 'value3'
        },
        {
          prop3: 'value3'
        }
      ]

      mergeDeep(target, received)

      it('Merge', () => {
        strictEqual(target.length, 3)

        strictEqual(target[0].prop1, 'value2')

        strictEqual(target[0].prop2, 'value3')

        strictEqual(target[1].prop1, 'value1')

        strictEqual(target[1].prop2, 'value2')

        strictEqual(target[1].prop3, 'value3')

        strictEqual(target[2].prop1, 'value1')
      })
    })

    describe('Deep array', () => {
      const target = [
        {
          arr1: [
            'value1',
            {
              prop1: 'value1',
              prop2: 'value2'
            },
            {
              prop1: 'value1',
              prop2: 'value2'
            },
            'value2'
          ],
          arr2: [ ],
          arr3: 'string',
          arr4: { }
        }
      ]
      const received = [
        {
          arr1: [
            {
              prop1: 'value1'
            },
            {
              prop2: 'value3',
              prop3: 'value4'
            }
          ],
          arr2: 'string',
          arr3: [ ],
          arr4: [ ]
        }
      ]

      mergeDeep(target, received)

      it('Merge', () => {
        strictEqual(target[0].arr1.length, 4)

        strictEqual(typeof target[0].arr1[0], 'object')

        strictEqual(target[0].arr1[0].prop1, 'value1')

        strictEqual(target[0].arr1[1].prop1, 'value1')

        strictEqual(target[0].arr1[1].prop2, 'value3')

        strictEqual(target[0].arr1[1].prop3, 'value4')

        strictEqual(target[0].arr1[2].prop1, 'value1')

        strictEqual(target[0].arr1[2].prop2, 'value2')

        strictEqual(target[0].arr1[3], 'value2')

        strictEqual(target[0].arr2, 'string')

        strictEqual(target[0].arr3.length, 0)

        strictEqual(target[0].arr4.length, 0)
      })
    })
  })
})