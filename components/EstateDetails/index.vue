<template>
  <div class="estate-details">
    <!-- Main Image element -->
    <estate-details-image
      :city="estate.baseInformation.objectAddress.city"
      :street="estate.baseInformation.objectAddress.streetAddress"
      :image-url="mainImage"
      @scrollto="client ? $skrollTo(refs['estate-details-wrapper'].$el, root, $vuetify.breakpoint.smAndDown, null, null,) : false"
      @scroll-to-location="client ? $skrollTo(refs['estate_location'], root, $vuetify.breakpoint.smAndDown, -65, null,) : false"
      @scroll-to-floorplan="client ? $skrollTo(refs['estate_gallery'].$refs['estate_floorplan'], root, $vuetify.breakpoint.smAndDown, -85, null,) : false"
      @scroll-to-photos="client ? $skrollTo(refs['estate_gallery'].$refs['estate_photos'], root, $vuetify.breakpoint.smAndDown, null, null,) : false"
    />
    <!-- Estate Details Section -->
    <v-card id="estate_details_wrapper" ref="estate-details-wrapper" class="estate-details-wrapper" elevation="5">
      <v-banner
        single-line
      >
        <div class="estate-features-wrapper">
          <div class="city">
            {{ estate.baseInformation.objectAddress.city }}
          </div>
          <h1 class="street mb-2">
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
            <v-icon v-if="estate && estate.baseInformation && estate.baseInformation.livingSpace && estate.floorAndElevator && estate.floorAndElevator.totalNumberFloors">
              mdi-circle-small
            </v-icon>
            <span v-if="estate.floorAndElevator && estate.floorAndElevator.totalNumberFloors" class="estate-feature">
              <span class="label">
                Våning
              </span>
              <span>{{ estate.floorAndElevator.floor }}/{{ estate.floorAndElevator.totalNumberFloors || estate.floorAndElevator.totalNumberOfFloors }}</span>
            </span>
            <v-icon v-if="estate.floorAndElevator && estate.floorAndElevator.totalNumberFloors && estate.baseInformation.monthlyFee">
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
            <v-icon v-if="estate.baseInformation && (estate.baseInformation.monthlyFee || (estate.floorAndElevator && estate.floorAndElevator.totalNumberFloors) || (estate && estate.baseInformation && estate.baseInformation.livingSpace)) && estate.price && estate.price.startingPrice">
              mdi-circle-small
            </v-icon>
            <div v-if="estate.price && estate.price.startingPrice" class="estate-feature">
              <span class="label">
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
        <v-row>
          <v-col
            cols="12"
            md="9"
          >
            <div class="estate-details-col-inner">
              <v-expansion-panels
                v-if="estatePanel && estatePanel.length"
                ref="estate_details_panels"
                v-model="panel"
                multiple
                flat
                style="background-color: transparent;"
              >
                <v-expansion-panel
                  v-for="estatePanelItem in estatePanel"
                  :id="`estate_details_panel_${estatePanelItem.slug}`"
                  :key="`${estatePanelItem.slug}_${estatePanelItem.id}`"
                  style="background-color: transparent;"
                >
                  <v-expansion-panel-header
                    :ref="`estate_details_panel_header_${estatePanelItem.slug}`"
                    :class="(estatePanelItem.slug === 'description' && (!estate.description.shortSellingDescription && !estate.description.longSellingDescription)) || (estatePanelItem.slug === 'bidding' && (estate.internetSettings.bidSetting === 'DontShowBidding' || !bids || !bids.length)) || (estatePanelItem.slug === 'facts' && (!facts || !facts.length)) || (estatePanelItem.slug === 'operations' && (!operations || !operations.length)) || (estatePanelItem.slug === 'documents' && (!estate.association || !estate.association.documents.length)) || (estatePanelItem.slug === 'association' && (!estate.association || !estate.association.generalAboutAssociation)) ? 'd-none' : ''"
                    :style="estatePanelItem.slug === 'viewings' ? 'border: none;' : ''"
                  >
                    <template
                      v-if="estatePanelItem.slug === 'bidding'"
                      #default="{ open }"
                    >
                      <v-row no-gutters>
                        <v-col cols="7" sm="6">
                          {{ $t(`${estatePanelItem.label ? 'ui.' + estatePanelItem.label : 'Förening'}`) }}
                        </v-col>
                        <v-col
                          cols="5"
                          sm="6"
                          class="text--secondary"
                        >
                          <v-fade-transition hide-on-leave>
                            <span
                              v-if="open"
                              key="0"
                              style="font-weight: 300; font-size: smaller;"
                            >
                              {{ estate.internetSettings.bidSetting === 'ShowHighestBid' ? 'Högsta Budgivare' : estate.internetSettings.bidSetting === 'ShowBidding' ? '' : estate.internetSettings.bidSetting === 'ShowBiddhistory' ? 'Aktuella bud' : '' }}
                            </span>
                            <span
                              v-else
                              key="1"
                            >
                              <template v-if="estate.internetSettings.bidSetting === 'ShowBiddhistory' || estate.internetSettings.bidSetting === 'ShowHighestBid'">
                                <money-format
                                  :value="bids[0].amount"
                                  locale="sv-SE"
                                  currency-code="SEK"
                                  :subunits-value="false"
                                  :hide-subunits="true"
                                  style="font-weight: 400; font-size: smaller;"
                                />
                              </template>
                            </span>
                          </v-fade-transition>
                        </v-col>
                      </v-row>
                    </template>
                    <span v-else-if="estatePanelItem.slug === 'facts'">
                      {{ $txt('ui.facts.label') }}
                    </span>
                    <span v-else-if="estatePanelItem.slug === 'other'">
                      {{ $txt('ui.other.label') }}
                    </span>
                    <span v-else>
                      {{ $txt(`${estatePanelItem.label ? 'ui.' + estatePanelItem.label : 'Förening'}`) }}
                    </span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ************************ -->
                    <!-- ***** Tabs Targets ***** -->
                    <!-- ******** START ********* -->

                    <!-- Tab Target - BIDDING -->
                    <div
                      v-if="estatePanelItem.slug === 'bidding' && bids.length"
                      class="estate-bidding"
                    >
                      <div v-if="estate.internetSettings.bidSetting === 'ShowHighestBid'" class="highest-bid">
                        <v-row dense align="center">
                          <v-col cols="6" md="3">
                            <div class="pa-1">
                              {{ bids[0].bidder }}
                            </div>
                          </v-col>
                          <v-col cols="6" md="4">
                            <div class="pa-1">
                              <money-format
                                :value="bids[0].amount"
                                locale="sv-SE"
                                currency-code="SEK"
                                :subunits-value="false"
                                :hide-subunits="true"
                                style="font-weight: 400;"
                              />
                            </div>
                          </v-col>
                          <v-col cols="6" md="3">
                            <div class="pa-1">
                              {{ bids[0].date }}
                            </div>
                          </v-col>
                          <v-col cols="6" md="2">
                            <div class="pa-1">
                              {{ bids[0].time }}
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                      <div v-if="estate.internetSettings.bidSetting === 'ShowBiddhistory'" style="max-width: 600px;">
                        <v-row v-if="!$vuetify.breakpoint.smAndDown" dense style="background-color: rgba(180,180,180, .5); opacity: .5;">
                          <v-col cols="3">
                            <div class="pa-1">
                              Budgivare
                            </div>
                          </v-col>
                          <v-col cols="4">
                            <div class="pa-1">
                              Bud
                            </div>
                          </v-col>
                          <v-col cols="3">
                            <div class="pa-1">
                              Datum
                            </div>
                          </v-col>
                          <v-col cols="2">
                            <div class="pa-1">
                              Tid
                            </div>
                          </v-col>
                        </v-row>
                        <v-row
                          v-for="(bid, b) in bids"
                          :key="`bid_${b}`"
                          dense
                          align="center"
                          justify="center"
                          style="border-bottom: thin solid rgba(180,180,180,.3);"
                        >
                          <v-col cols="6" md="3">
                            <div class="pa-1">
                              {{ bid.bidder }}
                            </div>
                          </v-col>
                          <v-col cols="6" md="4">
                            <div class="pa-1">
                              <money-format
                                :value="bid.amount"
                                locale="sv-SE"
                                currency-code="SEK"
                                :subunits-value="false"
                                :hide-subunits="true"
                                style="font-weight: 400;"
                              />
                            </div>
                          </v-col>
                          <v-col cols="6" md="3">
                            <div class="pa-1">
                              {{ bid.date }}
                            </div>
                          </v-col>
                          <v-col cols="6" md="2">
                            <div class="pa-1">
                              {{ bid.time }}
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                      <v-alert
                        v-if="estate.internetSettings.bidSetting === 'ShowBidding'"
                        icon="mdi-information"
                        color="currentColor"
                        dense
                        text
                      >
                        <span>
                          Kontakta mäklaren för mer information.
                        </span>
                      </v-alert>
                    </div>
                    <!-- end - BIDDING -->
                    <!-- Tab Target - DESCRIPTION -->
                    <div v-if="estatePanelItem.slug === 'description' && estate.description" class="estate-description-wrapper">
                      <div
                        v-if="estate.description && (estate.description.shortSellingDescription || estate.description.longSellingDescription)"
                        class="estate-description-inner"
                      >
                        <p
                          v-if="estate.description && estate.description.shortSellingDescription"
                          v-html="estate.description.shortSellingDescription.replace(/(\r\n|\r|\n)/g, '<br>')"
                        />
                        <p
                          v-if="estate.description && estate.description.longSellingDescription"
                          v-html="estate.description.longSellingDescription.replace(/(\r\n|\r|\n)/g, '<br>')"
                        />
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
                    <div v-if="estatePanelItem.slug === 'facts' && facts && facts.length" class="estate-facts">
                      <v-row
                        v-for="(fact, f) in facts.filter(f => !!f.value)"
                        :key="fact.slug"
                        dense
                        align="center"
                        justify="center"
                        :style="`background-color: ${f % 2 == 0 ? 'rgba(150,150,150,.1)' : ''}; ${!fact.value ? 'display: none;' : ''}`"
                      >
                        <v-col cols="7" md="2">
                          <div class="pa-1">
                            {{ fact.label }}
                          </div>
                        </v-col>
                        <v-col cols="5" md="2">
                          <div class="pa-1">
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
                          </div>
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
                      <!-- Balcony and Patio info -->
                      <template v-if="estate.balconyPatio">
                        <v-row
                          v-if="estate.balconyPatio.balcony"
                          :style="`background-color: ${other.length % 2 == 0 ? 'rgba(150,150,150,.1)' : ''};`"
                          dense
                          align="center"
                        >
                          <v-col cols="7" md="2">
                            <div class="pa-1">
                              Balkong
                            </div>
                          </v-col>
                          <v-col cols="fill">
                            <v-icon small>
                              mdi-checkbox-marked-outline
                            </v-icon>
                          </v-col>
                        </v-row>
                        <v-row
                          v-if="estate.balconyPatio.patio"
                          :style="`background-color: ${other.length % 2 == 0 && estate.balconyPatio.balcony ? '' : 'rgba(150,150,150,.1)'};`"
                          dense
                          align="center"
                        >
                          <v-col cols="7" md="2">
                            <div class="pa-1">
                              Uteplats
                            </div>
                          </v-col>
                          <v-col cols="fill">
                            <v-icon small>
                              mdi-checkbox-marked-outline
                            </v-icon>
                          </v-col>
                        </v-row>
                      </template>
                      <v-row
                        v-if="estate.floorAndElevator && estate.floorAndElevator.elevator !== 'No'"
                        :style="`background-color: ${other.length % 2 == 0 && estate.balconyPatio.balcony && estate.balconyPatio.patio ? 'rgba(150,150,150,.1)' : estate.balconyPatio.balcony || estate.balconyPatio.patio ? '' : ''};`"
                        dense
                        align="center"
                      >
                        <v-col cols="7" md="2">
                          <div class="pa-1">
                            Hiss
                          </div>
                        </v-col>
                        <v-col cols="fill">
                          <v-icon small>
                            mdi-checkbox-marked-outline
                          </v-icon>
                        </v-col>
                      </v-row>
                    </div>
                    <!-- end - FACTS -->
                    <!-- Tab Target - ASSOCIATION -->
                    <div
                      v-if="estatePanelItem.slug === 'association' && estate.association && estate.association.generalAboutAssociation"
                      class="estate-association"
                      v-html="estate.association.generalAboutAssociation.replace(/(?:\r\n|\r|\n)/g, '<br>')"
                    />
                    <!-- end - ASSOCIATION -->
                    <!-- Tab Target - OPERATIONS COST -->
                    <div v-if="estatePanelItem.slug === 'operations' && !!operations" class="estate-operations">
                      <v-row
                        v-for="(op, o) in operations"
                        :key="o"
                        :style="op.name === 'sum' ? 'border-top: thin dashed rgba(140,140,140,.5); padding-top: 10px; padding-top: 5px;' : op.name === 'personsInTheHousehold' ? 'padding-top: 10px; padding-top: 5px;' : 'padding-left: 5px;'"
                        dense
                      >
                        <v-col v-if="op.name !== 'annualFeeCommunityIncluded'" cols="6" class="d-flex align-center">
                          <v-icon v-if="op.name === 'personsInTheHousehold'" style="margin-right: 5px;">
                            mdi-information-outline
                          </v-icon>
                          {{ $t(`ui.operations.${op.name}`) }}
                        </v-col>
                        <v-col :cols="op.name === 'annualFeeCommunityIncluded' ? 12 : 6">
                          <money-format
                            v-if="typeof op.value !== 'string' && op.name !== 'annualFeeCommunityIncluded' && op.name !== 'personsInTheHousehold'"
                            :value="op.value"
                            locale="sv-SE"
                            currency-code="SEK"
                            :subunits-value="false"
                            :hide-subunits="true"
                            style="font-weight:600; font-size: 1.1rem"
                          />
                          <div v-else class="label">
                            <v-alert
                              v-if="op.name === 'annualFeeCommunityIncluded'"
                              dense
                              icon="mdi-information-outline"
                            >
                              <div class="comment">
                                {{ op.value }}
                              </div>
                            </v-alert>
                            <template v-else>
                              <v-icon v-if="op.name === 'annualFeeCommunityIncluded'" small style="margin-right: 5px; margin-top: -2px;">
                                mdi-information-outline
                              </v-icon>
                              <span :style="op.name === 'personsInTheHousehold' ? 'font-weight: 600;' : ''">{{ op.value }}</span>
                              <span v-if="op.name === 'personsInTheHousehold'" class="font-italic">Personer</span>
                            </template>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!-- end - OPERATIONS COST -->
                    <!-- Tab Target - DOCUMENTS -->
                    <div v-if="estatePanelItem.slug === 'documents' && estate.association && estate.association.documents.length" class="estate-documents">
                      <v-row
                        v-for="(document, d) in estate.association.documents"
                        :key="d"
                        :style="d % 2 === 0 ? 'background-color:rgba(150,150,150,.1)' : ''"
                        style="cursor:pointer;"
                        dense
                        align="center"
                      >
                        <v-col cols="10">
                          <v-btn
                            :to="`${document.src}`"
                            target="_blank"
                            :title="document.id"
                            plain
                            class="file-btn"
                            left
                            style=""
                          >
                            <v-icon class="mr-3">
                              mdi-file-document
                            </v-icon>
                            <span class="text-truncate" style="max-width:250px;">
                              {{ document.name }}
                            </span>
                          </v-btn>
                        </v-col>
                        <v-col cols="2" class="text-uppercase">
                          {{ document.extension.replace('.', '') }}
                        </v-col>
                      </v-row>
                    </div>
                    <!-- end - DOCUMENTS -->
                    <!-- ********* END ********** -->
                    <!-- ***** Tabs Targets ***** -->
                    <!-- ************************ -->
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="3"
            :order="$vuetify.breakpoint.smAndDown ? '2' : ''"
          >
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="4" md="12">
                <div class="nav-footer">
                  <v-btn
                    class="my-2"
                    block
                    outlined
                    large
                    @click.prevent="$router.push(localePath('/bostader'))"
                  >
                    <v-icon left dark>
                      mdi-backburger
                    </v-icon>
                    {{ $t('ui.back') }}
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" sm="8" md="12">
                &nbsp;
              </v-col>
              <v-col cols="12" sm="4" md="12">
                <div v-if="estate.broker.image.cdnReferences" class="broker-image-wrapper">
                  <img
                    :src="estate.broker.image.cdnReferences[0]"
                    :alt="estate.broker.userName"
                  >
                </div>
              </v-col>
              <v-col cols="12" sm="8" md="12">
                <div class="pa-6">
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
          <v-col
            :md="!viewings || !viewings.length ? 12 : 12"
            :xl="!viewings || !viewings.length ? 12 : 12"
            cols="12"
          >
            <!-- Tab Target - VIEWINGS -->
            <div class="estate-viewings">
              <estate-interest-form
                :estate-id="estate.estateId"
                :estate-broker-id="estate.broker.userId"
                :dense="true"
                :viewings="viewings"
                :title="'Anmäl Intresse'"
              />
            </div>
            <!-- end - VIEWINGS -->
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <client-only>
      <estate-gallery ref="estate_gallery" :estate-images="estate.images" :floorplans="floorplans" />
    </client-only>
    <div id="estate_location" ref="estate_location" class="map">
      <iframe
        width="100%"
        :height="$vuetify.breakpoint.mdAndDown ? 450 : 650"
        referrerpolicy="strict-origin-when-cross-origin"
        style="border:0"
        :style="$vuetify.theme.dark ? 'filter: invert(90%);' : ''"
        loading="lazy"
        allowfullscreen
        :src="estateMapSrc"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { mapState } from 'vuex'
