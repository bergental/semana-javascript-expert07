function supportsWorkerType() {
  let supports = false
  let tester = {
    get type() { supports = true }
  }
  try {
    new Worker('blob://', tester).terminate()
  } finally {
    return supports
  }
}
// Design Pattern - Closure
function prepareRunChecker({ timerDelay }) {
  let lastEvent = Date.now()
  return {
    shouldRun() {
      const result = (Date.now() - lastEvent) > timerDelay
      if (result) lastEvent = Date.now()

      return result
    }
  }
}

export {
  supportsWorkerType,
  prepareRunChecker
}