<template>
  <div class="estate-image">
    <div :style="imageWrapperStyle" class="main-image-wrapper" />
    <div class="main-image-overlay">
      <!-- <v-row no-gutters align-content="center" justify="center" style="height:100%;">
        <v-col class="text-center" align-self="center">
          <div style="margin: 0 auto;" class="estate-heading-card">
            <div class=" mb-4 city">
              {{ city }}
            </div>
            <h1 class="street">
              {{ street }}
            </h1>
          </div>
        </v-col>
        <span class="continue">
          <span
            style="text-decoration:none; display:block; cursor: pointer;"
            @click="$emit('scrollto')"
          >
            <v-icon x-large style="font-size:3rem;">
              mdi-arrow-down
            </v-icon>
          </span>
        </span>
      </v-row> -->
      <span v-if="hasContinue" class="continue">
        <span
          style="text-decoration:none; display:block; cursor: pointer;"
          @click="$emit('scrollto')"
        >
          <v-icon x-large style="font-size:3rem;" color="white">
            mdi-arrow-down
          </v-icon>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
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
      //
    }
  },
  computed: {
    imageWrapperStyle () {
      let style = ''
      // if (this.estate.mainImageUrl) {
      style += `background-image: url(${this.imageUrl});`
      // }
      return style
    }
  }
}
</script>
<style lang="scss">

.continue {
  position: absolute;
  bottom: 80px;
  left: 50%;
  text-shadow: 0 10px 15px rgba(0,0,0,.85);
  transform: translate(-50%, 0);
  z-index: 2;
  animation-duration: 1s;
  animation-name: changey;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
  .v-icon {
    &.theme--light {
      color: #111111;
    }
    &.theme--dark {
      color: #FFFFFF;
    }
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
  padding: 10px;
  // background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0));
}
.v-application.theme--dark .estate-heading-card {
  padding: 10px;
  // background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8), rgba(0,0,0,.8), rgba(0,0,0,0));
}
.v-application.theme--light .main-image-overlay {
  background: linear-gradient(0deg, rgba(255,255,255,0) 80%, rgba(255,255,255,.95));
}
.v-application.theme--dark .main-image-overlay {
  background: linear-gradient(0deg, rgba(0,0,0,0) 80%, rgba(0,0,0,.8));
}

.v-application.theme--light .street h1,
.v-application.theme--light .city {
  color: #222222;
}
.v-application.theme--dark .street h1,
.v-application.theme--dark .city {
  color: #FFFFFF;
}

@media screen and (max-width: 500px) {
  .street h1 {
    font-size: 1.5rem;
  }
}
</style>
