<template>
    
</template>

<script>
export default {
  data() {
    return {
      scrolledToBottom: false,
      eventDistanceFromBottom: 20 // 바텀으로부터 이 높이에서 이벤트 발동
    }
  },
  mounted() {
    window.addEventListener('scroll', this.detectScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.detectScroll);
  },
  watch: {
    scrolledToBottom(val, oldval) {
      if (val) {
        this.$emit('scrollEvt')
        setTimeout(() => {
          this.scrolledToBottom = false
        }, 250)
      }
    }
  },
  methods: {
    detectScroll() {
      var pageTopToScrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) 
      let bottomOfWindow = pageTopToScrollTop + window.innerHeight > document.documentElement.offsetHeight - this.eventDistanceFromBottom

      if (bottomOfWindow) {
        this.scrolledToBottom = true // replace it with your code
      }
    }
  }
}
</script>

<style>

</style>
