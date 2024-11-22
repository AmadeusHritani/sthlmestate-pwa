<template>
  <div
    class="page no-bg"
    :style="pageStyle"
    style=""
  >
    <v-row
      justify="center"
      align="center"
      style="filter: grayscale(.65) ;background-image:url('/stockholm-colored-desktop-blurred.jpg'); background-size:cover; min-height:50vh; background-position: center center;"
      :style="$vuetify.breakpoint.smAndDown ? 'margin-left: 0; margin-right: 0;' : 'margin-left: 0; margin-right: 0; margin-bottom: 0; margin-top: 0;'"
    >
      <v-col cols="12" md="9" lg="7" xl="5" style="font-size:1.8rem; color: #FFFFFF; text-align: center; text-shadow: 0 -4px 7px rgba(0,0,0,.95); padding-left: 0; padding-right: 0;">
        <!--        <img-->
        <!--          src="/logo-stacked-dark-margin.svg"-->
        <!--          alt="Sthlm Estate"-->
        <!--          style="max-width:400px; width: 80%; margin-bottom: 3rem;"-->
        <!--          :style="$vuetify.breakpoint.smAndDown ? 'margin-top: 4rem;' : ''"-->
        <!--        >-->
        <h1 class="mt-6 mb-3 px-4">
          {{ $t('ui.pages.contact.hero.title-1') }}
          <span v-if="$vuetify.breakpoint.smAndDown"><br></span>
          {{ $t('ui.pages.contact.hero.title-2') }}
        </h1>
        <p class="mx-4 my-9" style="font-size: 1.3rem; font-weight: 400">
          {{ $t('ui.pages.contact.hero.details') }}
        </p>
      </v-col>
    </v-row>
    <v-container class="team-container">
      <v-row v-if="employees && employees.length" class="justify-center">
        <v-col
          v-for="employee in employees"
          :key="employee.userId"
          :class="!employee.public ? 'd-none' : ''"
          cols="12"
          md="6"
          lg="4"
        >
          <employee-card :employee="employee" />
        </v-col>
      </v-row>
    </v-container>
    <mail-interest-form :title="'Kontakta Oss'" />
    <iframe
      width="100%"
      :height="$vuetify.breakpoint.mdAndDown ? 450 : 650"
      style="border:0"
      :style="$vuetify.theme.dark ? 'filter: invert(90%); grayscale(0);' : 'filter: grayscale(0);'"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      :src="mapSrc"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MailInterestForm from '~/components/MailInterestForm'
import { business } from '~/config/core'
// import { cacheEmployeeImage } from '~/images'

export default {
  name: 'ContactPage',
  components: { MailInterestForm },
  // async asyncData ({ $axios }) {
  //   $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  //   $axios.setHeader('Access-Control-Allow-Origin', '*')
  //   $axios.setHeader('Content-Type', 'application/json')
  //   const employees = await $axios.$get('User/GetAllUsers?customerId=M19854')
  //   for (let i = 0; i > employees.length; i++) {
  //     await cacheEmployeeImage($axios, employees[i].userId, employees[i].image)
  //       .then((res) => {
  //         employees[i].image = { ...res }
  //       })
  //       .catch(() => {
  //         console.log('Something went wrong with the employee image caching!')
  //       })
  //   }
  //   return { employees }
  // },
  // nuxtI18n: {
  //   paths: {
  //     sv: '/kontakta-oss',
  //     en: '/contact-us'
  //   }
  // },
  data: () => ({
    // employees: [],
    bgMode: false,
    mapSrc: business.location.mapSrc
  }),
  head () {
    return {
      title: 'Kontakta Oss',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: business.shortDesc
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      employees: 'employees'
    }),
    pageStyle () {
      const marginTop = this.$vuetify.breakpoint.smAndDown ? 'margin-top: 0;' : 'margin-top: 0;'
      return this.bgMode
        ? `${marginTop} background: linear-gradient(180deg, ${this.$vuetify.theme.dark ? 'rgba(0,0,0,.9), rgba(0,0,0, .5)' : 'rgba(255,255,255,.8) 60%, rgba(255,255,255, .5)'}), url('/sthlmestate-architecture-abstract-2.jpg');`
        : marginTop
    }
  }
}
</script>

<style lang="scss">
.team-container {
  padding: 50px 0 30px 0;
}
</style>
