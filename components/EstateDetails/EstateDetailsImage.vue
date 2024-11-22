<template>
  <div class="estate-image">
    <div :style="imageWrapperStyle" class="main-image-wrapper" />
    <div class="main-image-overlay">
      <span v-if="hasContinue" class="continue">
        <span
          style="text-decoration:none; display:block; cursor: pointer;"
          @click="$emit('scrollto')"
        >
          <v-icon :small="$vuetify.breakpoint.smAndDown" :x-large="$vuetify.breakpoint.mdAndUp" style="font-size:3rem;">
            mdi-arrow-down
          </v-icon>
        </span>
      </span>
      <div style="margin: 0;" class="estate-heading-card">
        <v-btn-toggle v-model="tools" borderless dense :background-color="'rgba(0,0,0,.2)'" dark>
          <v-btn
            text
            :x-large="!$vuetify.breakpoint.smAndDown"
            :class="$vuetify.breakpoint.mdAndUp ? 'px-6' : 'px-3'"
            style="border: none !important;"
            @click="$emit('scroll-to-location')"
          >
            {{ $txt('ui.go-to-location') }}
            <v-icon :large="!$vuetify.breakpoint.smAndDown" :small="$vuetify.breakpoint.smAndDown" class="ml-3 text-right" right>
              mdi-map-marker
            </v-icon>
          </v-btn>
          <v-btn
            text
            :x-large="!$vuetify.breakpoint.smAndDown"
            :class="$vuetify.breakpoint.mdAndUp ? 'px-6' : 'px-3'"
            style="border: none !important;"
            @click="$emit('scroll-to-floorplan')"
          >
            {{ $txt('ui.go-to-floorplan') }}
            <v-icon :large="!$vuetify.breakpoint.smAndDown" :small="$vuetify.breakpoint.smAndDown" class="ml-3 text-right" right>
              mdi-floor-plan
            </v-icon>
          </v-btn>
          <v-btn
            text
            :x-large="!$vuetify.breakpoint.smAndDown"
            :class="$vuetify.breakpoint.mdAndUp ? 'px-6' : 'px-3'"
            style="border: none !important;"
            @click="$emit('scroll-to-photos')"
          >
            {{ $txt('ui.go-to-photos') }}
            <v-icon :large="!$vuetify.breakpoint.smAndDown" :small="$vuetify.breakpoint.smAndDown" class="ml-3 text-right" right>
              mdi-image
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  name: 'EstateDetailsImage',
  props: {
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    hasContinue: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tools: null
    }
  },
  computed: {
    imageWrapperStyle () {
      let style = ''
      if (this.imageUrl) {
        style += `background-image: url(${this.imageUrl});`
      }
      return style
    }
  },
  mounted () {
    //
  },
  methods: {
    //
  }
}
</script>
<style lang="scss">
//.estate-image {
//  position: relative;
//}
.estate-heading-card {
  position: absolute;
  bottom: 0;
  right: 20px;
  width: 100%;
  text-align: right;
}

@media screen and (max-width: 500px) {
  .estate-heading-card {
    bottom: 10px;
    right: 0;
    width: 100%;
    text-align: center;
  }
}

@keyframes changey {
  from {
    transform: translate(-50%, -10px);
  }

  to {
    transform: translate(-50%, 10px);
  }
}

.v-application.theme--light .estate-heading-card {
  padding: 10px 0;
  // background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0));
}
.v-application.theme--dark .estate-heading-card {
  padding: 10px 0;
  // background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8), rgba(0,0,0,.8), rgba(0,0,0,0));
}
//.v-application.theme--light .main-image-overlay {
//  background: linear-gradient(0deg, rgba(255,255,255,.7) 0%, rgba(255,255,255,0) 60%, rgba(255,255,255,.95));
//}
//.v-application.theme--dark .main-image-overlay {
//  background: linear-gradient(0deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 60%, rgba(0,0,0,.7));
//}

.v-application.theme--light .street h1,
.v-application.theme--light .city {
  color: #222222;
}
.v-application.theme--dark .street h1,
.v-application.theme--dark .city {
  color: #FFFFFF;
}

.continue {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
  animation-duration: 1.5s;
  animation-name: changey;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
  .v-icon {
    padding: 30px;
    color: #FFFFFF;
    text-shadow: 0 10px 15px rgba(0,0,0,.85);
  }
}

@media screen and (max-width: 500px) {
  .street h1 {
    font-size: 1.5rem;
  }
  .continue {
    bottom: 50px;
    .v-icon {
      padding: 20px 10px;
    }
  }
}
</style>
