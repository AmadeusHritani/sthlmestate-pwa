<template>
  <div class="estate-interest-form" style="position: relative;">
    <h2 class="form-heading mb-1 mt-7">
      <!--      <v-icon x-large class="mr-2" style="color:inherit; margin-top: -5px;">-->
      <!--        mdi-{{ titleIcon }}-->
      <!--      </v-icon>-->
      {{ title }}
    </h2>
    <div class="estate-interest-form-wrapper">
      <div class="mb-3">
        <v-row>
          <v-col cols="12" :sm="viewings && viewings.length ? 6 : 6">
            <div style="margin: 5px 0 20px 0; font-size: .7rem; font-style: italic; opacity: .8;">
              <!--              <v-icon small class="mr-1">-->
              <!--                mdi-information-outline-->
              <!--              </v-icon>-->
              <span>
                {{ $txt('ui.viewings.messages.form') }}
              </span>
            </div>
            <v-form
              ref="interestForm"
              v-model="valid"
              :dark="dark"
              :dense="dense"
              lazy-validation
              @submit.prevent="validate"
            >
              <v-text-field
                v-model="fname"
                :rules="fnameRules"
                :dark="dark"
                :single-line="singleLine"
                :disabled="overlay"
                label="Förnamn *"
                required
                :dense="dense"
                outlined
                filled
              />
              <v-text-field
                v-model="lname"
                :rules="lnameRules"
                :dark="dark"
                :single-line="singleLine"
                :disabled="overlay"
                label="Efternamn *"
                required
                :dense="dense"
                outlined
                filled
              />

              <v-text-field
                v-model="email"
                :rules="emailRules"
                :dark="dark"
                :single-line="singleLine"
                :disabled="overlay"
                label="E-post *"
                required
                :dense="dense"
                outlined
                filled
              />

              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                :dark="dark"
                :single-line="singleLine"
                :disabled="overlay"
                label="Telefonnummer *"
                required
                :dense="dense"
                outlined
                filled
              />

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || $txt('ui.interest-privacy-error')]"
                :dark="dark"
                :disabled="overlay"
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

              <div v-if="(!viewings || !viewings.length) && !$vuetify.breakpoint.smAndDown" class="mt-3">
                <v-btn
                  :disabled="!ready || overlay"
                  :loading="overlay"
                  :dark="dark"
                  :block="$vuetify.breakpoint.smAndDown"
                  type="submit"
                >
                  {{ $txt('ui.send') }}
                  <v-icon right>
                    mdi-send
                  </v-icon>
                </v-btn>

                <span v-if="type" :class="`msg-span ${type}`" class="ml-4">
                  {{ text }}
                </span>
              </div>
            </v-form>
          </v-col>
          <v-col cols="12" sm="6">
            <h3 class="d-flex align-center" style="margin-bottom: 16px;">
              <!--              <v-icon large class="mr-2">-->
              <!--                mdi-clipboard-text-clock-->
              <!--              </v-icon>-->
              <span>
                <span class="d-block">
                  {{ $txt('ui.viewings.label') }}
                </span>
                <span
                  class="text-subtitle-2 d-block text--disabled"
                  style="text-transform: none; line-height: 1;"
                >
                  {{ !viewings || !viewings.length ? $txt('ui.viewings.messages.vi.main') : $txt('ui.viewings.messages.is.main') }}
                </span>
              </span>
            </h3>
            <div v-if="viewings && viewings.length" :style="!$vuetify.breakpoint.smAndDown ? 'min-height: auto;' : ''">
              <v-item-group
                v-model="selected"
                mandatory
              >
                <v-row no-gutters>
                  <v-col
                    v-for="(viewing, i) in viewings"
                    :key="i"
                    cols="12"
                    align-self="center"
                  >
                    <v-item v-slot="{ active, toggle }" :disabled="overlay">
                      <v-card
                        :style="active ? $vuetify.theme.dark ? 'border: solid thin rgba(130,130,130,.2); border-bottom: solid 2px var(--v-success-base); box-shadow: 0 3px 7px rgba(0,0,0,.99) inset !important;' : 'border: solid thin rgba(200,200,200,.5); border-bottom: solid 2px var(--v-success-base); box-shadow: 0 1px 5px rgba(0,0,0,.1) inset !important;' : `border-bottom: solid 2px rgba(${$vuetify.theme.dark ? '0,0,0' : '255,255,255'},1 );`"
                        :color="active ? '' : $vuetify.theme.dark ? '#111111' : '#ececec'"
                        :title="active ? '' : $txt('ui.viewings.messages.deselected-title')"
                        :disabled="overlay"
                        class="pa-2 viewing-card"
                        flat
                        @click="toggle"
                        @mousedown="toggleViewing(viewing)"
                      >
                        <v-row dense align="center">
                          <v-col cols="auto">
                            <v-btn :style="active ? 'color: var(--v-success-base);' : ''" icon>
                              <v-scroll-y-transition hide-on-leave>
                                <v-icon v-if="active" color="success">
                                  mdi-calendar-check
                                </v-icon>
                              </v-scroll-y-transition>
                              <v-scroll-y-reverse-transition hide-on-leave>
                                <v-icon v-if="!active" style="color: var(--v-primary-lighten3); opacity: .8;">
                                  mdi-calendar-month
                                </v-icon>
                              </v-scroll-y-reverse-transition>
                            </v-btn>
                          </v-col>
                          <v-col cols="fill" class="text-left">
                            <div :style="active ? 'font-weight: 400;' : ''" style="font-size: .9rem; line-height: 1;" class="mb-1">
                              {{ viewing.date }}
                            </div>
                            <div style="font-size:.8rem; position: relative; line-height: 1;">
                              {{ viewing.start }} - {{ viewing.end }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>
              <v-expansion-panels v-model="moreOptions" flat accordion>
                <v-expansion-panel :disabled="overlay" style="background-color: transparent; margin-top: 10px;" class="">
                  <v-expansion-panel-header :disabled="!hasViewingSelected || overlay" class="more-options v-btn v-btn--outlined">
                    {{ !hasViewingSelected ? $txt('ui.viewings.no-options') : moreOptions === 0 ? $txt('ui.viewings.more-options') : $txt('ui.viewings.less-options') }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="mt-2">
                    <v-row dense class="interest-form-options">
                      <v-col cols="6" lg="4">
                        <v-switch
                          v-model="smsReminder"
                          :label="$txt('ui.viewings.sms-reminder')"
                          color="success"
                          class="mt-1 sms-switch"
                        />
                      </v-col>
                      <v-col cols="6" lg="4">
                        <v-select
                          v-model="selectedReminderTime"
                          :disabled="reminderTimesDisabled"
                          :items="reminderTimes"
                          :menu-props="{ bottom: true, offsetY: true }"
                          :prepend-icon="`mdi-alarm${reminderTimesDisabled ? '-off' : ''}`"
                          item-text="text"
                          item-value="value"
                          :label="$txt('ui.viewings.select-time')"
                          item-disabled="2"
                          class="reminder-time-select"
                          return-object
                          hide-details
                          single-line
                          flat
                          dense
                          solo
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <v-card
              :style="!$vuetify.breakpoint.lgAndDown ? 'margin-top: 5px;' : 'margin: 5px 0 10px 0;'"
              outlined
              flat
              style="font-size: smaller; padding: 15px 10px;"
            >
              <template v-if="viewings && viewings.length">
                <div :style="formReady ? 'color: var(--v-success-base);' : ''" class="mb-2" style="opacity: 1;">
                  <v-icon :color="formReady ? 'success' : ''" small class="mr-1" style="margin-top: -2px;">
                    mdi-{{ formReady ? 'check-circle-outline' : 'information-outline' }}
                  </v-icon>
                  {{ formReady ? $txt('ui.viewings.messages.is.form-filled') : $txt('ui.viewings.messages.is.form-unfilled') }}
                </div>
                <div :style="hasViewingSelected ? 'color: var(--v-success-base);' : ''" class="mb-2" style="opacity: 1;">
                  <v-icon :color="hasViewingSelected ? 'success' : ''" small class="mr-1" style="margin-top: -2px;">
                    mdi-{{ hasViewingSelected ? 'check-circle-outline' : 'information-outline' }}
                  </v-icon>
                  {{ !hasViewingSelected ? $txt('ui.viewings.messages.deselected') : `${$txt('ui.viewings.messages.selected-one')}` }}
                  <b v-if="hasViewingSelected && selectedViewing">
                    {{ sts.day }} / {{ sts.startsAt }} - {{ sts.endsAt }}
                  </b>
                </div>
                <div class="mt-5">
                  <v-icon small class="mr-1" style="opacity: .5; margin-top: -2px;">
                    mdi-help-circle-outline
                  </v-icon>
                  <span style="opacity: .5">
                    {{ $txt('ui.viewings.messages.is.call') }}
                  </span>
                  <a :href="`tel:${$txt('ui.phone-number')}`" style="opacity: .7">{{ $txt('ui.phone-number') }}</a>.
                </div>
              </template>
              <template v-else>
                <div class="mb-2 d-flex align-start">
                  <v-icon small class="mr-3">
                    mdi-phone-dial
                  </v-icon>
                  <span>
                    {{ $txt('ui.viewings.messages.vi.call') }}
                    <a :href="`tel:${$txt('ui.phone-number')}`">{{ $txt('ui.phone-number') }}</a>.
                  </span>
                </div>
                <div class="d-flex align-start">
                  <v-icon small class="mr-3">
                    mdi-email-{{ formReady ? 'check-' : '' }}outline
                  </v-icon>
                  <span>
                    {{ formReady ? $txt('ui.viewings.messages.vi.form-filled') : $txt('ui.viewings.messages.vi.form-unfilled') }}
                  </span>
                </div>
              </template>
            </v-card>
            <div v-if="(viewings && viewings.length) || $vuetify.breakpoint.smAndDown" :style="$vuetify.breakpoint.smAndDown ? '' : 'width: auto; margin-top: 0 !important;'" class="mt-3">
              <v-btn
                :disabled="!ready || overlay"
                :loading="overlay"
                :dark="dark"
                :block="$vuetify.breakpoint.smAndDown"
                outlined
                class="mt-3"
                @click.prevent="validate"
              >
                {{ $txt('ui.send') }}
                <v-icon right>
                  mdi-send
                </v-icon>
              </v-btn>

              <div v-if="type" :style="$vuetify.breakpoint.smAndDown ? 'width: 100%;' : ''" :class="`msg-span ${type}`" class="mt-3" style="justify-content: center;">
                {{ text }}
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- <v-overlay
      :opacity="'.5'"
      :value="overlay"
      absolute
    >
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay> -->

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
import core from '~/config/core'
import init from '~/config/init'

export default {
  name: 'EstateInterestForm',
  props: {
    estateId: {
      type: String,
      required: true
    },
    estateBrokerId: {
      type: String,
      required: true
    },
    dark: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    singleLine: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Anmäl Intresse'
    },
    titleIcon: {
      type: String,
      default: 'email-arrow-right-outline'
    },
    viewings: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    moreOptions: [],
    smsReminder: true,
    reminderTimesDisabled: false,
    consent: 'Jag har tagit del av information om behandling av personuppgifter och samtycker till att mina uppgifter sparas.',
    reminderTimes: [
      {
        text: '10 minuter',
        value: 10
      }, {
        text: '30 minuter',
        value: 30
      }, {
        text: '1 hour',
        value: 60
      }, {
        text: '3 hours',
        value: 180
      }, {
        text: '1 day',
        value: 1440
      }, {
        text: 'avstängd',
        value: 'off'
      }
    ],
    selectedReminderTime: {
      text: '30 minuter',
      value: 30
    },
    overlay: false,
    snackbar: false,
    text: 'My timeout is set to 2000.',
    timeout: 4000,
    type: null,
    selected: null,
    msg: {
      default: 'Vänligen klicka på rutorna med de tider du vill se bostaden. Vi kontaktar dig för vidare schemaläggning.',
      selected: 'Du har valt visningstider. Klicka igen för att avmarkera.'
    },
    valid: false,
    fname: '',
    lname: '',
    email: '',
    phone: '',
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
      v => Number.isInteger(Number(v)) || 'Telefonnumret måste mig ett nummer',
      v => String(v).length > 0 || 'Detta är inte ett giltigt telefonnummer.'
    ],
    detailedViewings: null
  }),
  computed: {
    sts () {
      if (this.selectedViewing) {
        return {
          day: new Date(this.selectedViewing.startsAt)
            .toLocaleString('SV', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }),
          startsAt: new Date(this.selectedViewing.startsAt)
            .toLocaleString('SV', {
              hour: '2-digit',
              minute: '2-digit'
            }),
          endsAt: new Date(this.selectedViewing.endsAt)
            .toLocaleString('SV', {
              hour: '2-digit',
              minute: '2-digit'
            })
        }
      } else {
        return null
      }
    },
    viewingsData () {
      return {
        updatePerson: {
          firstName: this.fname,
          lastName: this.lname,
          cellPhone: this.phone,
          customerId: init.customerId,
          obtainThrough: 'Interest',
          GDPRApprovalDate: new Date().toISOString(),
          email: {
            emailAddress: this.email
          },
          userId: this.estateBrokerId,
          wishAdvertising: true,
          note: 'Person was added or updated through Sthlm-Estate-App.'
        },
        participated: false,
        reminderTime: this.selectedReminderTime.value,
        smsReminder: this.smsReminder,
        mailConfirmation: true,
        smsConfirmation: true,
        returnBookingId: true,
        contactMessage: 'Booked through Sthlm-Estate-App.',
        options: {
          isDeadlineValidationEnabled: true,
          enableBookingLimitValidation: false
        }
      }
    },
    formReady () {
      return this.fname && this.lname && this.email && this.phone && this.checkbox && this.valid
    },
    ready () {
      let ready = this.fname && this.lname && this.email && this.phone && this.checkbox && this.valid
      if (this.viewings && this.viewings.length) {
        ready = ready && this.hasViewingSelected
      }
      return ready
    },
    request () {
      return {
        updatePerson: {
          firstName: this.fname,
          lastName: this.lname,
          cellPhone: this.phone,
          customerId: core.api.customerId,
          obtainThrough: 'Interest',
          email: {
            emailAddress: this.email
          },
          userId: this.estateBrokerId,
          wishAdvertising: true,
          note: 'Person was added or updated from Sthlm-Estate-App.'
        },
        estateId: this.estateId,
        interestNote: 'Interest was initiated from Sthlm-Estate-App.',
        notifyUser: true
      }
    },
    selectedViewing () {
      if (
        this.detailedViewings &&
        this.detailedViewings.length &&
        this.viewings.find((vi, index) => this.selected === index).source
      ) {
        const viewingRender = this.viewings.find((vi, index) => this.selected === index)
        const viewingItem = { ...viewingRender.source }
        const viewing = this.detailedViewings.find(detailedViewing => detailedViewing.id === viewingItem.id)
        viewing.render = { ...viewingRender }
        delete viewing.render.source
        return viewing
      } else {
        return null
      }
    },
    hasViewingSelected () {
      return typeof this.selected !== 'undefined'
    }
  },
  watch: {
    selectedReminderTimeValue (value) {
      if (value === 'off') {
        this.smsReminder = false
      }
    },
    selected (selected) {
      this.moreOptions = !!selected
    },
    smsReminder (smsReminder) {
      if (!smsReminder) {
        this.selectedReminderTime = {
          text: 'avstängd',
          value: 'off'
        }
        this.reminderTimesDisabled = true
      } else {
        this.selectedReminderTime = {
          text: '30 minuter',
          value: 30
        }
        this.reminderTimesDisabled = false
      }
    }
  },
  created () {
    this.getViewings(this.estateId)
  },
  methods: {
    async getViewings (estateId) {
      this.$axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
      this.$axios.setHeader('Access-Control-Allow-Origin', '*')
      this.$axios.setHeader('Content-Type', 'application/json')
      const estateViewingsEp = `${core.api.requests.endpoints.getViewings.action}${estateId}`
      await this.$axios.$get(estateViewingsEp)
        .then((response) => {
          this.detailedViewings = response
        })
    },
    toggleViewing (viewing) {
      const targetViewing = this.viewings.find(v => v.start === viewing.start && v.date === viewing.date)
      targetViewing.active = !targetViewing.active
    },
    async validate () {
      if (this.$refs.interestForm.validate() && this.formReady && (!this.viewings.length || (!!this.selected || this.selected === 0))) {
        this.overlay = true
        this.snackbar = false
        this.$axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
        this.$axios.setHeader('Access-Control-Allow-Origin', '*')
        this.$axios.setHeader('Content-Type', 'application/json')
        const interestEp = `${core.api.requests.endpoints.interest.action}`

        await this.$axios.$post(interestEp, this.request)
          .then(() => {
            this.type = 'success'
            this.text = 'Your interest was sent successfully'
          })
          .catch((error) => {
            console.log(error)
            this.type = 'error'
            this.text = 'There was an error. Please try again'
          })

        this.overlay = false
        this.snackbar = true
        const sv = this.selectedViewing
        if (sv.timeSlots && sv.timeSlots.length) {
          this.overlay = true
          // this.snackbar = false
          const estateViewingsEp = `${core.api.requests.endpoints.postViewings.action}${sv.id}/${sv.timeSlots[0].id}/Participant`
          await this.$axios.$post(estateViewingsEp, this.viewingsData)
            .then((res) => {
              console.log(res)
              this.type = 'success'
              this.text = `Viewing "${this.sts.day} (${this.sts.startsAt} - ${this.sts.endsAt})" was booked successfully`
              this.overlay = false
              this.snackbar = true
            }).catch((res, err) => {
              console.log(err)
              console.log(res)
              this.type = 'error'
              this.text = `There was an error booking "${this.sts.day} (${this.sts.startsAt} - ${this.sts.endsAt})".${res.validationErrors ? ' ' + res.validationErrors[0] : ''}`
              this.overlay = false
              this.snackbar = true
            })
        }
        this.overlay = false
        this.snackbar = true
        this.reset()
      }
    },
    reset () {
      this.$refs.interestForm.reset()
    },
    resetValidation () {
      this.$refs.interestForm.resetValidation()
    }
  }
}
</script>

