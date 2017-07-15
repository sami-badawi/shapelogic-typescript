import * as _m from './node_modules/@types/mithril-global/index'
import * as _lodash from './node_modules/@types/lodash/index'

declare global {
  const m: typeof _m;
  const _: typeof _lodash;
}