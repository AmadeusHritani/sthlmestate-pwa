<template>
  <div class="deus-hero">
    {{ /* eslint-disable-next-line vue/html-self-closing */ }}
    <div
      :style="wrapperStyles"
      :class="wrapperClasses"
    ></div>
    <div
      :style="contentWrapperStyle"
      class="deus-hero__content"
    >
      <div
        :style="symbolWrapperStyle"
        class="deus-hero__symbol"
      >
        <v-icon
          v-if="symbol.type === 'icon'"
          :style="iconStyle"
          :color="symbol.icon.color || '#ffffff'"
        >
          {{ symbol.icon.mdi }}
        </v-icon>
        <img
          v-else
          :src="$vuetify.breakpoint.smAndDown ? symbol.image.src.mobile : symbol.image.src.desktop"
          :title="heading.text"
          :style="imageStyle"
        >
      </div>
      <div class="deus-hero__text">
        <component
          :is="heading.tag"
          :style="headingStyle"
          class="deus-hero__heading"
        >
          {{ heading.text }}
        </component>
        <component
          :is="subheading.tag"
          v-if="subheading.text"
          :style="subheadingStyle"
          class="deus-hero__subheading"
        >
          {{ subheading.text }}
        </component>
        <component
          :is="details.tag"
          :style="detailsStyle"
          class="deus-hero__details"
        >
          {{ details.text }}
        </component>
        <div
          v-if="actions.show"
          class="deus-hero__actions"
        >
          <v-btn
            :to="actions.cta1.to"
            :color="actions.cta1.color"
            :rounded="actions.cta1.rounded"
            :text="actions.cta1.text"
            :outlined="actions.cta1.outlined"
            :tile="actions.cta1.tile"
            :raised="actions.cta1.raised"
            :dark="actions.cta1.dark"
            x-large
          >
            {{ actions.cta1.label }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeusHero',
  props: {
    settings: {
      type: Object,
      default () {
        return {
          height: 'calc(100vh - 65px)',
          width: 'full' // full|boxed
        }
      }
    },
    background: {
      type: Object,
      default () {
        return {
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
        }
      }
    },
    layout: {
      type: Object,
      default () {
        return {
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
        }
      }
    },
    symbol: {
      type: Object,
      default () {
        return {
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
        }
      }
    },
    heading: {
      type: Object,
      default () {
        return {
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
        }
      }
    },
    subheading: {
      type: Object,
      default () {
        return {
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
        }
      }
    },
    details: {
      type: Object,
      default () {
        return {
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
        }
      }
    },
    actions: {
      type: Object,
      default () {
        return {
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
    }
  },
  computed: {
    imageStyle () {
      const width = (this.symbol)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.symbol.image.width.mobile
          : this.symbol.image.width.desktop
        : ''
      let styles = width ? `width: ${width};` : ''

      const maxWidth = (this.symbol)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.symbol.image.maxWidth.mobile
          : this.symbol.image.maxWidth.desktop
        : ''
      styles += maxWidth ? `max-width: ${maxWidth};` : ''

      const height = (this.symbol)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.symbol.image.height.mobile
          : this.symbol.image.height.desktop
        : ''
      styles += height ? `height: ${height};` : ''

      return styles
    },
    contentWrapperStyle () {
      return ''
    },
    symbolWrapperStyle () {
      return ''
    },
    headingStyle () {
      const size = (this.heading)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.heading.size.mobile
          : this.heading.size.desktop
        : ''
      let styles = size ? `font-size: ${size};` : ''

      const paddingY = (this.symbol)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.heading.paddingY.mobile
          : this.heading.paddingY.desktop
        : ''
      styles += paddingY ? `padding: ${paddingY} 0;` : ''
      if (this.heading && this.heading.color) {
        styles += `color: ${this.heading.color};`
      }
      if (this.heading && this.heading.weight) {
        styles += `font-weight: ${this.heading.weight};`
      }
      if (this.heading && this.heading.font) {
        styles += `font-family: ${this.heading.font};`
      }
      return styles
    },
    subheadingStyle () {
      const size = (this.subheading)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.subheading.size.mobile
          : this.subheading.size.desktop
        : ''
      let styles = size ? `font-size: ${size};` : ''

      const paddingY = (this.symbol)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.subheading.paddingY.mobile
          : this.subheading.paddingY.desktop
        : ''
      styles += paddingY ? `padding: ${paddingY} 0;` : ''
      if (this.subheading && this.subheading.color) {
        styles += `color: ${this.subheading.color};`
      }
      if (this.subheading && this.subheading.weight) {
        styles += `font-weight: ${this.subheading.weight};`
      }
      if (this.subheading && this.subheading.font) {
        styles += `font-family: ${this.subheading.font};`
      }
      return styles
    },
    detailsStyle () {
      const size = (this.details)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.details.size.mobile
          : this.details.size.desktop
        : ''
      let styles = size ? `font-size: ${size};` : ''

      const paddingY = (this.symbol)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.details.paddingY.mobile
          : this.details.paddingY.desktop
        : ''
      styles += paddingY ? `padding: ${paddingY} 0;` : ''
      if (this.details && this.details.color) {
        styles += `color: ${this.details.color};`
      }
      if (this.details && this.details.weight) {
        styles += `font-weight: ${this.details.weight};`
      }
      if (this.details && this.details.font) {
        styles += `font-family: ${this.details.font};`
      }
      return styles
    },
    iconStyle () {
      const size = (this.symbol &&
        this.symbol.icon.size)
        ? this.$vuetify.breakpoint.smAndDown
          ? this.symbol.icon.size.mobile
          : this.symbol.icon.size.desktop
        : ''
      let styles = size ? `font-size: ${size};` : ''
      if (this.symbol && this.symbol.color) {
        styles += `color: ${this.symbol.color});`
      }
      return styles
    },
    wrapperStyles () {
      let styles = this.settings.height ? `height: ${this.settings.height === 'full-height' ? 'calc(100vh - 65px)' : this.settings.height};` : ''
      if (this.background.hasImage && this.background.src.desktop) {
        const bg = this.$vuetify.breakpoint.smAndDown ? this.background.src.mobile : this.background.src.desktop
        styles += `background-image: url(${bg});`
      }
      if (this.background.bgcolor) {
        styles += `background-color: ${this.background.bgcolor};`
      }
      if (this.background.position) {
        styles += `background-position: ${this.background.position};`
      }
      if (this.background.size) {
        styles += `background-size: ${this.background.size};`
      }
      if (this.background.mono) {
        styles += 'filter: grayscale(100);'
      }
      return styles
    },
    wrapperClasses () {
      let classes = 'deus-hero__wrapper'
      if (this.settings.width === 'boxed') {
        classes += ' container'
      }
      return classes
    }
  }
}
</script>

<style lang="scss">
// header.theme--light.v-app-bar.v-toolbar.v-sheet.v-app-bar--fixed,
// header.theme--dark.v-app-bar.v-toolbar.v-sheet.v-app-bar--fixed {
//   background-color: transparent !important;
// }
.deus-hero {
  position: relative;
  * {
    line-height: 1;
  }
  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    * {
      transition: all .3s ease-in-out;
    }
  }
  &__content {
    transition: all .3s ease-in-out;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 650px;
    padding: 20px;
    text-align: center;
    color: #ffffff;
    background-color: rgba(0,0,0,.6);
    text-transform: uppercase;
    // border: 2px solid #ffffff;
    // border-radius: 10px;
    * {
      transition: all .3s ease-in-out;
    }
  }
  &__symbol {
    font-size: 3rem;
  }
  &__text {
    position: relative;
  }
  &__heading {
    font-size: 2rem;
    padding: 10px 0;
  }
  &__subheading {
    font-size: 1.8rem;
    padding: 10px 0
  }
  &__details {
    font-size: .8rem;
    padding: 10px 0;
    line-height: 1.2;
  }
  &__actions {
    margin-top: 10px;
    // .theme--light.v-btn {
    //   color: unset;
    // }
  }
}
</style>