<style lang="scss">
.v-text-field fieldset {
  border: none !important;
}

.estate-interest-form {
  .v-expansion-panel-content__wrap {
    padding: 0 !important;
    flex: 1 1 auto;
    max-width: 100%;
  }
  .v-expansion-panel--active > .v-expansion-panel-header {
    min-height: auto !important;
  }
}
.reminder-time-select {
  &.v-input {
    font-size: 1rem;
  }
}
.sms-switch {
  .v-label {
    font-size: 1rem !important;
  }
  .v-messages {
    display: none;
    margin: 0;
    padding: 0;
    height: 0;
  }
}
.more-options {
  &.v-expansion-panel-header {
    opacity: .6;
    text-align: center !important;
    min-height: auto;
    width: auto;
    min-width: 140px;
    font-family: $heading-font-family;
    text-transform: uppercase;
    font-size: .9rem !important;
    //border: none !important;
    display: flex;
    padding: 5px 10px 5px 15px !important;
    .v-icon {
      font-size: 1rem !important;
    }
    .v-expansion-panel-header__icon {
      margin-left: 5px !important;
    }
  }
}
.v-application .msg-span {
  min-height: 36px;
  min-width: 64px;
  padding: 5px 10px;
  align-items: center;
  border-radius: 0;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  font-size: smaller;
  letter-spacing: 0.0892857143em;
  justify-content: left;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  white-space: unset;
  &.success {
    color: white;
    background-color: rgba(120,120,120,.5);
  }
  &.error {
    background-color: transparent !important;
    color: var(--v-error-base);
    border: thin solid var(--v-error-base);
  }
}
.viewing-card {
  position: relative;
  overflow: hidden;
  border: thin dashed #333333;
  &.v-card--link:focus:before {
    opacity: 0;
    background-color: var(--v-secondary-base);
  }
  &.v-item--active.v-card--link:focus:before {
    opacity: 0;
    background-color: var(--v-secondary-base);
  }
  // &.v-item--active {
  //   font-weight: 600;
  // }
  &.v-item--active:before {
    opacity: 0;
    background-color: var(--v-secondary-base);
  }
}

.v-application.theme--dark {
  .viewing-card {
    &.v-item--active.v-card--link:focus:before {
      background-color: var(--v-primary);
    }
    &.v-item--active:before {
      background-color: var(--v-primary);
    }
  }
}

@media (max-width: 550px) {
  .more-options {
    &.v-expansion-panel-header {
      display: block;
      width: 100%;
    }
  }
  .sms-switch {
    .v-label {
      margin-left: 10px;
      font-size: .8rem !important;
    }
  }
  .reminder-time-select {
    &.v-input {
      font-size: .8rem;
    }
  }
}
</style>
