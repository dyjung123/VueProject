<template>

  <div class="work">
    <div class="category-buttons">
      <a href="#" class="active all" data-group="all">All</a>
      <a href="#" data-group="HAPPY">HAPPY</a>
      <a href="#" data-group="SAD">SAD</a>
      <a href="#" data-group="ANGRY">ANGRY</a>
      <a href="#" data-group="CALM">CALM</a>
      <a href="#" data-group="DISGUSTED">DISGUSTED</a>
      <a href="#" data-group="CONFUSED">CONFUSED</a>
      <a href="#" data-group="SURPRISED">SURPRISED</a>
    </div>

    <Imageview />
  </div>
</template>

<script>
  import Imageview from './Imageview.vue'

  export default {
    components: {
      Imageview
    }
  }

</script>

<style>
@import '../assets/css/gallery.css';
</style>
