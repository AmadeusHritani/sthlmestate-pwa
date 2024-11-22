<template>
  <div class="gallery-item">
    <div class="overlay">
      <div class="tools">
        <v-btn absolute large outlined>
          View
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EstateGalleryImage',
  components: {},
  data: () => ({
    gorseller: [
      { title: 'img 1', url: 'https://picsum.photos/500/300?image=1' },
      { title: 'img 2', url: 'https://picsum.photos/500/300?image=2' }
    ],
    index: null
  })
}
</script>
