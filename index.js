var Segment = require('pipe-segment')
var Writable = require('stream').Writable
var Readable = require('stream').Readable
var noop = function() {}

module.exports = FilterSegment

function FilterSegment(filter) {
  filter = filter || function(val) { return !!val }
  if (typeof(filter) !== 'function')
    throw new Error('filter must be a function')

  var s = {}
  s.input = Writable({ objectMode: true, highWaterMark: 16 })
  s.output = Readable({ objectMode: true, highWaterMark: 16 })
  s.filtered = Readable({ objectMode: true, highWaterMark: 16 })

  s.input._write = function(item, enc, next) {
    if (filter(item))
      s.output.push(item)
    else
      s.filtered.push(item)
    next()
  }

  s.output._read = noop
  s.filtered._read = noop

  return Segment(s)
}
