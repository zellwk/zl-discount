export function getDiscountObject(discountCodes, discountCode) {
  return discountCodes[discountCode]
}

export function getDiscountAmount (
  discount,
  origAmount = 0
) {
  if (typeof discount !== 'object') {
    throw new Error('Invalid discount object')
  }
  let value = parseInt(discount[0])
  if (getDiscountType(discount) === 'amount') return value
  if (!origAmount) throw new Error('Missing original amount param')
  return value / 100 * origAmount
}

export function getDiscountedAmount (
  discount,
  origAmount
) {
  if (typeof discount !== 'object') throw new Error('Invalid discount object')
  if (!origAmount) throw new Error('Missing original amount param')
  let discountAmount = getDiscountAmount(discount, origAmount)
  let value = origAmount - discountAmount
  return (value > 0) ? value : 0
}

export function getDiscountType (discount) {
  return discount[0].includes('%') ? 'percentage' : 'amount'
}

export function getDiscountDuration (discount) {
  return discount[1]
}

export function isCodeValid (discountCodes, discountCode) {
  return discountCodes[discountCode]
}

export function isFloat (num) {
  return num % 1 !== 0
}

export function renderNum (num) {
  return (isFloat(num)) ? num.toFixed(2) : num.toString()
}
