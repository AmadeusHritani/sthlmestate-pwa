export default {
  published: true,
  dark: true,
  dense: true,
  maxWidth: '800px',
  showIcon: false,
  showHeading: true,
  showText: true,
  icon: {
    mdi: 'diamond-stone',
    color: {
      dark: 'var(--v-secondary-base)',
      light: '#111111'
    },
    size: {
      desktop: '8rem',
      mobile: '7rem'
    }
  },
  heading: {
    label: 'Våra bostäder',
    uppercase: true,
    size: {
      desktop: '2.5rem',
      mobile: '2rem'
    }
  },
  text: {
    value: [
      'Stockholms innerstad rymmer några av landets finaste och mest attraktiva bostäder. Hos oss hittar du de bästa objekten i Stockholms innerstad samt övriga områden.'
    ],
    color: {
      dark: '#999999',
      light: '#333333'
    },
    border: '0',
    radius: '4px',
    bgcolor: {
      dark: 'transparent',
      light: 'transparent'
    },
    size: {
      desktop: '1.1rem',
      mobile: '.8rem'
    }
  },
  actions: {
    show: false,
    cta1: {
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
