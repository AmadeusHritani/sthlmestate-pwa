<template>
  <div class="estate-details">
    <!-- Main Image element -->
    <estate-details-image
      :city="estate.baseInformation.objectAddress.city"
      :street="estate.baseInformation.objectAddress.streetAddress"
      :image-url="estate.mainImageUrl"
      @scrollto="client ? $skrollTo(target, root, $vuetify.breakpoint.smAndDown) : null, null, false"
    />
    <!-- Estate Details Section -->
    <section id="estate_details_wrapper" ref="estate-details-wrapper" class="estate-details-wrapper">
      <v-banner
        :color="$vuetify.theme.dark ? '#101010' : '#FAFAFA'"
        single-line
      >
        <div class="estate-features-wrapper">
          <div class=" mb-2 city">
            {{ estate.baseInformation.objectAddress.city }}
          </div>
          <h1 class="street mb-4">
            {{ estate.baseInformation.objectAddress.streetAddress }}
          </h1>
          <div class="estate-features">
            <span v-if="estate && estate.interior" class="estate-feature">
              <span class="label">Rum</span>
              <span>{{ estate.interior ? estate.interior.numberOfRooms : '?' }}</span>
            </span>
            <v-icon v-if="estate && estate.interior && estate.baseInformation && estate.baseInformation.livingSpace">
              mdi-circle-small
            </v-icon>
            <span v-if="estate && estate.baseInformation && estate.baseInformation.livingSpace" class="estate-feature">
              <span class="label">Boarea</span>
              <span>{{ estate.baseInformation.livingSpace }} kvm</span>
            </span>
            <v-icon v-if="estate && estate.baseInformation && estate.baseInformation.livingSpace && estate.floorAndElevator">
              mdi-circle-small
            </v-icon>
            <span v-if="estate.floorAndElevator" class="estate-feature">
              <span class="label">
                Våning
              </span>
              <span>{{ estate.floorAndElevator.floor }}/{{ estate.floorAndElevator.totalNumberFloors || estate.floorAndElevator.totalNumberOfFloors }}</span>
              <span v-if="estate.floorAndElevator && estate.floorAndElevator.elevator && estate.floorAndElevator.elevator.toLowerCase() === 'yes'">
                <v-icon small>
                  mdi-check
                </v-icon>
                <span>Hiss</span>
              </span>
            </span>
            <v-icon v-if="estate.floorAndElevator && estate.baseInformation.monthlyFee">
              mdi-circle-small
            </v-icon>
            <div v-if="estate.baseInformation.monthlyFee" class="estate-feature">
              <span class="label">
                Avgift
              </span>
              <money-format
                :value="estate.baseInformation.monthlyFee"
                locale="sv-SE"
                currency-code="SEK"
                :subunits-value="false"
                :hide-subunits="true"
                tag="span"
              />/mån
            </div>
            <v-icon v-if="estate.baseInformation && estate.baseInformation.monthlyFee && estate.price && estate.price.startingPrice">
              mdi-circle-small
            </v-icon>
            <div v-if="estate.price && estate.price.startingPrice" class="estate-feature">
              <span style="font-style: italic; opacity: .5;">
                Utgångspris
              </span>
              <money-format
                v-if="estate.price.startingPrice"
                :value="estate.price.startingPrice"
                locale="sv-SE"
                currency-code="SEK"
                :subunits-value="false"
                :hide-subunits="true"
              />
            </div>
          </div>
        </div>
      </v-banner>
      <v-container class="estate-details-container">
        <v-row justify="center">
          <v-col
            cols="12"
            md="8"
            lg="9"
          >
            <div class="estate-details-col-inner">
              <v-expansion-panels
                v-if="items && items.length"
                ref="estate_details_panels"
                v-model="panel"
                multiple
                accordion
                flat
                style="background-color: transparent;"
              >
                <v-expansion-panel
                  v-for="item in items"
                  :id="`estate_details_panel_${item.slug}`"
                  :key="item.id"
                  style="background-color: transparent;"
                >
                  <v-expansion-panel-header
                    :ref="`estate_details_panel_header_${item.slug}`"
                    :class="(item.slug === 'facts' && (!facts || !facts.length)) || (item.slug === 'operations' && !estate.operation.length) || (item.slug === 'documents' && (!estate.association || !estate.association.documents)) ? 'd-none' : ''"
                  >
                    {{ $t(`${item.label ? 'ui.' + item.label : 'Förening'}`) }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ************************ -->
                    <!-- ***** Tabs Targets ***** -->
                    <!-- ******** START ********* -->
                    <!-- Tab Target - DESCRIPTION -->
                    <div v-if="item.slug === 'description'" class="estate-description-wrapper">
                      <div class="estate-description-inner">
                        <p v-html="estate.description.shortSellingDescription.replace(/(?:\r\n|\r|\n)/g, '<br>')" />
                        <p v-if="item.slug === 'description'" v-html="estate.description.longSellingDescription.replace(/(?:\r\n|\r|\n)/g, '<br>')" />
                      </div>
                      <div v-if="!!rooms" class="desc-rooms">
                        <h2>
                          Rum
                          <hr style="opacity: .5; height:1px; border-style: dashed; border-width: 1px; border-bottom: none; border-left: none; border-right: none;" class="mt-1 mb-4">
                        </h2>
                        <div v-for="(room, r) in rooms" :key="r" class="room-item">
                          <h3>{{ room.heading }}</h3>
                          <p>{{ room.text }}</p>
                        </div>
                      </div>
                    </div>
                    <!-- end - DESCRIPTION -->
                    <!-- Tab Target - FACTS -->
                    <div v-if="item.slug === 'facts' && facts && facts.length" class="estate-facts">
                      <v-row
                        v-for="(fact, f) in facts.filter(f => !!f.value)"
                        :key="fact.slug"
                        dense
                        align="center"
                        justify="center"
                        :style="`background-color: ${f % 2 == 0 ? '#FFFFFF' : '#F1F1F1'}; ${!fact.value ? 'display: none;' : ''}`"
                      >
                        <v-col cols="7" md="2">
                          {{ fact.label }}
                        </v-col>
                        <v-col cols="5" md="2">
                          <span v-if="fact.tag !== 'money-format' && !!fact.value">
                            <span v-if="fact.prefix" class="prefix">
                              {{ fact.prefix }}
                            </span>
                            <span v-if="fact.value" class="value" style="font-weight: 600 !important;">
                              {{ fact.value }}
                            </span>
                            <span v-if="fact.suffix" class="suffix">
                              {{ fact.suffix }}
                            </span>
                          </span>
                          <span v-else>
                            <money-format
                              :value="fact.value"
                              locale="sv-SE"
                              currency-code="SEK"
                              :subunits-value="false"
                              :hide-subunits="true"
                              style="font-weight: 600;"
                            />
                          </span>
                        </v-col>
                        <v-col cols="12" md="8">
                          <div v-if="fact.text && fact.text.find(element => !!element.data)">
                            <component
                              :is="txtItem.tag"
                              v-for="(txtItem, txt) in fact.text"
                              :key="`${txtItem.slug}-${txt}`"
                              :class="txtItem.classes || null"
                            >
                              <span v-if="txtItem.label && txtItem.data" class="text-label">
                                {{ txtItem.label + ':&nbsp;' }}
                              </span>
                              <span v-if="txtItem.data" class="text-data">
                                {{ txtItem.data }}
                              </span>
                            </component>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!-- end - FACTS -->
                    <!-- Tab Target - ASSOCIATION -->
                    <div
                      v-if="item.slug === 'association' && estate.association"
                      class="estate-association"
                      v-html="estate.association.generalAboutAssociation.replace(/(?:\r\n|\r|\n)/g, '<br>')"
                    />
                    <!-- end - ASSOCIATION -->
                    <!-- Tab Target - OPERATIONS COST -->
                    <div v-if="item.slug === 'operations' && estate.operation" class="estate-operations">
                      <v-row
                        v-for="(op, o) in arrayfyOperations(estate.operation)"
                        :key="o"
                        :style="op.name === 'sum' ? 'border-top: thin dashed rgba(140,140,140,.5); padding-top: 10px; padding-top: 5px;' : op.name === 'personsInTheHousehold' ? 'padding-top: 10px; padding-top: 5px;' : 'padding-left: 5px;'"
                        dense
                      >
                        <v-col cols="6">
                          <v-icon v-if="op.name == 'personsInTheHousehold'" style="margin-right: 5px;">
                            mdi-information-outline
                          </v-icon>
                          {{ $t(`ui.${op.name}`) }}
                        </v-col>
                        <v-col cols="6">
                          <money-format
                            v-if="op.name !== 'personsInTheHousehold'"
                            :value="op.value"
                            locale="sv-SE"
                            currency-code="SEK"
                            :subunits-value="false"
                            :hide-subunits="true"
                            style="font-weight:600; font-size: 1.1rem"
                          />
                          <div v-else class="label">
                            {{ op.value }}
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!-- end - OPERATIONS COST -->
                    <!-- Tab Target - DOCUMENTS -->
                    <div v-if="item.slug === 'documents' && estate.association && estate.association.documents.length" class="estate-documents">
                      <v-row v-for="(document, d) in estate.association.documents" :key="d" dense align="center">
                        <v-col cols="10">
                          <v-btn :title="document.id" text>
                            {{ document.name }}
                          </v-btn>
                        </v-col>
                        <v-col cols="2" class="text-uppercase">
                          {{ document.extension.replace('.', '') }}
                        </v-col>
                      </v-row>
                    </div>
                    <!-- end - DOCUMENTS -->
                    <!-- Tab Target - VIEWINGS -->
                    <div v-if="item.slug === 'viewings'" class="estate-viewings">
                      <v-item-group
                        v-if="estate.viewings.length"
                        v-model="selected"
                      >
                        <v-row>
                          <v-col
                            v-for="(viewing, i) in viewings"
                            :key="i"
                            cols="12"
                            md="6"
                            align-self="center"
                          >
                            <v-item v-slot="{ active, toggle }">
                              <v-card
                                height="150"
                                class="pa-5"
                                outlined
                                @click="toggle"
                              >
                                <div style="text-align: center;">
                                  <v-btn
                                    icon
                                  >
                                    <v-icon large class="mb-2">
                                      {{ active ? 'mdi-calendar-clock' : 'mdi-calendar-clock' }}
                                    </v-icon>
                                  </v-btn>
                                  <div style="font-size: 1.5rem;" class="my-2">
                                    {{ viewing.date }}
                                  </div>
                                </div>
                                <div class="text-center" style="font-size:1.1rem;">
                                  {{ viewing.start }} - {{ viewing.end }}
                                </div>
                              </v-card>
                            </v-item>
                          </v-col>
                        </v-row>
                      </v-item-group>
                      <div v-else>
                        Inga planerade visningar.<br>
                        Ring 08-889360 för visning.
                      </div>
                      <!-- <v-row v-for="(viewing, v) in estate.viewings" :key="v" dense>
                        <v-col cols="6">
                          {{ $t(`ui.${viewing.name}`) }}
                        </v-col>
                        <v-col cols="6">
                          {{ viewing.value }}
                        </v-col>
                      </v-row> -->
                    </div>
                    <!-- end - VIEWINGS -->
                    <!-- ********* END ********** -->
                    <!-- ***** Tabs Targets ***** -->
                    <!-- ************************ -->
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <estate-interest-form />
          </v-col>
          <v-col
            cols="12"
            md="4"
            lg="3"
          >
            <div class="nav-footer">
              <v-btn
                class="my-2"
                block
                outlined
                large
                @click.prevent="$router.push(localePath('/fastigheter'))"
              >
                <v-icon left dark>
                  mdi-backburger
                </v-icon>
                {{ $t('ui.back') }}
              </v-btn>
            </div>
            <v-row>
              <v-col cols="12">
                <div class="broker-image-wrapper">
                  <img
                    :src="estate.broker.userId === 'HAN1A29280EBA944CEF8C87E156DE6C7BBB' ? '/gabriel-portrait.jpg' : estate.broker.image.cdnReferences[0]"
                    :alt="estate.broker.userName"
                  >
                </div>
              </v-col>
              <v-col cols="12">
                <div class="pa-3">
                  <div class="broker-name">
                    {{ estate.broker.userName }}
                  </div>
                  <div class="broker-title">
                    {{ estate.broker.title }}
                  </div>
                  <div class="broker-info">
                    <a :href="`tel:${estate.broker.cellPhone}`">{{ estate.broker.cellPhone }}</a><br>
                    <a :href="`mailto:${estate.broker.emailAddress}`">{{ estate.broker.emailAddress }}</a>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <div class="map">
        <iframe
          width="100%"
          :height="$vuetify.breakpoint.mdAndDown ? 450 : 550"
          style="border:0"
          :style="$vuetify.theme.dark ? 'filter: invert(90%) grayscale()' : 'filter: grayscale()'"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          :src="estateMapSrc"
        />
      </div>
    </section>
    <v-row no-gutters>
      <v-col
        v-for="image in [...estate.images].slice(0, 4)"
        :key="image.imageId"
        col="12"
        md="6"
      >
        <v-img
          :src="`/${image.cdnReferences[0]}`"
          lazy-src="/estate-image-placeholder.jpg"
          aspect-ratio="1.4"
          cover
          class="ma-2"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <div class="actions">
      <v-btn outlined x-large @click="showImages = !showImages">
        {{ showImages ? $t('ui.show-less') : $t('ui.show-all') }}
      </v-btn>
    </div>
    <v-row v-if="showImages" no-gutters>
      <v-col
        v-for="(image) in estate.images"
        :key="image.imageId"
        col="12"
        :md="6"
      >
        <v-img
          :src="`/${image.cdnReferences[0]}`"
          lazy-src="/estate-image-placeholder.jpg"
          aspect-ratio="1.4"
          cover
          class="ma-2"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import MoneyFormat from 'vue-money-format'
import { mapState, mapActions } from 'vuex'
import EstateDetailsImage from './EstateDetailsImage.vue'
import EstateInterestForm from './EstateInterestForm.vue'
import { getEstateData } from '@/functions/api'
import facts from '@/abstract/facts'
import { cacheEstateImages } from '@/images'

export default {
  name: 'EstateDetails',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'money-format': MoneyFormat,
    EstateDetailsImage,
    EstateInterestForm
  },
  props: {
    estate: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      weekdays: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
      months: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
      selected: [],
      facts,
      panel: [0],
      options: {
        duration: 500,
        offset: 0,
        easing: 'easeInOutCubic'
      },
      showImages: false,
      items: [
        {
          id: 1,
          slug: 'description',
          label: 'description',
          active: true,
          content: [
            {
              id: 1,
              name: 'short-description',
              label: null,
              tag: 'p',
              classes: ['short-desc'],
              data: {
                type: String,
                value: ''
              }
            }, {
              id: 2,
              name: 'long-description',
              label: null,
              tag: 'p',
              classes: ['long-desc'],
              data: {
                type: String,
                value: ''
              }
            }
          ]
        }, {
          id: 2,
          slug: 'facts',
          label: 'facts',
          active: false,
          content: [
            {
              id: 1,
              name: 'rooms',
              label: 'Rum',
              tag: 'span',
              classes: ['horizontal-list-item', 'rooms'],
              data: {
                type: String,
                value: ''
              }
            }
          ]
        }, {
          id: 3,
          slug: 'association',
          label: 'association',
          active: false
        }, {
          id: 4,
          slug: 'operations',
          label: 'operation-cost',
          active: false
        }, {
          id: 5,
          slug: 'documents',
          label: 'documents',
          active: false
        }, {
          id: 6,
          slug: 'viewings',
          label: 'viewings',
          active: false
        }
      ]
    }
  },
  computed: {
    estateMapSrc () {
      const mapsApi = 'https://www.google.com/maps/embed/v1/place'
      const apiKey = process.env.GOOGLE_MAPS_API_KEY
      const addressObj = this.estate.baseInformation.objectAddress
      const street = addressObj.streetAddress.replace(' ', '+')
      const zip = addressObj.zipCode
      const coordinates = `${addressObj.coordinate.latitud},${addressObj.coordinate.longitud}`
      const q = `${street}+${zip}`
      const center = coordinates
      const src = `${mapsApi}?key=${apiKey}&q=${q}&center=${center}`
      return src
    },
    viewings () {
      const viewings = []
      if (this.estate.viewings && this.estate.viewings.length) {
        const v = this.estate.viewings
        for (let i = 0; i < v.length; i++) {
          const s = v[i].startTime
          const sd = new Date(s)
          const e = v[i].endTime
          const ed = new Date(e)
          viewings[i] = {
            date: `${this.getWeekDay(s)}, ${sd.getDate()} ${this.getMonthName(s)}`,
            start: `Kl ${sd.getHours().toString().padStart(2, '0')}:${sd.getMinutes().toString().padStart(2, '0')}`,
            end: `Kl ${ed.getHours().toString().padStart(2, '0')}:${ed.getMinutes().toString().padStart(2, '0')}`,
            source: this.estate.viewings[i]
          }
        }
      }
      return viewings
    },
    client () {
      return !process.server
    },
    rooms () {
      return this.estate && this.estate.interior ? this.estate.interior.rooms : null
    },
    target () {
      return process.env.NODE_ENV === 'production'
        ? this.elements.target.prod.$el
        : this.elements.target.dev.$el
    },
    root () {
      return process.env.NODE_ENV === 'production'
        ? this.elements.root.prod.$el
        : this.elements.root.dev.$el
    },
    elements () {
      return {
        target: {
          dev: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[2] &&
          !!this.$nuxt.$children[2].$refs && !!this.$nuxt.$children[2].$refs['deus-application']
            ? this.$nuxt.$root.$children[2].$children[0].$children[0].$children[0].$children[0].$children[0]
            : this.$nuxt.$root.$children[1].$children[0].$children[0].$children[0].$children[0].$children[0],

          prod: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[1] &&
          !!this.$nuxt.$children[1].$refs && this.$nuxt.$children[1].$refs['deus-application']
            ? this.$nuxt.$children[1].$refs['deus-application'].$children[0].$children[0].$children[0].$children[0]
            : this.$nuxt.$children[2].$refs['deus-application'].$children[0].$children[0].$children[0].$children[0]
        },
        root: {
          dev: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[2] &&
          !!this.$nuxt.$children[2].$refs && !!this.$nuxt.$children[2].$refs['deus-application']
            ? this.$nuxt.$children[2].$refs['deus-application']
            : this.$nuxt.$children[1].$refs['deus-application'],

          prod: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[1] &&
          !!this.$nuxt.$children[1].$refs && this.$nuxt.$children[1].$refs['deus-application']
            ? this.$nuxt.$children[1].$refs['deus-application']
            : this.$nuxt.$children[2].$refs['deus-application']
        }
      }
    }
  },
  watch: {
    rooms (rooms) {
      if (rooms && rooms.length) {
        this.facts = this.updateFacts(this.estate, this.facts)
      }
    }
  },
  created () {
    // this.facts = this.updateFacts(this.estate, this.facts)
  },
  mounted () {
    this.facts = this.updateFacts(this.estate, this.facts)
  },
  methods: {
    addZero (val) {
      val = parseInt(val)
      if (val && val < 10) {
        return `0${val}`
      }
      return '00'
    },
    getWeekDay (rawDate) {
      const d = new Date(rawDate)
      return this.weekdays[d.getDay()]
    },
    getMonthName (rawDate) {
      const d = new Date(rawDate)
      return this.months[d.getMonth()]
    },
    goto (refName) {
      const mobile = this.$vuetify.breakpoint.mdAndDown
      const element = this.$refs[refName]
      const top = element.offsetTop
      window.scrollTo(0, top)
    },
    updateFacts (estate, facts) { // Return Updated Facts
      // console.log(estate)
      if (estate && facts && facts.length) {
        for (let i = 0; i < facts.length; i++) {
          const fact = facts[i]
          // console.log(fact.slug, estate[fact.rootObject][fact.slug])
          fact.value = estate[fact.rootObject][fact.slug] || undefined
          if (fact.text && fact.text.length) {
            const text = fact.text
            for (let t = 0; t < fact.text.length; t++) {
              if (fact.text[t].rootObject) {
                fact.text[t].data = estate[fact.text[t].rootObject][fact.text[t].slug]
              }
              if (text[t].slug === 'rooms-headings-string') {
                let string = ''
                if (this.rooms && this.rooms.length) {
                  this.rooms.map((room, r) => {
                    // console.log(room)
                    string += `${room.heading}${r === this.rooms.length - 1 ? '' : ', '}`
                    return null
                  })
                }
                facts[i].text[t].data = string
              }
            }
          }
        }
      }
      return facts
    },
    arrayfyOperations (ops) {
      const opsArray = []
      for (const [key, value] of Object.entries(ops)) {
        if (!!value && value !== 0) {
          opsArray.push({
            name: key,
            value
          })
        }
      }
      return opsArray
    },
    activateItem (itemId) {
      let items = this.makeAllFalse(this.items)
      this.items = [...items]
      items = items.map((i) => {
        if (i.id === itemId) {
          i.active = true
        }
        return i
      })
      this.items = [...items]
    },
    makeAllFalse (items) {
      return items.map((items) => {
        return {
          ...items,
          active: false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 0 !important;
  flex: 1 1 auto;
  max-width: 100%;
}
.v-banner__wrapper {
  border: none !important;
}
.theme--light.v-banner .v-banner__wrapper {
  background-color: #FFFFFF !important;
  // padding: 20px 10px 5px 10px;
}
.theme--dark.v-banner .v-banner__wrapper {
  background-color: #0c0c0c !important;
  // padding: 20px 10px 5px 10px;
}

// .theme--light.v-banner {
//   box-shadow: 0 3px 7px rgba(0,0,0,.1) !important;
// }

// .theme--dark.v-banner {
//   // padding: 30px 15px 30px 15px;
//   box-shadow: 0 3px 7px rgba(0,0,0,.9) !important;
// }

.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: auto !important;
  padding-left: 0 !important;
}
.v-expansion-panel-header {
  padding-left: 0 !important;
  align-items: center;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  font-size: 0.9375rem;
  line-height: 1;
  min-height: 48px;
  outline: none;
  position: relative;
  transition: 0.3s all cubic-bezier(0.25, 0.8, 0.5, 1);
  width: 100%;
}
.text-data, .text-label {
  text-transform: capitalize;
}
.text-label {
  font-weight: 300;
}
.prefix, .suffix {
  font-weight: 300;
}
.fact-comments {
  font-style: italic !important;
  font-size: .75rem;
}
.estate-facts {
  color: #333333;
}
.estate-facts,
.estate-description-wrapper,
.estate-association,
.estate-operations,
.estate-documents,
.estate-viewings {
  padding: 20px 0 30px 0;
}
.v-expansion-panel-header {
  font-size: 1.4rem !important;
  padding: 15.5px 24px 15.5px 0 !important;
  border-bottom: solid thin #999999;
}
// .v-expansion-panel--active > .v-expansion-panel-header {
//   border: none;
// }
.estate-description-inner {
  margin: 10px 0;
}
.actions {
  text-align: center;
  padding: 30px;
}
.map {
  margin: 15px 0 25px 0;
  border-bottom: thin solid var(--v-primary-base);
  border-top: thin solid var(--v-primary-base);
}
.active-item {
  display: none;
  transition: all .3s ease;
  .v-card {
    padding: 30px;
  }
}
.estate-description {
  font-family: $heading-font-family;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 1.5;
}
.nav-items {
  .theme--light.v-btn.v-btn--disabled.v-btn--has-bg,
  .theme--light.v-btn.v-btn--disabled {
    color: #FFFFFF !important;
    background-color: var(--v-info-base) !important;
  }
  .theme--darlk.v-btn.v-btn--disabled.v-btn--has-bg,
  .theme--dark.v-btn.v-btn--disabled {
    color: #FFFFFF !important;
    background-color: var(--v-info-lighten1) !important;
  }
}
.estate-features-wrapper {
  text-align: center;
  margin-bottom: 20px;
  .estate-feature {
    margin: 5px 4px;
    display: inline-block;
    .money_format {
      display: inline-block;
    }
    .label {
      font-weight: 300;
    }
    span {
      // display: inline-block;
      margin: 0;
    }
  }
}
.estate-features-wrapper span {
  display: inline-block;
  margin: 0 2px;
}
.estate-features {
  font-family: $heading-font-family;
}
.broker-name {
  font-family: $heading-font-family;
  font-size: 1.5rem;
  text-transform: uppercase;
}
.broker-title {
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
}

.broker-info {
  padding: 15px 0;
  font-size: 1rem;
}

.broker-image-wrapper img {
  width: 100%;
  height:auto;
}

.broker-image-wrapper {
  margin: 20px 0;
}

.estate-details-wrapper {
  min-height: auto;
  background-color: #FFFFFF;
}
.v-application.theme--light .estate-details-wrapper {
  background-color: #FFFFFF;
}
.v-application.theme--dark .estate-details-wrapper {
  background-color: #040404;
}

.estate-details-container {
  padding-top: 40px;
  background-color: transparent
}

.main-image-wrapper {
  background-position: center center;
  background-size: cover;
  position: absolute !important;
  top: -65px;
  left: 0;
  width: 100%;
  height: 100vh;
}
@media screen and (max-width: 500px) {
  .main-image-wrapper {
    top: -56px;
  }
}

.main-image-overlay {
  // z-index: 10;
  position: absolute;
  top: -65px;
  left: 0;
  width: 100%;
  height: 100vh;

}
.city { line-height: 1.5; font-size: 1.5rem !important; letter-spacing: 2px; font-weight: 300; padding: 25px 0 5px 0; }
.street {
  font-family: Barlow, Arial;
  text-transform: uppercase;
  font-size: 2.5rem;
  font-weight: 300;
  text-transform: uppercase;
}
@media screen and (max-width: 500px) {
  .street {
    font-size: 2rem;
  }
  .estate-features {
    display: block;
    & > .v-icon {
      display: none;
    }
  }
  .estate-feature {
    display: block !important;
    // width: 40% !important;
  }

  .estate-details-wrapper .v-banner {
    top: 56px !important;
    z-index: 10 !important;
  }
}
</style>
