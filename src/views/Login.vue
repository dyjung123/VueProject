<template>
  <div>

    <!-- All the files that are required -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <!-- Where all the magic happens -->
    <!-- LOGIN FORM -->
    <div class="text-center" style="padding:50px 0">
      <div class="logo">login</div>
      <!-- Main Form -->
      <div class="login-form-1">
        <form id="login-form" class="text-left">
          <div class="login-form-main-message"></div>
          <div class="main-login-form">
            <div class="login-group">
              <div class="form-group">
                <input type="text" class="form-control" id="lg_username" name="lg_username" placeholder="username" v-model="email">
              </div>
              <div class="form-group">
                <label for="lg_password" class="sr-only">Password</label>
                <input type="password" class="form-control" id="lg_password" name="lg_password" placeholder="password" v-model="passwd">
              </div>
              <div class="form-group login-group-checkbox">
                <input type="checkbox" id="lg_remember" name="lg_remember">
                <label for="lg_remember">remember</label>
              </div>
            </div>
            <button type="submit" class="login-button" v-on:click.prevent="fireLogin()"><i class="fa fa-chevron-right"></i></button>
          </div>
          <div class="etc-login-form">
            <p>forgot your password? <a href="#">click here</a></p>
            <p>new user? <a href="#" v-on:click.prevent="GOPAGE('/signup')">create new account</a></p>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import firebase from '../firebase'

export default {
    created(){
        console.log('created Login : ',this)
            // if(this.$router.params.redirect)
            //     this.rdirect = this.$router.params.redirect
    },
    data(){
        return {
            email: '',
            passwd: ''
        }
    },
    computed: { // data 미리 데이터에 대해 계산, 항상 결과값이 존재, 항상 주시, 판단하여 값을 반환
        ...mapState({
            isLogin:'isLogin'
        })
    },
    methods: { // 호출
        ...mapActions([
            'GOPAGE'
        ]),
        fireLogin(){
          firebase.login(this.email,this.passwd)
        }
        
    }
}
</script>

<style>
/* @import '../assets/css/boot.css'; */
</style>