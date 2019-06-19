<template>
  <div>
    <navbar v-if="isCheckAuth" />
    <router-view v-if="isCheckAuth"></router-view>
    <loading v-else :size="getSize"/>
  </div>
</template>

<script>
import navbar from './views/nav'
import loading from './views/loading'
import firebase from './firebase'
import aws from './aws'
import { mapState, mapActions } from 'vuex'

export default {
  created(){
    console.log('created app login check')
    firebase.isLogin()
  },
  mounted() {
    var self = this
    $(window).resize(() => {
      self.windowHeight = window.innerHeight
    })
  },
  destroyed() {
    $(window).off('resize')
  },
  data() {
    return {
      'windowHeight': window.innerHeight
    }
  },
  computed: { // data 미리 데이터에 대해 계산, 항상 결과값이 존재, 항상 주시, 판단하여 값을 반환
    ...mapState({
      isLogin:'isLogin',
      isCheckAuth:'isCheckAuth'
    }),
    getSize() {
      return this.windowHeight/8 + 'px'
    }
  },
  watch:{
    isLogin(val, oldval){
      if(val && (this.$route.path=='/login' || this.$route.path=='/signup')) {
        this.GOPAGE('/')
        alert('이미 로그인')
      }

      if(!val && this.$route.path!='/signup' && this.$route.path!='/')
        this.GOPAGE('/login')
    },
    isCheckAuth(val, oldval) {
      console.log('isCheckAuth changed',this.$store.state.isLogin)
      if (val && !this.$store.state.isLogin 
      && !['/','/login','/signup'].includes(this.$route.path)) {
        this.GOPAGE('/login')
        alert('로그인을 해주세요.')
        console.log('no auth')
      }
    }
  },
  methods: { // 호출
    ...mapActions([
        'GOPAGE'
    ])
  },
  components:{
    navbar,
    loading
  }
}
</script>

<style>
@import './assets/css/boot.css';
</style>
