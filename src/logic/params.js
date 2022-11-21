import { encodeDelimitedArray, decodeDelimitedArray } from 'use-query-params'
const RegexQParam = new RegExp(/^[0-9a-zA-Z- *]+$/)
const RegexSlugParam = new RegExp(/^[0-9a-zA-Z-]+$/)
const RegexSlugsParam = new RegExp(/^[0-9a-zA-Z-,]+$/)

export const QParam = {
  decode(value) {
    if (RegexQParam.test(value)) {
      return value
    }
    return null
  },
  encode(value) {
    if (RegexQParam.test(value)) {
      return value
    }
    return undefined
  },
}

export const SlugParam = {
  decode(value) {
    if (RegexSlugParam.test(value)) {
      return value
    }
    return null
  },
  encode(value) {
    if (typeof value === 'string') {
      return value
    }
    return undefined
  },
}

export const SlugsParam = {
  decode(value) {
    if (RegexSlugsParam.test(value)) {
      return decodeDelimitedArray(value, ',')
    }
    return null
  },
  encode(arr) {
    if (Array.isArray(arr)) {
      return encodeDelimitedArray(arr, ',')
    }
    return undefined
  },
}
