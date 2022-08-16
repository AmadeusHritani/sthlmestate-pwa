<template>
  <div
    class="deus-push-simple"
    :style="bg.active && bg.url ? `background-image: url('${bg.url}'); background-position: ${bg.position}; position: relative;` : ''"
    :class="bg.active && bg.url ? 'has-bg' : ''"
  >
    <v-card
      :dark="dark"
      :style="bg.active && bg.url ? 'height: 100%; position: absolute; top:0; left:0; width: 100%;' : ''"
      :color="bg.active && bg.url ? $vuetify.theme.dark || dark ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,.8)' : ''"
      class="ma-0 pa-3"
      tile
      flat
    >
      <v-container>
        <v-card
          class="ma-0 pa-0"
          color="transparent"
          tile
          flat
        >
          <v-row no-gutters class="align-stretch">
            <v-col cols="12" class="justify-center" :style="`${!dense ? 'min-height:300px; position: relative;' : 'position: relative;'}`">
              <v-card
                tile
                flat
                color="transparent"
                class="pa-3 mt-16 text-center"
                :style="`max-width: ${maxWidth}; margin: 0 auto;`"
              >
                <v-icon
                  v-if="showIcon"
                  :style="`font-size: ${$vuetify.breakpoint.mdAndDown ? icon.size.mobile : icon.size.desktop}`"
                  :color="$vuetify.theme.dark ? icon.color.dark : icon.color.light"
                  class="mb-5"
                >
                  mdi-{{ icon.mdi }}
                </v-icon>
                <h1 v-if="showHeading" :style="headingStyle" class="mb-1 text-uppercase">
                  {{ heading.label }}
                </h1>
                <div v-if="showText && text.value.length" class="pa-5 mb-5" :style="textStyle">
                  <p v-for="(p, i) in text.value" :key="i">
                    {{ p }}
                  </p>
                </div>
                <div
                  v-if="actions.show"
                  class="deus-hero__actions mt-5"
                >
                  <v-btn
                    v-if="actions.cta1.show"
                    :to="actions.cta1.to"
                    x-large
                    rounded
                  >
                    {{ actions.cta1.label }}
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'DeusPushSimple',
  props: {
    published: {
      type: Boolean,
      default: true
    },
    bg: {
      type: Object,
      default: () => ({
        active: false,
        url: null,
        position: 'bottom left'
      })
    },
    dark: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '800px'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showHeading: {
      type: Boolean,
      default: true
    },
    showText: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Object,
      default () {
        return {
          mdi: 'diamond-stone',
          color: {
            dark: 'var(--v-secondary-base)',
            light: '#111111'
          },
          size: {
            desktop: '8rem',
            mobile: '7rem'
          }
        }
      }
    },
    heading: {
      type: Object,
      default () {
        return {
          label: 'Get Personalized Assistance',
          uppercase: true,
          size: {
            desktop: '2.5rem',
            mobile: '2rem'
          }
        }
      }
    },
    text: {
      type: Object,
      default () {
        return {
          value: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores repellendus dolores illo non molestiae, minus itaque nam. Voluptate doloribus rerum nihil minima, praesentium ut. Nesciunt quo consequuntur voluptatibus voluptas eligendi?',
          color: {
            dark: 'var(--v-secondary-base)',
            light: '#111111'
          },
          border: 'thin',
          radius: '4px',
          bgcolor: {
            dark: 'var(--v-primary-base)',
            light: 'var(--v-secondary-base)'
          },
          size: {
            desktop: '1rem',
            mobile: '.8rem'
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
    }
  },
  computed: {
    textStyle () {
      const size = this.$vuetify.breakpoint.mdAndDown ? this.text.size.mobile : this.text.size.desktop
      const color = this.$vuetify.theme.dark ? this.text.color.dark : this.text.color.light
      const bgcolor = this.$vuetify.theme.dark ? this.text.bgcolor.dark : this.text.bgcolor.light
      return !this.dark ? `color: ${color};` : '' + `font-size: ${size}; border: ${this.text.border} solid currentColor; border-radius: ${this.text.radius}; background-color: ${bgcolor}; line-height:1.4;`
    },
    headingStyle () {
      const size = this.$vuetify.breakpoint.mdAndDown ? this.heading.size.mobile : this.heading.size.desktop
      const uppercase = this.heading.uppercase ? 'text-transform: uppercase !important;' : ''
      return `font-size: ${size}; line-height: 1;${uppercase}; font-weight: 500`
    }
  }
}
</script>

<style lang="scss">
.deus-push-simple {
  background-size: cover;
  &.has-bg {
    padding-top: 70px;
  }
}
</style>
