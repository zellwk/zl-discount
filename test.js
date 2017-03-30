const discount = require('./')
const test = require('tape')
const fixtures = {
  gogogo: ['25%', 'forever'],
  'amazing student': ['50%', 'forever'],
  'winner': ['100%', 'forever'],
  'launch party': ['50', 'once'],
  'preorder': ['100', 'once']
}

// Test code validity
test('Test if code valid', (tape) => {
  tape.ok(discount.isCodeValid(fixtures, 'gogogo'))
  tape.notOk(discount.isCodeValid(fixtures, 'blah'))
  tape.end()
})

// Test for type
test('% should return percentage type', (tape) => {
  let d = fixtures['gogogo']
  let test = discount.getDiscountType(d)
  tape.equal(test, 'percentage')
  tape.end()
})

test('amt should return amt type', (tape) => {
  let d = fixtures['launch party']
  let test = discount.getDiscountType(d)
  tape.equal(test, 'amount')
  tape.end()
})

// Test for duration
test('Duration should be forever', (tape) => {
  let d = fixtures['gogogo']
  let test = discount.getDiscountDuration(d)
  tape.equal(test, 'forever')
  tape.end()
})

test('Duration should be once', (tape) => {
  let d = fixtures['launch party']
  let test = discount.getDiscountDuration(d)
  tape.equal(test, 'once')
  tape.end()
})

// Test for discount amount
test('discount amount value', (tape) => {
  let d = fixtures['launch party']
  let test = discount.getDiscountAmount(d)
  tape.equal(test, 50)
  tape.end()
})

test('% discount amount value', (tape) => {
  let d = fixtures['gogogo']
  tape.throws(discount.getDiscountAmount.bind(null, d), 'Missing original amount param')

  let test = discount.getDiscountAmount(d, 500)
  tape.equal(test, 125)
  tape.end()
})

// test for discounted amount
test('discounted amount value', (tape) => {
  let d = fixtures['launch party']
  tape.throws(discount.getDiscountedAmount.bind(null, 'launch party'), 'Invalid discount Object')
  tape.throws(discount.getDiscountedAmount.bind(null, d), 'Missing original amount param')
  let test = discount.getDiscountedAmount(d, 357)
  tape.equal(test, 307)

  let test2 = discount.getDiscountedAmount(d, 25)
  tape.equal(test2, 0, 'min value should be 0')
  tape.end()
})

test('% discounted amount value', (tape) => {
  let d = fixtures['gogogo']

  tape.throws(discount.getDiscountedAmount.bind(null, 'gogogo'), 'Invalid discount Object')
  tape.throws(discount.getDiscountedAmount.bind(null, d), 'Missing original amount param')

  let test = discount.getDiscountedAmount(d, 1000)
  tape.equal(test, 750)

  let test2 = discount.getDiscountedAmount(d, 10)
  tape.equal(test2, 7.5)

  tape.end()
})

test('test float', (tape) => {
  tape.ok(discount.isFloat(2.5))
  tape.notOk(discount.isFloat(2))
  tape.end()
})

test('test render num', (tape) => {
  tape.equal(discount.renderNum(2.5), '2.50')
  tape.equal(discount.renderNum(2), '2')
  tape.end()
})
