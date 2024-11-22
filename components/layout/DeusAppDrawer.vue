<template>
  <v-navigation-drawer
    v-model="showDrawer"
    :width="$vuetify.breakpoint.mdAndUp ? '350px' : '60%'"
    :clipped="clipped"
    :fixed="fixed"
    :right="right"
    temporary
    app
  >
    <div class="nav-controls">
      <v-row>
        <v-col>
          <v-icon
            class="mx-2 pa-1"
            @click="$emit('toggle-drawer', !showDrawer)"
          >
            mdi-close
          </v-icon>
        </v-col>
        <!--        <v-col>-->
        <!--          <v-btn-->
        <!--            :to="$i18n.locale === 'sv' ? switchLocalePath('en') : switchLocalePath('sv')"-->
        <!--            icon-->
        <!--          >-->
        <!--            <v-avatar color="transparent">-->
        <!--              <span class="text-h6 bold">-->
        <!--                {{ $i18n.locale === 'en' ? 'sv' : 'en' }}-->
        <!--              </span>-->
        <!--            </v-avatar>-->
        <!--          </v-btn>-->
        <!--        </v-col>-->
        <v-col>
          <v-btn
            icon
            @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
          >
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-list>
      <v-list-item
        v-for="(item, i) in deusNav.top.items"
        :key="i"
        :to="$txt(item.slug)"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="$txt(item.label)" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'DeusAppDrawer',
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    clipped: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: true
    },
    deusNav: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showDrawer: false
    }
  },
  watch: {
    drawer (drawer) {
      this.showDrawer = drawer
    },
    showDrawer (showDrawer) {
      this.$emit('toggle-drawer', showDrawer)
    }
  }
}
</script>

<style lang="scss">
.v-navigation-drawer {
  transition: transform .8s ease !important;
  display: flex !important;
  opacity: 1 !important;
}
.theme--dark.v-navigation-drawer {
  background-color: var(--v-secondary-base);
  .v-list-item--link:before {
    background-color: var(--v-secondary-darken3);
  }
}
.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled),
.theme--dark.v-icon {
  color: var(--v-primary-base);
}

nav .v-list {
  text-transform: uppercase;
  .v-icon {
    font-size: 2rem;
    opacity: .1;
  }
}
.nav-controls {
  padding: 30px 10px;
}
</style>
