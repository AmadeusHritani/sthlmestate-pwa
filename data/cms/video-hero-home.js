export default {
  settings: {
    mono: true,
    fullHeight: true,
    height: {
      full: '100vh',
      custom: '500px'
    },
    maxHeight: null,
    showContinue: false
  },
  seoTitle: 'Sthlm Estate',
  video: {
    desktop: 'sthlmestate-home-desktop.mp4',
    mobile: 'sthlmestate-home-mobile.mp4',
    overlay: {
      dark: 'linear-gradient(180deg,rgba(20,20,20,.8) 0%,rgba(20,20,20,.2) 50%,rgba(20,20,20,.1) 100%)',
      light: 'linear-gradient(180deg,rgba(20,20,20,.8) 0%,rgba(20,20,20,.2) 50%,rgba(20,20,20,.1) 100%)'
      // light: 'linear-gradient(180deg,rgba(255,255,255,.9) 0%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.1) 100%)'
    }
  },
  poster: {
    desktop: 'stockholm-desktop.jpg',
    mobile: 'stockholm-mobile.jpg'
  },
  content: {
    image: {
      dark: 'logo-stacked-dark-margin.svg',
      light: 'logo-stacked-light-margin.svg'
    },
    heading: {
      active: false,
      label: 'Hitta ditt drömhem i Stockholm',
      color: {
        dark: 'var(--v-secondary-base)',
        light: 'white'
      }
    },
    cta: {
      samePage: false,
      to: 'bostader',
      label: 'SE VÅRA HEM'
    }
  }
}
