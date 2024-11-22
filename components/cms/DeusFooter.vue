<template>
  <v-footer class="deus-footer pt-0">
    <v-divider class="d-block pt-2" style="width: 100%; flex-basis: unset;" />
    <v-container class="mb-4">
      <v-row class="justify-space-around">
        <v-col cols="12" sm="6" :md="$vuetify.breakpoint.xl ? 'auto' : 'auto'">
          <h3>
            {{ footerItems.menu.title }}
          </h3>
          <ul class="pa-0">
            <li v-for="link in footerItems.menu.items" :key="`menu-${link.id}`" class="footer-item-wrapper d-flex p-0">
              <v-btn
                :to="link.slug"
                :block="$vuetify.breakpoint.smAndDown"
                :style="$vuetify.breakpoint.smAndDown ? 'font-size: 1.1rem;' : 'height: 28px;'"
                text
                active-class="v-btn--disabled"
                style="width: 100%; justify-content: start;"
              >
                <!--                <v-icon small class="mr-5 pt-1">-->
                <!--                  mdi-open-in-new-->
                <!--                </v-icon>-->
                <span>
                  {{ link.label }}
                </span>
              </v-btn>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" sm="6" :md="$vuetify.breakpoint.xl ? 'auto' : 'auto'">
          <h3 style="margin-bottom: 5px">
            {{ footerItems.location.title }}
          </h3>
          <div class="d-flex pa-1 px-2 ml-2">
            <!--            <v-icon class="mr-4">-->
            <!--              mdi-map-marker-radius-->
            <!--            </v-icon>-->
            <a
              :href="footerItems.location.mapsUrl"
              :style="$vuetify.breakpoint.smAndDown ? 'font-size: 1.1rem;' : ''"
              target="_blank"
            >
              {{ footerItems.location.street }}<br>
              {{ footerItems.location.zipCode }} {{ footerItems.location.city }}
            </a>
          </div>
          <div class="d-flex pa-1 px-2 ml-2">
            <!--            <v-icon class="mr-4">-->
            <!--              mdi-phone-->
            <!--            </v-icon>-->
            <a
              :href="`tel:${phone}`"
              :style="$vuetify.breakpoint.smAndDown ? 'font-size: 1.1rem;' : ''"
            >
              {{ phone }}
            </a>
          </div>
          <div class="d-flex pa-1 px-2 ml-2">
            <!--            <v-icon class="mr-4">-->
            <!--              mdi-email-->
            <!--            </v-icon>-->
            <a
              :href="`mailto:${email}`"
              :style="$vuetify.breakpoint.smAndDown ? 'font-size: 1.1rem;' : ''"
            >
              {{ email }}
            </a>
          </div>
        </v-col>
        <v-col cols="12" :md="$vuetify.breakpoint.xl ? 'auto' : 'auto'">
          <h3 class="pl-4">
            {{ footerItems.social.title }}
          </h3>
          <div class="pl-2">
            <div class="pl-1 mb-1 d-flex justify-start flex-wrap">
              <a
                :href="footerItems.markets.items[0].url"
                :title="footerItems.markets.items[0].title"
                :class="$vuetify.breakpoint.smAndDown ? 'pa-2' : 'pa-2'"
                class="market-link"
                target="_blank"
              >
                <v-img
                  :src="`${footerItems.markets.items[0].type}-logo${$vuetify.theme.dark ? '-dark' : ''}.svg`"
                  :alt="footerItems.markets.items[0].title"
                  contain
                  width="100"
                  class="text-left"
                  position="left"
                />
              </a>
            </div>
            <div class="pl-1 d-flex justify-start flex-wrap">
              <a
                :href="footerItems.markets.items[1].url"
                :title="footerItems.markets.items[1].title"
                :class="$vuetify.breakpoint.smAndDown ? 'px-2 py-0' : 'px-2 py-0'"
                class="market-link"
                target="_blank"
              >
                <v-img
                  :src="`${footerItems.markets.items[1].type}-logo${$vuetify.theme.dark ? '-dark' : ''}.svg`"
                  :alt="footerItems.markets.items[1].title"
                  width="140"
                  contain
                />
              </a>
            </div>
            <div class="mb-4 pl-1 d-flex justify-start flex-wrap">
              <v-btn
                v-for="socialItem in footerItems.social.items"
                :key="`social-item-${socialItem.id}`"
                :href="socialItem.url"
                tag="a"
                target="_blank"
                style="color: currentColor !important;"
                class="ma-1 mx-2 market-link"
                icon
              >
                <v-icon
                  :x-large="$vuetify.breakpoint.smAndDown"
                  style="color: currentColor !important;"
                >
                  {{ socialItem.icon }}
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-card color="transparent" class="footer-bottom" flat>
      <v-container class="text-center">
        <div class="mb-2" style="font-weight: 400" v-html="copyright" />
        <div style="opacity: .8; font-size: .8rem">
          {{ dev.prefix }}
          <a :href="dev.url" :title="dev.title">{{ dev.label }}</a>
          <span style="opacity: .5;">&#9679;</span> {{ dev.extra.pre }}
          <a :href="dev.extra.url" :title="dev.extra.title" target="_blank">
            {{ dev.extra.label }}
          </a>
        </div>
        <!--        <span v-if="$nuxt.isOffline">You are offline</span>-->
      </v-container>
    </v-card>
  </v-footer>
