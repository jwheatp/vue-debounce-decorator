import { createDecorator } from 'vue-class-component'

export type DebounceOptions =
  | number
  | {
      time: number
    }

export function Debounce(options: DebounceOptions): MethodDecorator {
  return createDecorator((opts, handler) => {
    if (!opts.methods) throw new Error('This decorator must be used on a vue component method.')

    const time = typeof options === 'number' ? options : options.time

    const originalFn = opts.methods[handler]
    let timeoutId = 0

    const clear = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = 0
      }
    }

    opts.methods[handler] = function(...args: any[]) {
      clear()
      timeoutId = setTimeout(() => {
        timeoutId = 0
        originalFn.apply(this, args)
      }, time)
    }
  })
}