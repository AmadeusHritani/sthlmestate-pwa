<template>
  <div class="estate-gallery">
    <v-container>
      <v-row dense align="center" justify="center">
        <v-col cols="12">
          <div class="floorplans-wrapper">
            <h3 ref="estate_floorplan" style="font-size: 1.8rem; margin-top: 3px; font-weight: 100;" class="mb-3 text-uppercase mt-7">
              <v-icon x-large class="mr-2" style="color:inherit; margin-top: -3px;">
                mdi-floor-plan
              </v-icon>
              {{ $txt('ui.floorplan') }}
            </h3>
            <vue-masonry-wall v-if="plans && plans.length" :ssr="{columns: 2}" :items="plans" :options="floorplansOptions" @append="append">
              <template #default="{index, item}">
                <div class="Item" @click="floorplansIndex = index">
                  <img
                    :src="`${item.url ? item.url : 'placeholder-home.png'}`"
                    class="floorplan"
                  >
                </div>
              </template>
            </vue-masonry-wall>
            <div v-else class="no-plan">
              <v-alert dense>
                <v-icon style="opacity: .4; color: currentColor !important;" class="mr-2">
                  mdi-information
                </v-icon>
                <span style="opacity: .4;">
                  {{ $txt('ui.coming-soon') }}
                </span>
              </v-alert>
            </div>
            <client-only>
              <deus-gallery
                v-if="plans && plans.length"
                :images="plans"
                :index="floorplansIndex"
                :disable-scroll="false"
                background="rgb(240,240,240)"
                interface-color="rgba(0, 0, 0, 0.8)"
                @close="floorplansIndex = null"
              />
            </client-only>
          </div>
        </v-col>
        <!-- <v-col cols="12" md="6">
          <v-row align="center" justify="center" class="logo-block">
            <v-col cols="auto" align-self="center">
              <img src="/logo-stacked-light-margin.svg" alt="Sthlm Estate" style="min-width: 300px; max-width:70%;">
            </v-col>
          </v-row>
        </v-col> -->
        <v-col id="estate_photos" ref="estate_photos" cols="12">
          <div class="photos-wrapper mt-7">
            <h3 style="font-size: 1.8rem; margin-top: 3px; font-weight: 100;" class="mb-3 text-uppercase">
              <v-icon x-large class="mr-2" style="color:inherit; margin-top: -3px;">
                mdi-image
              </v-icon>
              {{ $txt('ui.go-to-photos') }}
            </h3>
            <vue-masonry-wall v-if="slides && slides.length" :ssr="{columns: 2}" :items="slides" :options="photosOptions" @append="append">
              <template #default="{index, item}">
                <div class="Item" @click="photosIndex = index">
                  <img
                    :src="`${item.url ? item.url : 'placeholder-home.png'}`"
                    class="photo"
                  >
                </div>
              </template>
            </vue-masonry-wall>
            <client-only>
              <deus-gallery
                :images="slides"
                :index="photosIndex"
                :disable-scroll="false"
                :background="$vuetify.theme.dark ? 'rgb(25,25,25)' : 'rgb(240,240,240)'"
                :interface-color="$vuetify.theme.dark ? 'rgba(250,250,250,0.8)' : 'rgba(0, 0, 0, 0.8)'"
                @close="photosIndex = null"
              />
            </client-only>
          </div>
        </v-col>
      </v-row>
      <!-- <v-row v-if="showImages" dense>
        <v-col
          v-for="(image) in estateImages"
          :key="image.imageId"
          col="auto"
        >
          <v-img
            :src="`/${image.cdnReferences[0] || 'placeholder-home.png'}`"
            lazy-src="/estate-image-placeholder.jpg"
            cover
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
      </div> -->
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import VueMasonryWall from 'vue-masonry-wall'
export default {
  name: 'EstateGallery',
  components: { VueMasonryWall },
  props: {
    estateImages: {
      type: Array,
      required: true
    },
    floorplans: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    showImages: true,
    photosIndex: null,
    floorplansIndex: null
  }),
  computed: {
    images () {
      return this.estateImages.filter(ei => !!ei.showImageOnInternet && (!ei.text || !ei.text.toLowerCase().includes('plan')))
        .sort((a, b) => a.orderNumber - b.orderNumber)
    },
    plans () {
      return this.floorplans.filter(ei => !!ei.showImageOnInternet)
        .map((ei) => {
          return { url: ei.cdnReferences && ei.cdnReferences.length ? `${ei.cdnReferences[0]}` : 'placeholder-home.png' }
        })
    },
    floorplansOptions () {
      return {
        width: (!this.$vuetify.breakpoint.smAndDown && this.plans.length === 1) ? 900 : (!this.$vuetify.breakpoint.smAndDown && this.plans.length === 2) ? 500 : (!this.$vuetify.breakpoint.smAndDown && this.plans.length === 3) ? 400 : 300,
        padding: {
          2: 8,
          default: 12
        }
      }
    },
    photosOptions () {
      return {
        width: (!this.$vuetify.breakpoint.smAndDown && this.slides.length === 1) ? 900 : (!this.$vuetify.breakpoint.smAndDown && this.slides.length === 2) ? 500 : 400,
        padding: {
          2: 8,
          default: 12
        }
      }
    },
    slides () {
      return this.images.map((img) => {
        return { url: img.cdnReferences && img.cdnReferences.length ? `${img.cdnReferences[0]}` : 'placeholder-home.png' }
      }).filter(img => !img.text || !img.text.toLowerCase().includes('plan'))
    }
  },
  methods: {
    append () {
      // console.log('Masonry Wall End.')
      // for (let i = 0; i < 20; i++) {
      //   const id = Math.floor(Math.random() * 1000)
      //   const height = Math.floor(Math.random() * 200) + 600
      //   this.items.push({
      //     title: `Appended ${i}`,
      //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sagittis leo. Vestibulum sit amet metus nec neque dignissim dapibus.',
      //     image: `https://picsum.photos/id/${id}/600/${height}`
      //   })
      // }
    }
  }
}
</script>

<style lang="scss">
.Item {
  overflow: hidden;
  width: 100%;
  background: #F5F5F5;
  &:hover {
    .floorplan, .photo {
      filter: brightness(1.1);
    }
  }
  .floorplan,
  .photo {
    cursor: pointer;
    transition: all .7s ease-in-out;
    filter: brightness(1);
    object-fit: cover;
    width: 100%;
    height: 100%;
    line-height: 0;
    display: block;
  }
  .Content {
    padding: 20px;
  }
}

.gallery-thumb {
  cursor: pointer;
  border: 2px solid #FFFFFF;
  &:hover {
    .v-image__image {
      box-shadow: 2px 2px 15px rgba(0,0,0,.6) inset;
    }
  }
  .v-image__image {
    transition: box-shadow .3s ease-in-out;
    box-shadow: 1px 1px 10px rgba(0,0,0,.3) inset;
  }
}
.v-application.theme--light .floorplan {
  border-color: #FFFFFF;
}
.v-application.theme--dark .floorplan {
  border-color: #111111;
}
</style>
