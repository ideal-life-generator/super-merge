# super-merge

## Installation

```bash
$ npm install super-merge --save
```

## Usage

```js
import superMerge from 'super-merge'

const target = {
  str: 'string',
  obj: {
    nl: null,
    bool: true,
    arr: [ ]
  },
  arr: [
    {
      bool: true,
      str: 'string'
    },
    {
      numb: 5,
      obj: { },
      str: 'string'
    }
  ]
}

const receive = {
  str: null,
  obj: {
    bool: {
      num: 5
    }
  },
  arr: [
    'string',
    {
      obj: {
        bool: true
      }
    }
  ]
}

superMerge(target, receive)

/*
// target
{
  str: null,
  obj: {
    nl: null,
    bool: {
      num: 5
    },
    arr: [ ]
  },
  arr: [
    'string',
    {
      numb: 5,
      obj: {
        bool: true
      },
      str: 'string'
    }
  ]
}
*/
```

---

## See also

[![Wiz Khalifa - Got Me Some More](http://i.imgur.com/62CGZ6Q.png)](https://www.youtube.com/watch?v=er_c_e6FN-E)