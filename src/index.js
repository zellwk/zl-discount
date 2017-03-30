export function parseDiscount (
  discountCodes,
  discountCode,
  origAmount
) {
  let discount = getDiscountValue(discountCodes, discountCode)
  let {
    discountValue,
    discountType,
    discountDuration
  } = discount
  let discountAmount
  let discountedAmount

  if (discountValue === 0) {
    discountAmount = 0
    discountedAmount = origAmount
  }

  if (discountType === 'amount') {
    discountAmount = discountValue
    discountedAmount = origAmount - discountAmount
  }

  if (discountType === 'percentage') {
    discountAmount = origAmount * discountValue / 100
    discountedAmount = origAmount - discountAmount
  }

  return {
    origAmount,
    discountType,
    discountAmount,
    discountDuration,
    discountedAmount
  }
}

function getDiscountValue (discountCodes, discountCode) {
  let discount = discountCodes[discountCode]
  if (discount) {
    return {
      discountValue: getDiscountAmount(),
      discountType: getDiscountType(),
      discountDuration: getDiscountDuration()
    }
  } else {
    return {
      discountValue: 0,
      discountType: undefined,
      discountDuration: undefined
    }
  }
}

export function getDiscountAmount (
  discount,
  origAmount = 0
) {
  if (typeof discount !== 'object') {
    throw new Error('Invalid discount object')
  }

  let value = parseInt(discount[0])
  if (getDiscountType(discount) === 'amount') {
    return value
  }

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