</template>

<script>
import { business } from '@/config/core'
export default {
  name: 'DeusFooter',
  data: () => ({
    phone: business.phone,
    email: business.email,
    name: business.shortName,
    shortDesc: business.shortDesc,
    copyright: `${business.shortName} &copy; 2022 - ${new Date().getFullYear()}`,
    dev: {
      prefix: 'by ',
      label: 'Amadeus H.',
      title: 'Full-stack Development done by Amadeus Hritani',
      extra: {
        pre: 'in association with',
        label: 'SimHop',
        title: 'SimHop Media & IT AB',
        url: 'https://simhop.se'
      },
      url: 'mailto:deus.h@outlook.com'
    },
    footerItems: {
      menu: {
        title: 'Läs mer',
        items: [
          // {
          //   id: 1,
          //   slug: '/bostader',
          //   label: 'Till Salu'
          // },
          {
            id: 2,
            slug: '/om-oss',
            label: 'Om Oss'
          },
          {
            id: 3,
            slug: '/privacy',
            label: 'Integritet'
          },
          {
            id: 4,
            slug: '/gdpr',
            label: 'GDPR'
          },
          {
            id: 5,
            slug: '/kontakta-oss',
            label: 'Kontakta Oss'
          }
        ]
      },
      location: {
        title: 'Kontakt',
        street: business.location.street,
        city: business.location.city,
        zipCode: business.location.zipCode,
        mapsUrl: business.location.mapsUrl
      },
      social: {
        title: 'Följ Oss',
        items: [
          {
            id: 1,
            type: 'facebook',
            title: 'Sthlm Estate Facebook',
            icon: 'mdi-facebook',
            url: business.social.facebook
          },
          {
            id: 2,
            type: 'instagram',
            title: 'Sthlm Estate Instagram',
            icon: 'mdi-instagram',
            url: business.social.instagram
          },
          {
            id: 3,
            type: 'linkedin',
            title: 'Sthlm Estate LinkedIn',
            icon: 'mdi-linkedin',
            url: business.social.linkedin
          }
        ]
      },
      markets: {
        title: 'Våra Omdömen',
        items: [
          {
            id: 1,
            type: 'reco',
            label: 'Reco',
            title: 'Sthlm Estate at Reco',
            logo: 'reco-logo.svg',
            url: 'https://www.reco.se/sthlm-estate'
          },
          {
            id: 2,
            type: 'hittamaklare',
            label: 'Hittamaklare',
            title: 'Sthlm Estate at Hittamaklare',
            logo: 'hittamaklare-logo.svg',
            url: 'https://www.hittamaklare.se/maklarbyra/sthlm-estate'
          }
        ]
      }
    }
  })
}
</script>

<style lang="scss">
.market-link {
  filter: grayscale(1);
  opacity: .4;
  transition: all .3s ease-in-out;
  &:hover {
    filter: grayscale(0);
    opacity: 1;
  }
}
.v-footer.deus-footer {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 0 !important;
  margin: 0;
  a {
    text-decoration: none;
  }
  h3 {
    padding-left: 16px;
    margin-top: 13px;
    margin-bottom: 5px;
  }
}
.footer-bottom {
  width: 100%;
  text-align: center;
  //border-top: thin dashed rgba(90,90,90,.4);
  padding-top: 1rem;
  padding-bottom: 2rem;
}
.footer-item-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-item-wrapper .v-btn__content {
  font-weight: 300;
}

.footer-item-wrapper .v-btn {
  height: auto !important;
  padding-bottom: 5px !important;
  padding-top: 5px !important;
  min-height: auto;
}

@media screen and (max-width: 500px) {
  .footer-bottom {
    padding-bottom: 5rem;
  }
}
</style>
