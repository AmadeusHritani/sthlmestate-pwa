<script>
import { mapState } from 'vuex'

export default {
  name: 'PageAbstract',
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      navigator: 'navigator'
    })
  }
}
</script>
