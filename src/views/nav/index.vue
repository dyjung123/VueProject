<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                <a class="navbar-brand" v-on:click.prevent="GOPAGE('/')">Today Face</a>
                </div>
                <ul class="nav navbar-nav">
                <li class="navcon" :class="{ active : isHomeView }">
                    <a v-on:click.prevent="clickPageLink('/')">
                        <span class="glyphicon glyphicon-home"></span>
                        Home
                    </a>
                </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                <li class="navcon" :class="{ active : isTotalView }">
                    <a v-if="isLogin" v-on:click.prevent="clickPageLink('/lastresult')">
                        <span class="glyphicon glyphicon-stats"></span>
                         Total
                    </a>
                </li>
                <li class="navcon" :class="{ active : isSignupView || isAnalyzeView }">
                    <a v-if="!isLogin" v-on:click.prevent="clickPageLink('/signup')">
                        <span class="glyphicon glyphicon-user"></span>
                         Sign Up
                    </a>
                    <a v-else v-on:click.prevent="clickPageLink('/analyze')">
                        <span class="glyphicon glyphicon-picture"></span>
                         Analyze
                    </a>
                </li>
                <li class="navcon" :class="{ active : isLoginView }">
                    <a v-if="!isLogin" v-on:click.prevent="clickPageLink('/login')">
                        <span class="glyphicon glyphicon-log-in"></span>
                        Login    
                    </a>
                    <a v-else v-on:click.prevent="fireLogout()">
                        <span class="glyphicon glyphicon-log-out"></span>
                        Logout    
                    </a>
                </li>
                
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import firebase from '../../firebase'
const tag = '[app.js]'
export default {
    data() {
        return {
            isHomeView: false,
            isTotalView: false,
            isAnalyzeView : false,
            isLoginView : false,
            isSignupView : false
        }
    },
    computed: {
        ...mapState({
            isLogin:'isLogin'
        })
    },
    watch: {
        $route (to, from){
            this.showClickedNav(to.path, from.path)
        }
    },
    mounted() {
        this.showClickedNav(this.$route.path)
    },
    methods: { // 호출
        ...mapActions([
            'LOGIN',
            'LOGOUT',
            'GOPAGE'
        ]),
        fireLogout() {
            firebase.logout()
        },
        clickPageLink(url) {
            this.GOPAGE(url)
        },
        showClickedNav(to, from) {
            if (from) {
                if (from=='/') {
                    this.isHomeView = false
                } else if (from=='/analyze') {
                    this.isAnalyzeView = false
                } else if (from=='/lastresult') {
                    this.isTotalView = false
                } else if (from=='/login') {
                    this.isLoginView = false
                } else if (from=='/signup') {
                    this.isSignupView = false
                }
            }

            if (to=='/') {
                this.isHomeView = true
            } else if (to=='/analyze') {
                this.isAnalyzeView = true
            } else if (to=='/lastresult') {
                this.isTotalView = true
            } else if (to=='/login') {
                this.isLoginView = true
            } else if (to=='/signup') {
                this.isSignupView = true
            }
        }
    }
}
</script>

<style>
</style>
