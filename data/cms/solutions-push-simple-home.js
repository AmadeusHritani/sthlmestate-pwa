export default {
  published: true,
  dark: false,
  dense: true,
  maxWidth: '1150px',
  showIcon: true,
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
    label: 'Hitta ditt hem hos oss',
    uppercase: true,
    size: {
      desktop: '2.5rem',
      mobile: '2rem'
    }
  },
  text: {
    value: [
      'Med ett nytt tänk och diversifierade portfölj av objekt och kunder kan vi hjälpa dig att hitta skräddarsydda lösningar anpassade efter just din situation.',
      'Vi förmedlar hem i hela Stockholm och hjälper dig oavsett om du ska köpa eller sälja din bostad. Vi jobbar undantagslöst med att utveckla våra tjänster, med målsättningen att du som kund ska få den bästa kundupplevelsen genom resan. Med fokus på detaljer och kvalite finns vi för dig för att hjälpa dig igenom den bästa affären!'
    ],
    color: {
      dark: 'var(--v-secondary-base)',
      light: '#111111'
    },
    border: '0',
    radius: '4px',
    bgcolor: {
      dark: 'transparent',
      light: 'transparent'
    },
    size: {
      desktop: '1.2rem',
      mobile: '.9rem'
    }
  },
  actions: {
    show: true,
    cta1: {
      show: true,
      label: 'Läs mer om oss',
      to: '/om-oss',
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
