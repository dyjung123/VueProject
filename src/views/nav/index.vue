<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                <a class="navbar-brand" v-on:click.prevent="GOPAGE('/')">WebSiteName</a>
                </div>
                <ul class="nav navbar-nav">
                <li class="active">
                    <a v-on:click.prevent="clickPageLink($event,'/')">
                        <span class="glyphicon glyphicon-home"></span>
                        Home
                    </a>
                </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                <li>
                    <a v-if="isLogin" v-on:click.prevent="clickPageLink($event,'/lastresult')">
                        <span class="glyphicon glyphicon-stats"></span>
                         Total
                    </a>
                </li>
                <li>
                    <a v-if="!isLogin" v-on:click.prevent="clickPageLink($event,'/signup')">
                        <span class="glyphicon glyphicon-user"></span>
                         Sign Up
                    </a>
                    <a v-else v-on:click.prevent="clickPageLink($event,'/analyze')">
                        <span class="glyphicon glyphicon-picture"></span>
                         Analyze
                    </a>
                </li>
                <li>
                    <a v-if="!isLogin" v-on:click.prevent="clickPageLink($event,'/login')">
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
    computed: { 
        ...mapState({
            isLogin:'isLogin'
        })
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
        clickPageLink($event, url) {
            // console.log("event : ",$event.target.parentElement)
            $('li.active').removeClass('active')
            $event.target.parentElement.classList.add('active')
            this.GOPAGE(url)
        }
    }
}
</script>

<style>
</style>
