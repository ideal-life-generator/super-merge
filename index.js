'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = superMerge;
var OBJECT = 'object';
var ARRAY = 'array';
var WRONG_TYPE = new Error('Target type must be and object or array, and received must be same as the target.');

function typeOf(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

function merger(target, received) {
  var targetType = typeOf(target);
  var receivedType = typeOf(received);

  switch (receivedType) {
    case OBJECT:
      {
        if (targetType === OBJECT) {
          for (var name in received) {
            var value = received[name];


            target[name] = merger(target[name], value);
          }
        } else {
          target = received;
        }

        return target;
      }
    case ARRAY:
      {
        if (targetType === ARRAY) {
          received.forEach(function (value, index) {
            target[index] = merger(target[index], value);
          });
        } else {
          target = received;
        }

        return target;
      }
    default:
      {
        return target = received;
      }
  }
}

function superMerge(target, received) {
  var targetType = typeOf(target);
  var receivedType = typeOf(received);

  if (!(targetType === OBJECT && receivedType === OBJECT || targetType === ARRAY && receivedType === ARRAY)) throw WRONG_TYPE;

  return merger(target, received);
}