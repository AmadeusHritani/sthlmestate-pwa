export default {
  settings: {
    mono: true,
    fullHeight: true,
    height: {
      full: '100vh',
      custom: '500px'
    },
    maxHeight: null
  },
  seoTitle: 'Sthlm Estate AB',
  video: {
    desktop: '/sthlmestate-home-desktop.mp4',
    mobile: '/sthlmestate-home-mobile.mp4',
    overlay: {
      dark: 'linear-gradient(0deg,#2a2a2a94,#272727)',
      light: 'linear-gradient(0deg,#f4f0ed94,#f4f0ed)'
    }
  },
  poster: {
    desktop: '/stockholm-desktop.jpg',
    mobile: '/stockholm-mobile.jpg'
  },
  content: {
    image: {
      dark: 'logo-stacked-dark-margin.svg',
      light: 'logo-stacked-light-margin.svg'
    },
    heading: {
      label: 'Hitta ditt drömhem i Stockholm',
      color: {
        dark: 'var(--v-secondary-base)',
        light: 'var(--v-primary-base)'
      }
    },
    cta: {
      samePage: false,
      to: 'fastigheter',
      label: 'SE VÅRA HEM'
    }
  }
}
