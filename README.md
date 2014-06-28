# node-pipe-segment-filter

See [pipe-segment](https://github.com/jbenet/node-pipe-segment).

This creates a pipe segment out of a filter function:


## Install

```
npm install pipe-segment-filter
```

## Examples

For a more complex example, see [pipe-segment examples](https://github.com/jbenet/node-pipe-segment#examples)

```js
var filterSegment = require('pipe-segment-filter')
// filterSegment is like a T pipe segment.
// it returns a segment object, with three streams:
// - segment.input
// - segment.output
// - segment.filtered

function dropNegatives(func) {
  return filterSegment(function(num) {
    return num >= 0
  })
}

var s = dropNegatives()
s.output.on('data', function(n) { console.log('output ' + n )})
s.filtered.on('data', function(n) { console.log('filtered ' + n )})

s.input.write(0)
s.input.write(1)
s.input.write(-5)
s.input.write(4)
```
