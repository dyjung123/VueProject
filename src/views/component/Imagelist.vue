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

    <Imageview :moreLoadReq="scrolledToBottom"/>
  </div>
</template>

<script>
  import Imageview from './Imageview.vue'

  export default {
    data() {
      return {
        scrolledToBottom: false,
        eventDistanceFromBottom: 150 // 바텀으로부터 이 높이에서 이벤트 발동
      }
    },
    components: {
      Imageview
    },
    mounted() {
      window.addEventListener('scroll', this.detectScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.detectScroll);
    },
    watch: {
      scrolledToBottom(val, oldval) {
        this.moreLoadImg()
      }
    },
    methods: {
      detectScroll() {
        var pageTopToScrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) 
        let bottomOfWindow = pageTopToScrollTop + window.innerHeight > document.documentElement.offsetHeight - this.eventDistanceFromBottom

        if (bottomOfWindow) {
          console.log('scroll')
          this.scrolledToBottom = true // replace it with your code
        }
      },
      moreLoadImg() {
        console.log('moreLoad')
      }
    }
  }

</script>

<style>
@import '../../assets/css/gallery.css';
</style>
