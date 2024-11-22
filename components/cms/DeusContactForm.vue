<template>
  <div class="estate-contact-form-wrapper" :style="nomargin ? 'margin: 0 !important;' : ''">
    <h2 :style="dark ? 'color: #FFFFFF;' : ''" class="form-heading mb-5">
      Kontakta Oss
    </h2>
    <v-form
      ref="form"
      v-model="valid"
      :dark="dark"
      :dense="dense"
      lazy-validation
    >
      <v-text-field
        v-model="fname"
        :rules="fnameRules"
        :dark="dark"
        :single-line="dense"
        label="Förnamn"
        required
        filled
        dense
      />
      <v-text-field
        v-model="lname"
        :rules="lnameRules"
        :dark="dark"
        :single-line="dense"
        label="Efternamn"
        required
        filled
        dense
      />

      <v-text-field
        v-model="email"
        :rules="emailRules"
        :dark="dark"
        :single-line="dense"
        label="E-post"
        required
        filled
        dense
      />

      <v-text-field
        v-model="phone"
        :rules="phoneRules"
        :dark="dark"
        :single-line="dense"
        label="Telefonnummer"
        required
        filled
        dense
      />

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'Du måste godkänna att bli kontaktad.']"
        :dark="dark"
        label="Jag samtycker till att bli kontaktad"
        required
      />

      <v-btn
        :disabled="!valid"
        :dark="dark"
        outlined
        class="mr-4"
        @click="validate"
      >
        Skicka
      </v-btn>

      <!-- <v-btn
        color="error"
        class="mr-4"
        :dark="dark"
        outlined
        @click="reset"
      >
        Återställa
      </v-btn> -->
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'DeusContactForm',
  props: {
    nomargin: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Anmäl Intresse'
    }
  },
  data: () => ({
    valid: true,
    fname: '',
    lname: '',
    fnameRules: [
      v => !!v || 'Förnamn krävs.'
      // v => (v && v.length >= 3) || 'Förnamn måste vara mindre än 3 tecken.'
    ],
    lnameRules: [
      v => !!v || 'Efternamn krävs.'
      // v => (v && v.length <= 4) || 'Efternamnet måste vara mindre än 4 tecken'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-post krävs',
      v => /.+@.+\..+/.test(v) || 'Detta är inte ett giltigt e-postadress.'
    ],
    phone: '',
    phoneRules: [
      v => !!v || 'Telefonnummer krävs',
      v => Number.isInteger(Number(v)) || 'Telefonnumret måste mig ett nummer'
      // v => String(v).length > 11 || 'Detta är inte ett giltigt telefonnummer'
    ],
    select: null,
    checkbox: false
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped lang="scss">
.estate-contact-form-wrapper {
  margin: 40px 0;
  padding: 20px;
  border: thin solid #999999;
}
</style>
