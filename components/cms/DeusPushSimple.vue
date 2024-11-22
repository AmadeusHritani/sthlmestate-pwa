<template>
  <div
    class="deus-push-simple"
    :style="bg.active && bg.url ? `background-image: url('${bg.url}'); background-position: ${bg.position}; position: relative;` : ''"
    :class="bg.active && bg.url ? 'has-bg' : ''"
  >
    <v-card
      :dark="dark"
      :style="bg.active && bg.url ? 'height: 100%; position: absolute; top:0; left:0; width: 100%;' : ''"
      :color="bg.active && bg.url ? $vuetify.theme.dark || dark ? 'rgba(0,0,0,.87)' : 'transparent' : 'transparent'"
      class="ma-0"
      tile
      flat
    >
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
              class="px-2 text-center"
              :style="`max-width: ${maxWidth}; margin: 0 auto; height: 100%;`"
            >
              <v-icon
                v-if="showIcon"
                :style="`font-size: ${$vuetify.breakpoint.mdAndDown ? icon.size.mobile : icon.size.desktop}`"
                :color="$vuetify.theme.dark ? icon.color.dark : icon.color.light"
                class="mb-5"
              >
                mdi-{{ icon.mdi }}
              </v-icon>
              <v-row no-gutters align="center" justify="center">
                <v-col cols="12" md="6" style="position:relative;">
                  <component :is="heading.tag ? heading.tag : 'h2'" v-if="showHeading" class="heading-label">
                    {{ heading.label }}
                  </component>
                </v-col>
              </v-row>
              <v-row v-if="showText && text.value.length" no-gutters align="center" justify="center">
                <v-col :style="textStyle.wrapperStyle" cols="12" md="8" lg="7">
                  <div class="mt-4 pa-2">
                    <p v-for="(p, i) in text.value" :key="i" :style="textStyle.pStyle">
                      {{ p }}
                    </p>
                  </div>
                </v-col>
              </v-row>
              <div
                v-if="actions.show"
                class="mt-5"
              >
                <v-btn
                  v-if="actions.cta1.show"
                  :rounded="actions.cta1.rounded"
                  :outlined="actions.cta1.outlined"
                  :text="actions.cta1.text"
                  :raised="actions.cta1.raised"
                  :to="actions.cta1.to"
                  x-large
                >
                  {{ actions.cta1.label }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
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
    headingWidth: {
      type: Object,
      default: () => {
        return {
          desktop: '250px',
          mobile: '250px'
        }
      }
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
          tag: 'h2',
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
            tile: true,
            raised: false,
            elevation: 0,
            light: false,
            block: {
              desktop: false,
              mobile: true
            },
            floating: false,
            icon: false,
            showLoader: true,
            plain: false,
            rounded: false,
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
      const size = this.$vuetify.breakpoint.smAndDown ? `font-size: ${this.text.size.mobile};` : `font-size: ${this.text.size.desktop};`
      const color = this.$vuetify.theme.dark || this.dark ? `color: ${this.text.color.dark};` : `color: ${this.text.color.light};`
      const border = `border: ${this.text.border} solid currentColor;`
      const bRadius = `border-radius: ${this.text.radius};`
      const bgcolor = this.$vuetify.theme.dark || this.dark ? `background-color: ${this.text.bgcolor.dark};` : `background-color: ${this.text.bgcolor.light};`
      const wrapperStyle = `${size} ${color} ${border} ${bRadius} ${bgcolor}`
      const pStyle = `${size} ${color} line-height:1.4 !important;`
      return { wrapperStyle, pStyle }
    },
    headingStyle () {
      const size = `font-size: ${this.$vuetify.breakpoint.smAndDown ? this.heading.size.mobile : this.heading.size.desktop};`
      const uppercase = this.heading.uppercase ? 'text-transform: uppercase !important;' : ''
      return `${size}${uppercase};`
    }
  }
}
</script>

<style lang="scss">
.heading-label {
  font-family: Aleo, Serif;
  font-weight: 400 !important;
  position: relative;
  //min-height: 70px;
  line-height: 1;
}
.heading-lines {
  // opacity: .3;
  z-index: 0;
  display: block;
  position: absolute;
  width: 100%;
  height: 1px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  border-bottom: thin dashed var(--v-primary-base);
}
.heading-bg {
  // border-left: thin dashed var(--v-primary-base);
  // border-right: thin dashed var(--v-primary-base);
  z-index: 1;
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  span {
    display: block;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
// .heading-label {
//   position: relative;
//   min-height: 70px;
// }
// .heading-lines {
//   z-index: 0;
//   display: block;
//   position: absolute;
//   width: 100%;
//   height: 1px;
//   top: 50%;
//   transform: translateY(-50%);
//   left: 0;
//   border-bottom: thin solid var(--v-primary-base);
// }
// .heading-bg {
//   border-left: thin dashed var(--v-primary-base);
//   border-right: thin dashed var(--v-primary-base);
//   background-color: #FFFFFF;
//   z-index: 1;
//   display: inline-block;
//   position: absolute;
//   width: 250px;
//   height: 100%;
//   top: 0;
//   left: 50%;
//   transform: translateX(-50%);
//   span {
//     display: block;
//     position: absolute;
//     width: 100%;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     font-weight: 100;
//   }
// }
.deus-push-simple {
  background-size: cover;
  padding: 3rem 0;
  &.has-bg {
    padding-top: 70px;
  }
}
.theme--light.v-application {
    .deus-push-simple {
      background-color: #FFFFFF;
    }
}
.theme--dark.v-application {
    .deus-push-simple {
      background-color: #1f1f1f;
    }
}
@media screen and (max-width: 550px) {
  .deus-push-simple {
    padding: 3rem 0;
  }
  .heading-label {
    min-height: auto;
  }
  .heading-bg {
    min-width: 100px;
    span {
      font-weight: 100;
    }
  }
}
</style>
