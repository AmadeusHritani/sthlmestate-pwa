export default {
  settings: {
    height: 'full-height',
    width: 'full' // full|boxed
  },
  background: {
    hasImage: true,
    bgcolor: 'var(--v-primary-base)',
    position: 'center center',
    repeat: 'norepeat',
    size: 'cover',
    src: {
      desktop: '/about.jpg',
      mobile: '/about.jpg'
    },
    mono: false
  },
  layout: {
    align: {
      desktop: 'center', // center|left|right
      mobile: 'center'
    },
    position: {
      desktop: 'middle', // middle|left|right,
      mobile: 'after' // after|before|inside ()
    },
    padding: {
      desktop: null, // default: 0
      mobile: null // default: 0
    }
  },
  symbol: {
    type: 'icon', // icon|image
    paddingY: {
      desktop: null, // default: 0
      mobile: null // default: 0
    },
    icon: {
      mdi: 'mdi-home-switch-outline',
      size: {
        desktop: '7rem',
        mobile: '5rem'
      },
      color: null // default: #ffffff. Or example: var(--v-secondary-base)
    },
    image: {
      src: {
        desktop: '/icon.png',
        mobile: '/icon.png'
      },
      width: {
        desktop: '80%',
        mobile: '70%'
      },
      maxWidth: {
        desktop: '150px',
        mobile: '100px'
      },
      height: {
        desktop: 'auto',
        mobile: 'auto'
      }
    }
  },
  heading: {
    tag: 'h1',
    text: 'Sthlm Estate',
    font: 'Barlow, Arial', // 'Barlow, Arial'|'Aleo, Georgia'
    weight: '100',
    size: {
      desktop: '3.5rem',
      mobile: '2.5rem'
    },
    color: 'var(--v-secondary-base)', // default: #ffffff. Or example: var(--v-secondary-base)
    paddingY: {
      desktop: null, // default: 0
      mobile: null // default: 0
    }
  },
  subheading: {
    tag: 'h2',
    text: null,
    font: 'Barlow, Arial', // 'Barlow, Arial'|'Aleo, Georgia'
    weight: '300',
    size: {
      desktop: '2rem',
      mobile: '1.5rem'
    },
    color: 'var(--v-secondary-base)', // default: #ffffff. Or example: var(--v-secondary-base)
    paddingY: {
      desktop: null, // default: 0
      mobile: null // default: 0
    },
    position: 'before' // before|after
  },
  details: {
    tag: 'div',
    text: 'Sthlm Estate är ett hem för drivna mäklare som inte väntar i hopp på resultat utan arbetar fullt ut för att skapa resultat. Vi förmedlar hem med full fokus på ditt välmående i första plats. För oss är alla bitar i processen lika viktiga, start som avslut. Vi finns för dig genom hela processen och erbjuder personlig service för att du ska känna dig trygg genom hela resan.',
    font: 'Barlow, Arial', // 'Barlow, Arial'|'Aleo, Georgia'
    weight: '400',
    size: {
      desktop: '1.1rem',
      mobile: '1rem'
    },
    color: 'var(--v-secondary-base)', // default: #ffffff. Or example: var(--v-secondary-base)
    paddingY: {
      desktop: null, // default: 0
      mobile: null // default: 0
    }
  },
  actions: {
    show: false,
    cta1: {
      show: true,
      label: 'Read more',
      to: '/',
      color: null, // default: '#ffffff'. Or example: var(--v-secondary-base)
      text: true,
      outlined: false,
      dark: false,
      tile: false,
      flat: false,
      raised: false,
      elevation: null,
      light: false,
      block: {
        desktop: false,
        mobile: true
      },
      floating: false,
      icon: false,
      showLoader: false,
      plain: false,
      rounded: true,
      size: {
        desktop: 'large', // 'x-small'|'small'|'default'|'large'|'x-large'
        mobile: 'default'
      },
      prepend: null,
      append: null
    },
    cta2: {
      show: false,
      label: 'Read more',
      to: '/',
      color: null, // default: '#ffffff'. Or example: var(--v-secondary-base)
      text: true,
      outlined: false,
      dark: false,
      tile: false,
      flat: false,
      raised: false,
      elevation: null,
      light: false,
      block: {
        desktop: false,
        mobile: true
      },
      floating: false,
      icon: false,
      showLoader: false,
      plain: false,
      rounded: true,
      size: {
        desktop: 'large', // 'x-small'|'small'|'default'|'large'|'x-large'
        mobile: 'default'
      }
    }
  }
}
