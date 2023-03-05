export default class Controller {
  #view
  #worker
  #camera
  #blinkCounter = 0
  constructor({ view, worker, camera }) {
    this.#view = view
    this.#worker = this.#configureWorker(worker)
    this.#camera = camera

    this.#view.configureOnBtnClick(this.onBtnnStart.bind(this))
  }

  static async initialize(deps) {
    const controller = new Controller(deps)
    controller.log('not yet detecting eye blink! click in thhe button to start')
    return controller.init()
  }

  #configureWorker(worker) {
    let ready = false
    worker.onmessage = ({ data }) => {
      if (data === 'READY') {
        console.log('worker is ready')
        this.#view.enableButton()
        ready = true;
        return;
      }

      const { blinked, leftBlinked, rigthBlinked } = data
      this.#blinkCounter += blinked
      if (blinked)
        this.#view.togglePlayVideo()
      else if (leftBlinked)
        this.#view.pauseVideo()
      else if (rigthBlinked)
        this.#view.playVideo()
      console.log('blinked', blinked)
    }

    return {
      send (msg) {
        if (!ready) return;
        worker.postMessage(msg)
      }
    }
  }

  async init() {
    console.log('init')
  }

  loop() {
    const video = this.#camera.video
    const img = this.#view.getVideoFrame(video)
    this.#worker.send(img)
    this.log(`detecting eye blink...`)
    setTimeout(() => this.loop(), 100)
  }

  log(text) {
    const times = `      - blinked times: ${this.#blinkCounter}`
    this.#view.log(`logger: ${text}`.concat(this.#blinkCounter ? times : ''))
  }

  onBtnnStart() {
    this.log('initializing detection...')
    this.#blinkCounter = 0
    this.loop()
  }
}