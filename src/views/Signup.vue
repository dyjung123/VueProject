<template>
    <div>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

        <!-- REGISTRATION FORM -->
        <div class="text-center" style="padding:50px 0">
        	<div class="logo">register</div>
        	<!-- Main Form -->
        	<div class="login-form-1">
        		<form id="register-form"   class="text-left">
        			<div class="login-form-main-message"></div>
        			<div class="main-login-form">
        				<div class="login-group">
        					<div class="form-group">
        						<label for="reg_username" class="sr-only">Email address</label>
        						<input type="text" class="form-control" id="reg_username" name="reg_username" placeholder="email" v-model="email">
        					</div>
        					<div class="form-group">
        						<label for="reg_password" class="sr-only">Password</label>
        						<input type="password" class="form-control" id="reg_password" name="reg_password" placeholder="password" v-model="pwd">
        					</div>
        					<div class="form-group">
        						<label for="reg_password_confirm" class="sr-only">Password Confirm</label>
        						<input type="password" class="form-control" id="reg_password_confirm" name="reg_password_confirm" placeholder="confirm password" v-model="confirmPwd">
        					</div>
                            <br>
        				</div>
                        <!-- <button type="submit" class="login-button" v-on:click.prevent="fireSignUp()"><i class="fa fa-chevron-right"></i></button> -->
                        <button type="submit" class="login-button btn btn-primary" v-on:click.prevent="fireSignUp()">SignUp</button>
        			</div>
        			<div class="etc-login-form">
        				<p>already have an account? <a href="#" v-on:click.prevent="GOPAGE('/login')">login here</a></p>
        			</div>
        		</form>
        	</div>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase'
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            pwd: '',
            confirmPwd: ''
        }
    },
    methods: {
        ...mapActions([
            'GOPAGE'
        ]),
        fireSignUp() {
            if (this.pwd === this.confirmPwd) {
                firebase.signup(this.email, this.pwd)
            } else {
                alert('비밀번호가 일치하지않습니다.')
            }
        }
    }

}
</script>

<style>
/* @import '../assets/css/boot.css'; */
</style>
