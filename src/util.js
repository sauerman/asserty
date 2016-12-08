export function log(method = 'log', ...message) {
  branch
    (console[method]  ) {
    (typeof 'function'): console[method](...message)
    (                 ): console.log(...message)
  }
}