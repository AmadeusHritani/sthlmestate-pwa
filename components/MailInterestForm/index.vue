<template>
  <div class="mail-interest-form">
    <div class="form-wrapper">
      <h2 class="form-heading mb-7 text-center">
        <v-icon v-if="showEmailIcon" x-large class="mr-2" style="color:inherit; margin-top: -5px;">
          mdi-{{ titleIcon }}
        </v-icon>
        {{ title }}
      </h2>
      <v-card color="transparent" flat class="email-subject-group-wrapper">
        <v-radio-group
          v-model="subject"
          :disabled="sending"
          mandatory
          row
          class="email-subject-group"
          style="margin: 0 auto !important;"
        >
          <v-radio
            :label="$txt('ui.form.evaluate')"
            :value="$txt('ui.form.evaluate')"
            class="email-subject"
          />
          <v-radio
            :label="$txt('ui.form.buy')"
            :value="$txt('ui.form.buy')"
            class="email-subject"
          />
          <v-radio
            :label="$txt('ui.form.sell')"
            :value="$txt('ui.form.sell')"
            class="email-subject"
          />
        </v-radio-group>
      </v-card>
      <v-card color="transparent" flat>
        <v-form
          ref="mailInterestForm"
          v-model="valid"
          :dark="dark"
          :dense="dense"
          :disabled="sending"
          lazy-validation
          class="email-interest-form-element"
          @submit.prevent="validate"
        >
          <v-row>
            <v-col cols="12" sm="6">
              <div style="position: relative; height: 100%;">
                <v-text-field
                  v-model="fname"
                  :rules="fnameRules"
                  :dark="dark"
                  :single-line="singleLine"
                  :dense="dense"
                  :hide-details="hideDetails"
                  label="Förnamn *"
                  required
                  :filled="filled"
                  :outlined="outlined"
                />
                <v-text-field
                  v-model="lname"
                  :rules="lnameRules"
                  :dark="dark"
                  :single-line="singleLine"
                  :dense="dense"
                  :hide-details="hideDetails"
                  label="Efternamn *"
                  required
                  :filled="filled"
                  :outlined="outlined"
                />

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  :dark="dark"
                  :single-line="singleLine"
                  :dense="dense"
                  :hide-details="hideDetails"
                  label="E-post *"
                  required
                  :filled="filled"
                  :outlined="outlined"
                  type="email"
                />

                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  :dark="dark"
                  :single-line="singleLine"
                  :dense="dense"
                  :hide-details="hideDetails"
                  label="Telefonnummer *"
                  required
                  :filled="filled"
                  :outlined="outlined"
                />
                <v-checkbox
                  v-if="!$vuetify.breakpoint.smAndDown"
                  v-model="checkbox"
                  :rules="[v => !!v || $txt('ui.interest-privacy-error')]"
                  :dark="dark"
                  :hide-details="hideDetails"
                  class="agree"
                  required
                >
                  <template #label>
                    <div>
                      <span class="d-inline-block">
                        {{ $txt('ui.interest-privacy-text1') }}
                      </span>
                      <a
                        target="_blank"
                        href="/privacy"
                        class="d-inline mr-1"
                        @click.stop
                      >
                        {{ $txt('ui.interest-privacy-hint') }}
                      </a>
                      <span class="d-inline">
                        {{ $txt('ui.interest-privacy-text2') }}
                      </span>
                    </div>
                  </template>
                </v-checkbox>
                <div
                  v-if="type && !$vuetify.breakpoint.smAndDown"
                  :class="`msg-span ${type} outlined`"
                  class="text-center text-uppercase"
                  style="font-size: smaller; font-family: Barlow, Arial; bottom: 4px; margin: 0; position: absolute; width: 100%;"
                >
                  <div class="text-center" style="width: 100%;">
                    {{ result }}
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="area"
                :dark="dark"
                :single-line="singleLine"
                :dense="dense"
                :hide-details="hideDetails"
                label="Område"
                :filled="filled"
                :outlined="outlined"
              />
              <v-text-field
                v-model="rooms"
                :dark="dark"
                :single-line="singleLine"
                :dense="dense"
                :hide-details="hideDetails"
                label="Antal rum"
                :filled="filled"
                :outlined="outlined"
              />

              <v-text-field
                v-model="space"
                :dark="dark"
                :single-line="singleLine"
                :dense="dense"
                :hide-details="hideDetails"
                label="Kvm"
                :filled="filled"
                :outlined="outlined"
              />
              <v-textarea
                v-model="message"
                :dark="dark"
                :single-line="singleLine"
                :dense="dense"
                :hide-details="hideDetails"
                label="Meddelande"
                rows="4"
                :filled="filled"
                outlined
                auto-grow
              />
              <v-checkbox
                v-if="$vuetify.breakpoint.smAndDown"
                v-model="checkbox"
                :rules="[v => !!v || $txt('ui.interest-privacy-error')]"
                :dark="dark"
                :hide-details="hideDetails"
                label=""
                class="agree"
                required
              >
                <template #label>
                  <div>
                    Jag samtycker till att Sthlm Estate registrerar ovan uppgifter och kontaktar mig via mejl eller telefon.
                    <v-tooltip bottom>
                      <template #activator="{ on }">
                        <a
                          target="_blank"
                          href="/privacy"
                          @click.stop
                          v-on="on"
                        >
                          Läs mer här
                        </a>
                      </template>
                      Policy för hantering av personuppgifter
                    </v-tooltip>
                  </div>
                </template>
              </v-checkbox>
              <v-btn
                :disabled="!ready || sending"
                :loading="sending"
                :dark="dark"
                :block="$vuetify.breakpoint.smAndDown"
                type="submit"
                elevation="0"
              >
                {{ $txt('ui.send') }}
                <v-icon right>
                  mdi-send
                </v-icon>
              </v-btn>
              <div
                v-if="type && $vuetify.breakpoint.smAndDown"
                :class="`msg-span ${type} outlined`"
                class="text-center text-uppercase mt-4"
                style="font-size: smaller; font-family: Barlow, Arial; width: 100%;"
              >
                <div class="text-center" style="width: 100%;">
                  {{ result }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="type"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import axios from 'axios'
import { init, send } from '@emailjs/browser'

export default {
  name: 'MailInterestForm',
  props: {
    showEmailIcon: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    },
    filled: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: true
    },
    singleLine: {
      type: Boolean,
      default: true
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Anmäl Intresse'
    },
    titleIcon: {
      type: String,
      default: 'email-arrow-right-outline'
    }
  },
  data: () => ({
    subject: null,
    snackbar: false,
    sending: false,
    text: '',
    result: '',
    timeout: 4000,
    type: null,
    valid: false,
    fname: '',
    lname: '',
    email: '',
    phone: '',
    area: '',
    rooms: '',
    space: '',
    message: '',
    checkbox: true,
    fnameRules: [
      v => !!v || 'Förnamn krävs.'
      // v => (v && v.length >= 3) || 'Förnamn måste vara mindre än 3 tecken.'
    ],
    lnameRules: [
      v => !!v || 'Efternamn krävs.'
      // v => (v && v.length <= 4) || 'Efternamnet måste vara mindre än 4 tecken'
    ],
    emailRules: [
      v => !!v || 'E-post krävs',
      v => /.+@.+\..+/.test(v) || 'Detta är inte ett giltigt e-postadress.'
    ],
    phoneRules: [
      v => !!v || 'Telefonnummer krävs',
      v => Number.isInteger(Number(v)) || 'Telefonnumret måste mig ett nummer'
    ]
  }),
  computed: {
    ready () {
      return this.fname && this.lname && this.email && this.phone && this.checkbox && this.valid
    },
    emailForm () {
      return {
        from: 'Sthlm Estate App',
        subject: `New "${this.subject} Application" (SE App)`,
        reply_to: this.email,
        lead: this.subject,
        name: `${this.fname} ${this.lname}`,
        email: this.email,
        phone: this.phone,
        area: this.area || 'Not Provided',
        rooms: this.rooms || 'Not Provided',
        space: this.space || 'Not Provided',
        message: this.message || 'Not Provided'
      }
    },
    msg () {
      return {
        text: `Message from: ${this.fname} ${this.lname}`,
        html: `Message from:<br>${this.fname} ${this.lname}`
      }
    }
  },
  methods: {
    async sendEmail () {
      if (this.ready) {
        let worked = false
        this.sending = true
        init('GZxacPLfcokHGiWq6')
        await send('service_sthlmestate_one', 'template_w5ngf7f', this.emailForm)
          .then(function (response) {
            console.log('SUCCESS!', response.status, response.text)
            worked = true
          }, function (error) {
            console.log('FAILED...', error)
          })
        this.type = worked ? 'success' : 'error'
        this.text = worked ? 'Your interest was sent successfully' : 'There was an error. Please try again'
        this.result = worked ? this.$txt('ui.email-success-msg') : this.$txt('ui.email-error-msg')
        this.sending = false
        this.snackbar = true
        // Reset form field
        this.reset()
      }
    },
    async validate () {
      if (this.$refs.mailInterestForm.validate()) {
        await this.sendEmail()
          .then((response) => {
            console.log('Sent successfully!')
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    reset () {
      this.$refs.mailInterestForm.reset()
    },
    resetValidation () {
      this.$refs.mailInterestForm.resetValidation()
    }
  }
}
</script>

<style lang="scss">
.v-messages__message {
  font-family: $heading-font-family;
  font-weight: 300;
}
.agree {
  label {
    font-size: .8rem;
    line-height: 1.2 !important;
  }
}
.mail-interest-form {
  padding: 40px 0;
}
.form-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 10px;
}
.email-interest-form-element {
  padding: 20px;
  //box-shadow: 0 4px 8px rgba(0,0,0,.3);
}

.v-text-field fieldset {
  border: none !important;
}

.email-subject-group-wrapper {
  text-align: center;
  padding: 10px 0 6px 0;
}
.email-subject-group {
  max-width: 420px !important;
  margin: 0 auto;
  .v-messages {
    display: none;
    margin: 0;
    padding: 0;
    height: 0;
  }
  &.v-input--radio-group--row .v-input--radio-group__input {
    justify-content: space-evenly !important;
  }
  &.v-input--radio-group.v-input--radio-group--row .v-radio {
    margin: 0 !important;
  }
}

.email-subject {
  .v-label {
    font-family: $heading-font-family;
    font-size: 1rem;
    //font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
}

.v-application.theme--light {
  .mail-interest-form {
    background-color: transparent;
  }
  //.email-interest-form-element {
  //  border-top: solid 2px var(--v-secondary-base);
  //}
}
.v-application.theme--dark {
  .mail-interest-form {
    background-color: #0a0a0a;
  }
  //.email-interest-form-element {
  //  border-top: solid 2px #0a0a0a;
  //}
}
</style>
