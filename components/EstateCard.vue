<template>
  <nuxt-link
    :to="`${$txt(core.settings.navigator.top.items[1].slug)}/${estateObject && estateObject.id ? estateObject.id : ''}`"
    :exact="false"
    style="display:block; text-decoration: none !important;"
  >
    <v-card flat color="transparent" class="estate-card" tile>
      <!-- <span class="label">
        {{ estate.status.name }}
      </span> -->
      <v-img v-if="estateObject && estateObject.urlThumbnail" :src="estateObject.urlThumbnail" :height="height" />
      <v-img
        v-else
        :src="`/placeholder-home.png`"
        :height="height"
      />
      <v-list-item v-if="estateObject" three-line class="pa-3">
        <v-list-item-content>
          <div class="text-overline mb-2 date">
            {{ estateObject.city }}
          </div>
          <v-list-item-title class="street">
            {{ estateObject.streetAddress }}
          </v-list-item-title>
          <!-- <v-list-item-subtitle style="font-size: .7rem;" class="desc">
            {{ estateObject.shortSaleDescription }}
          </v-list-item-subtitle> -->
          <div class="details mt-2">
            <span class="detail-item rooms">
              <span class="value">{{ estateObject.numberOfRooms }}</span>
              <span class="inline-label">rum</span>
            </span>
            <span class="detail-item living">
              <span class="value">{{ estateObject.livingSpace }}</span>
              <span class="inline-label">kvm</span>
            </span>
            <!-- <span v-if="estateObject.monthlyFee" class="detail-item monthly-fee">
              <span class="inline-label">Monthly Fees:</span>
              <span class="value">{{ estateObject.monthlyFee }}</span>
            </span> -->
            <div v-if="estateObject.startingPrice || estateObject.monthlyFee" class="detail-item price">
              <div class="value">
                <money-format
                  v-if="estateObject.startingPrice"
                  :value="estateObject.startingPrice"
                  locale="sv-SE"
                  currency-code="SEK"
                  :subunits-value="false"
                  :hide-subunits="true"
                />
                <template v-if="estateObject.monthlyFee">
                  <money-format
                    :value="estateObject.monthlyFee"
                    locale="sv-SE"
                    currency-code="SEK"
                    :subunits-value="false"
                    :hide-subunits="true"
                  />/mån
                </template>
              </div>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </nuxt-link>
</template>

<script>
import MoneyFormat from 'vue-money-format'
import { mapActions } from 'vuex'
import core from '@/config/core'
export default {
  name: 'EstateCard',
  components: {
    'money-format': MoneyFormat
  },
  props: {
    estateObject: {
      required: true,
      type: Object
    },
    gridItemHeight: {
      type: Object,
      default () {
        return {
          desktop: 300,
          mobile: 250
        }
      }
    }
  },
  data () {
    return {
      core
    }
  },
  computed: {
    height () {
      return this.$vuetify.breakpoint.mdAndDown ? this.gridItemHeight.mobile : this.gridItemHeight.desktop
    }
  },
  created () {
    // eslint-disable-next-line no-console
    // console.log(this.estateObject.monthlyFee)
  },
  methods: {
    ...mapActions({
      updateCurrentEstate: 'updateCurrentEstate'
    }),
    goToEstate (estateObject) {
      this.updateCurrentEstate(estateObject)
      this.$router.push(`/fastigheter/${estateObject.id}`)
    }
  }
}
</script>
<style lang="scss">
.estate-card {
  margin: 20px 0;
  position: relative;
  font-family: Barlow, Arial !important;
  text-align: center;
  * {
    text-decoration: none !important;
    text-decoration-thickness: 0 !important;
  }
  .label {
    position: absolute;
    font-family: Barlow, Arial;
    font-size: .95rem;
    z-index: 1;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 10px;
    text-transform: uppercase;
    background-color: var(--v-secondary-base);
  }
  .date { line-height: 1; font-size: 1rem !important; font-weight: 400; }
  .street {
    font-family: Barlow, Arial;
    font-size: 1.5rem;
    font-weight: 400;
    text-transform: uppercase;
  }
  .desc { font-size: .95rem; }
  .details {
    .detail-item {
      font-size: 1.1rem;
      font-weight: 300;
      display: inline-block;
      margin: 2px 3px;
    }
    .rooms { line-height: 1; }
    .living { line-height: 1; }
    .monthly-fee { line-height: 1; }
    .price { line-height: 1; }
    .inline-label { line-height: 1; }
    .value { line-height: 1; }
  }
}
.money_format {
  display: inline-block;
}
</style>
