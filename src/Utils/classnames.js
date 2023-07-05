import cx from 'classnames'
import { cloneDeep, mergeWith } from 'lodash'

export function mergeStyles(base, classes){
  return mergeWith(cloneDeep(base), ...classes, (className1, className2) =>
    cx(className1, className2),
  )
}

export { cx }