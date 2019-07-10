<template>
  <div>
    <div class="work">
      <div class="category-buttons">
        <a href="#" :class="[category == 'all' ? 'active' : '']" @click.prevent="clickCategory" data-group="all">ALL</a>
        <a href="#" :class="[category == 'HAPPY' ? 'active' : '']" @click.prevent="clickCategory" data-group="HAPPY">HAPPY</a>
        <a href="#" :class="[category == 'SAD' ? 'active' : '']" @click.prevent="clickCategory" data-group="SAD">SAD</a>
        <a href="#" :class="[category == 'ANGRY' ? 'active' : '']" @click.prevent="clickCategory" data-group="ANGRY">ANGRY</a>
        <a href="#" :class="[category == 'CALM' ? 'active' : '']" @click.prevent="clickCategory" data-group="CALM">CALM</a>
        <a href="#" :class="[category == 'DISGUSTED' ? 'active' : '']" @click.prevent="clickCategory" data-group="DISGUSTED">DISGUSTED</a>
        <a href="#" :class="[category == 'CONFUSED' ? 'active' : '']" @click.prevent="clickCategory" data-group="CONFUSED">CONFUSED</a>
        <a href="#" :class="[category == 'SURPRISED' ? 'active': '']" @click.prevent="clickCategory" data-group="SURPRISED">SURPRISED</a>
      </div>
    </div>
    <Grid :category="category"/>
  </div>
</template>

<script>
  import Grid from './gridGallery.vue'

  export default {
    components: {
      Grid
    },
    data() {
      return {
        category: 'all'
      }
    },
    methods: {
      clickCategory(e) {
        console.log(e.target.dataset.group)
        this.category = e.target.dataset.group
      }
    }
  }

</script>

<style>
@import '../../assets/css/gallery.css';
</style>
