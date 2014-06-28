var filterSegment = require('./')
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


var nums = [0, 1, -5, 4, 3, 100, -2, 6, -432, -4, 0, 1, 1000, -45, 3]
for (var n in nums)
  s.input.write(nums[n])
