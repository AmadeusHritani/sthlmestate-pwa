<template>
  <v-card class="employee-card">
    <div v-if="employee.image.cdnReferences" class="employee-image-wrapper">
      <img
        :src="employee.image.cdnReferences[0]"
        :alt="employee.userName"
      >
    </div>
    <div class="pa-5 pb-1">
      <div class="employee-name">
        {{ employee.userName }}
      </div>
      <div class="employee-title">
        <span class="capitalize">
          {{ employee.title.toLowerCase() || '&nbsp;' }}
        </span>
      </div>
      <div class="employee-info">
        <a :href="`tel:${employee.cellPhone}`">{{ employee.cellPhone }}</a><br>
        <a :href="`mailto:${employee.emailAddress}`">{{ employee.emailAddress }}</a>
      </div>
    </div>
    <!--    <v-btn-->
    <!--      color="primary"-->
    <!--      dark-->
    <!--      @click.stop="more = true"-->
    <!--    >-->
    <!--      {{ $t('ui.read-more') }}-->
    <!--    </v-btn>-->
    <!--    <v-dialog-->
    <!--      v-model="dialog"-->
    <!--      transition="dialog-bottom-transition"-->
    <!--      max-width="600"-->
    <!--    >-->
    <!--      <v-card>-->
    <!--        <v-toolbar-->
    <!--          color="primary"-->
    <!--          dark-->
    <!--        >-->
    <!--          Opening from the bottom-->
    <!--        </v-toolbar>-->
    <!--        <v-card-text>-->
    <!--          <div class="text-h2 pa-12">-->
    <!--            Hello world!-->
    <!--          </div>-->
    <!--        </v-card-text>-->
    <!--        <v-card-actions class="justify-end">-->
    <!--          <v-btn-->
    <!--            text-->
    <!--            @click="more = false"-->
    <!--          >-->
    <!--            Close-->
    <!--          </v-btn>-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
  </v-card>
</template>

<script>
export default {
  name: 'EmployeeCard',
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // more: false
    }
  }
}
</script>
<style lang="scss">
.employee-card {
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.employee-name {
  font-family: $heading-font-family;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 600;
}
.employee-title {
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 400;
  text-transform: lowercase;
}

.capitalize {
  text-transform: capitalize;
}

.employee-info {
  padding: 15px 0;
  font-size: 1rem;
  font-weight: 400;
}

.employee-image-wrapper img {
  width: 100%;
  height: auto;
}

.employee-image-wrapper {
  margin: 0;
  overflow-x: hidden;
  min-height: 410px;
}

</style>