import MoneyFormat from 'vue-money-format'
import EstateDetailsImage from './EstateDetailsImage.vue'
import EstateInterestForm from './EstateInterestForm.vue'
import EstateGallery from './EstateGallery.vue'
import estate from './props'
import facts from '~/abstract/facts'
import estatePanel from '~/data/estate-details'
import { weekdays, months } from '~/data/basic'

export default {
  name: 'EstateDetails',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'money-format': MoneyFormat,
    EstateDetailsImage,
    EstateInterestForm,
    EstateGallery
  },
  props: { estate },
  data () {
    return {
      weekdays: weekdays(),
      months: months(),
      facts,
      options: {
        duration: 500,
        offset: 0,
        easing: 'easeInOutCubic'
      },
      showImages: false,
      estatePanel: estatePanel.data,
      panel: [1]
    }
  },
  computed: {
    ...mapState({
      currentEstate: 'currentEstate'
    }),
    mainImage () {
      let imageUrl = this.estate?.mainImageUrl
      if (!imageUrl) {
        imageUrl = this.estate && this.estate.images.length && this.estate.images.find(img => img.orderNumber === 1)
          ? this.estate.images.find(img => img.orderNumber === 1).cdnReferences[0]
          : 'placeholder-home.png'
      }
      return imageUrl
    },
    bids () {
      const bids = []
      if (this.estate.bids && this.estate.bids.length) {
        const activeBids = this.estate.bids.filter(bidObj => !bidObj.cancelled)
        for (let i = 0; i < activeBids.length; i++) {
          if (activeBids[i].status === 'DeltarBudgivning') {
            const bidder = `${this.$txt('ui.bidder')} ${activeBids[i].alias}:`
            const amount = activeBids[i].amount
            const timestamp = activeBids[i].dateAndTime
            const bidDate = new Date(timestamp)
            bids[i] = {
              cancelled: activeBids[i].cancelled,
              bidder,
              amount,
              date: `${bidDate.toLocaleDateString('sv')}`,
              time: `${bidDate.getHours().toString().padStart(2, '0')}:${bidDate.getMinutes().toString().padStart(2, '0')}`
            }
          }
        }
      }
      return bids.sort(function (a, b) { return a - b })
    },
    operations () {
      return this.estate.operation ? this.arrayfyOperations(this.estate.operation) : null
    },
    other () {
      return this.estate.balconyPatio ? this.arrayfyOperations(this.estate.balconyPatio, false) : null
    },
    floorplans () {
      const floorplans = this.estate.images.filter(image => image.text && image.text.toLowerCase().includes('plan'))
      return floorplans && floorplans.length
        ? floorplans.map((image) => {
          return {
            ...image,
            url: image.cdnReferences[0]
          }
        })
        : []
    },
    estateMapSrc () {
      const mapsApi = 'https://www.google.com/maps/embed/v1/place'
      const apiKey = process.env.GOOGLE_MAPS_API_KEY
      const addressObj = this.estate.baseInformation.objectAddress
      const street = addressObj.streetAddress.replace(' ', '+')
      const zip = addressObj.zipCode
      const coordinates = `${addressObj.coordinate.latitud},${addressObj.coordinate.longitud}`
      const q = `${street}+${zip}`
      return `${mapsApi}?key=${apiKey}&q=${q}&center=${coordinates}`
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
            active: false,
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
    thisElem () {
      return process.env.NODE_ENV === 'production'
        ? this.elements.this.prod
        : this.elements.this.dev
    },
    refs () {
      return this.$refs
    },
    root () {
      return process.env.NODE_ENV === 'production'
        ? this.elements.root.prod.$el
        : this.elements.root.dev.$el
    },
    elements () {
      return {
        this: {
          dev: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[2] &&
          !!this.$nuxt.$children[2].$refs && !!this.$nuxt.$children[2].$refs['deus-application']
            ? this.$nuxt.$root.$children[2].$children[0].$children[0].$children[0].$children[0].$children[0]
            : this.$nuxt.$root.$children[1].$children[0].$children[0].$children[0].$children[0].$children[0],

          prod: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[1] &&
          !!this.$nuxt.$children[1].$refs && this.$nuxt.$children[1].$refs['deus-application']
            ? this.$nuxt.$children[1].$refs['deus-application'].$children[0].$children[0].$children[0].$children[0]
            : this.$nuxt.$children[2].$refs['deus-application'].$children[0].$children[0].$children[0].$children[0]
        },
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
    const noDesc = !this.estate.description.shortSellingDescription && !this.estate.description.longSellingDescription
    if (!this.$vuetify.breakpoint.smAndDown && !noDesc) {
      this.panel.push(1)
    }
    if (this.estate.internetSettings.bidSetting === 'ShowBiddhistory') {
      this.panel.push(0)
    }
    if (noDesc && this.estate.internetSettings.bidSetting !== 'ShowBiddhistory') {
      this.panel.push(2)
    }
  },
  mounted () {
    this.facts = this.updateFacts(this.estate, this.facts)
    if (this.client) {
      this.$skrollTo(this.root, this.root, this.$vuetify.breakpoint.smAndDown, -10000, null)
    }
  },
  methods: {
    getWeekDay (rawDate) {
      const d = new Date(rawDate)
      return this.weekdays[d.getDay()]
    },
    getMonthName (rawDate) {
      const d = new Date(rawDate)
      return this.months[d.getMonth()]
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
    arrayfyOperations (ops, trueOnly = true) {
      const opsArray = []
      for (const [key, value] of Object.entries(ops)) {
        if (trueOnly) {
          if (!!value && value !== 0) {
            opsArray.push({
              name: key,
              value
            })
          }
        } else if (!trueOnly) {
          if (key === 'parkingLot' || key === 'balcony' || key === 'patio') {
            opsArray.push({
              type: key === 'balcony' ? 'check-only' : 'check-text',
              name: key,
              value,
              text: key === 'parkingLot' ? ops.parking : key === 'patio' ? ops.summary : null
            })
          } else if (key === 'squereMeterype') {
            opsArray.push({
              type: 'text-only',
              name: key,
              value: (this.estate.groundIncludetToHousingCooperative.squereMetre ? this.estate.groundIncludetToHousingCooperative.squereMetre : '0') + ' kvm',
              text: 'Typ: ' + (this.estate.groundIncludetToHousingCooperative.description ? `<b>${this.estate.groundIncludetToHousingCooperative.description}</b>` : '<em>Unavailable</em>')
            })
          }
        }
      }
      return opsArray
    }
  }
}
</script>

<style lang="scss">
.v-application.theme--light .elevation-5 {
  box-shadow: 0 5px 12px rgb(0 0 0 / 10%) !important;
}
.theme--light.v-banner.v-sheet:not(.v-sheet--outlined):not(.v-sheet--shaped) .v-banner__wrapper {
  border: none !important;
}

.v-banner--is-mobile.v-banner--single-line .v-banner__wrapper {
  padding-top: 0 !important;
  h1 {
    line-height: 1.2 !important;
    font-size: 1.6rem;
  }
}

.v-application.theme--light .v-banner .v-banner__wrapper {
  background-color: var(--v-secondary-base) !important;
  // padding: 20px 10px 5px 10px;
}
.v-application.theme--dark .v-banner .v-banner__wrapper {
  background-color: #3d3c36 !important;
  // padding: 20px 10px 5px 10px;
}
.v-sheet.v-banner {
  margin-bottom: 10px;
}
.estate-details-col-inner {
  .v-expansion-panel-content__wrap {
    padding: 0 !important;
    flex: 1 1 auto;
    max-width: 100%;
  }
  .v-banner__wrapper {
    border: none !important;
  }

  .v-expansion-panel--active > .v-expansion-panel-header {
    min-height: auto !important;
    padding-left: 0 !important;
  }
  .v-expansion-panel-header {
    font-size: 1.4rem !important;
    padding: 15.5px 24px 15.5px 0 !important;
    border-bottom: solid thin #999999;
    align-items: center;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    display: flex;
    line-height: 1;
    min-height: 48px;
    outline: none;
    position: relative;
    transition: 0.3s all cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 100%;
  }
}

.file-btn {
  .v-btn__content {
    justify-content: left;
  }
}

//.v-application.theme--light {
  // .viewing-card {
  //   &.v-item--active.v-card--link:focus:before {
  //     background-color: var(--v-primary-darken3);
  //   }
  //   &.v-item--active:before {
  //     background-color: var(--v-primary-darken3);
  //   }
  // }
//}

.active-viewing {
  position: absolute;
  background-color: #FFFFFF;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

// .theme--light.v-banner {
//   box-shadow: 0 3px 7px rgba(0,0,0,.1) !important;
// }

// .theme--dark.v-banner {
//   // padding: 30px 15px 30px 15px;
//   box-shadow: 0 3px 7px rgba(0,0,0,.9) !important;
// }

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
// .estate-facts {
//   color: #333333;
// }
.estate-facts,
.estate-description-wrapper,
.estate-association,
.estate-operations,
.estate-documents,
.estate-bidding,
.estate-other {
  padding: 20px 0 30px 0;
}

.other-label {
  font-size: smaller;
  .the-label {
    font-family: $heading-font-family;
    font-weight: 600;
    text-transform: uppercase;
    font-size: smaller;
  }
  .the-text {
    font-size: smaller;
    font-style: italic;
    padding-top: 3px;
    margin-top: 3px;
    border-top: dashed thin rgba(130,130,130,.5);
  }
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
  margin: 15px 0 0 0;
  //border-bottom: thin solid var(--v-primary-base);
  //border-top: thin solid var(--v-primary-base);
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
  margin: 10px 0;
}

.v-expansion-panel--active:not(:first-child), .v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
}

.estate-feature {
  display: inline-block;
  .money_format {
    display: inline-block;
  }
  .label {
    font-weight: 100;
  }
  span {
    // display: inline-block;
    margin: 0;
  }
}
.comment {
  font-style: italic;
  font-weight: 400;
  font-size: smaller;
}
.estate-features-wrapper span {
  display: inline-block;
  //margin: 0 2px;
}
.estate-features {
  font-family: $heading-font-family;
}
.broker-name {
  font-family: $heading-font-family;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 400;
}
.broker-title {
  margin-top: 8px;
  font-size: .7rem;
  font-weight: 400;
  //text-transform: uppercase;
}

.broker-info {
  padding: 15px 0;
  font-size: .8rem;
  font-weight: 400;
}

.broker-image-wrapper img {
  width: 100%;
  height:auto;
}

.broker-image-wrapper {
  margin: 0;
}

.estate-details-wrapper {
  min-height: auto;
  background-color: transparent;
}
//.v-application.theme--light .estate-details-wrapper {
//  background-color: #f6f6f6;
//}
//.v-application.theme--dark .estate-details-wrapper {
//  background-color: #171717;
//}

.estate-details-container {
  padding-top: 0;
  background-color: transparent
}

.main-image-overlay,
.main-image-wrapper {
  position: absolute;
  top: -64px;
  left: 0;
  width: 100%;
  height: 100vh;

}
.main-image-wrapper {
  background-position: center center;
  background-size: cover;
}
@media screen and (max-width: 500px) {
  .main-image-wrapper,
  .main-image-overlay {
    height: calc(100vh - 56px);
  }
  .city {
    display: none;
  }
}

.city {
  line-height: 1.5;
  font-size: 1.5rem !important;
  letter-spacing: 2px;
  font-weight: 300;
  padding: 0 0 8px 0;
}
.street {
  font-family: $heading-font-family;
  text-transform: uppercase;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
}

.estate-features {
  display: block;
  & > .v-icon {
    display: none;
  }
}
.estate-feature {
  margin-right: 0;
  &:first-child {
    margin-left: 0;
  }
  &:not(:last-child):after {
    content: ',';
  }
  //display: block !important;
  // width: 40% !important;
}
.v-banner--single-line .v-banner__text {
  white-space: unset !important;
}

.v-expansion-panel-header > *:not(.v-expansion-panel-header__icon) {
  font-family: $heading-font-family;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media screen and (max-width: 500px) {
  .street {
    font-size: 2rem;
  }
  .estate-features-wrapper {
    margin: 10px 0 5px 0;
  }
}
</style>
