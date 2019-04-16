import mitt from 'mitt'

export default mitt()

export const events = {
  pageTransitionStart: 'pageTransitionStart',
  pageTransitionDone: 'pageTransitionDone',
  heroLoaded: 'heroLoaded',
  modal: 'modal',
  hackatonTitle: 'hackatonTitle',
  hideBurger: 'hideBurger',
  showBurger: 'showBurger',
}
