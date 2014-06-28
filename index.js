var Segment = require('pipe-segment')
var Writable = require('stream').Writable
var Readable = require('stream').Readable

module.exports = FilterSegment

function FilterSegment(filter) {
  filter = filter || function(val) { return !!val }
  if (typeof(filter) !== 'function')
    throw new Error('filter must be a function')

  var s = {}
  s.input = Writable({ objectMode: true })
  s.output = Readable({ objectMode: true })
  s.filtered = Readable({ objectMode: true })

  s.input._write = function(item, enc, next) {
    if (filter(item))
      s.output.push(item)
    else
      s.filtered.push(item)
    next()
  }

  return Segment(s)
}
