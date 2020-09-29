import { some } from 'lodash'

export const required = value => value ? undefined : 'Field required'

// At least one lang must be filled...
export const requiredAtLeastOne = value => {
  if (some(value)) {
    return undefined
  }
  return 'At least one translaton is required'
}

export const notAnEmptyList = value => {
  if (value && value.length > 0) {
    return undefined
  }
  return 'Insert at least one item'
}

export const matchPattern = pattern => value =>
  !pattern || !value || pattern.test(value) ? undefined : 'Invalid value. Doesn\'t match pattern.';

export const matchMinMax = (min, max) => value => {
  if(min && max)
    return min <= value && max >= value ? undefined : `The value must be between ${min} and ${max}`;
  if(min)
    return min <= value ? undefined : `The value must be greater than ${min}`;
  if(max)
    return max >= value ? undefined : `The value must be lower than ${max}`;
}
