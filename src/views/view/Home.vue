<template>
  <div>
    
    <img class="logo mainlogo" src="../../assets/img/weblogo.png">

    <hooper :progress="true" :autoPlay="true" :playSpeed="2000" style="height: 400px" :centerMode="true" :wheelControl="false">
      <slide>
        <div class="signup bg"></div>
      </slide>
      <slide>
        <div class="macbook bg"></div>
      </slide>
      <slide>
        <div class="emotion bg"></div>
      </slide>
      <slide>
        <div class="chart bg"></div>
      </slide>
    </hooper>

    <div class="toollist">
      <div class="row">
        <div class="col-xs-4">
            <img class="logo" src="../../assets/img/AWS.png">
        </div>
        <div class="col-xs-4">
            <img class="logo" src="../../assets/img/bootstrap.png">
        </div>
        <div class="col-xs-4">
            <img class="logo" src="../../assets/img/express.png">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-4">
            <img class="logo" src="../../assets/img/firebase.png">
        </div>
        <div class="col-xs-4">
            <img class="logo" src="../../assets/img/node.png">
        </div>
        <div class="col-xs-4">
            <img class="logo" src="../../assets/img/vue.png">
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="container">
            <a href='#'><i class="fa fa-twitch fa-2x fa-fw"></i></a>
            <a href='#'><i class="fa fa-facebook fa-2x fa-fw"></i></a>
            <a href='#'><i class="fa fa-twitter fa-2x fa-fw"></i></a>
            <a href='#'><i class="fa fa-youtube-play fa-2x fa-fw"></i></a>
            <a href='#'><i class="fa fa-google fa-2x fa-fw"></i></a>
            <a href='#'><i class="fa fa-linkedin fa-2x fa-fw"></i></a>
      </div>
    </div>

  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script>
  import { mapActions, mapState } from 'vuex'
  import { Hooper, Slide } from 'hooper'

  export default {
    components: {
      Hooper,
      Slide
    },
    data() {
      return {

      }
    },
    created() {
      

    },
    methods: {
      
    },
    computed: {
      
    },
    watch: {
      
    }
  }

</script>

<style>
  @import '../../assets/css/hooper.css';
  @import url('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');

  .hooper-slide {
    background-color: #c9c9c9;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;
    border-radius: 10px;
  }

  .logo {
    display: block;
    width: 80%;
    max-width: 900px;
    margin: 2rem auto;
  }

  .mainlogo {
    max-width: 400px;
  }

  @media (max-width: 991px) {
    .toollist {
        width: 80%;
        margin: 0 auto;
    }
  }

  @media (min-width: 991px) {
    .toollist {
        width: 800px;
        margin: 0 auto;
    }
  }

  .footer {
      margin-top: 2rem;
      display: flex;
      flex-direction: column-reverse;
      width: 100%;
      height: 60px;
      background-color: #f5f5f5;
      text-align: center;
  }

.footer .container{
  margin-top: 50px;
  color: #fff;
  width: 100%;
}

.fa-twitter {
    color: #4099FF;
}

.fa-facebook {
    color: #3B5998;
}

.fa-youtube-play {
    color: #e52d27;
}

.fa-twitch {
    color: #6441A5;
}

.fa-linkedin {
    color: #007bb6;
}

.fa {
    opacity: 0.7;
    transition: 1s;
    -webkit-transition: 1s;
    margin-bottom: 1rem;
}

.fa:hover{
    opacity: 1;
    transition: 1s;
    -webkit-transition: 1s;
}

.bg {
  width: 1000px;
  height: 400px;
  background-position: center center;
  border: 2px solid #fff;
  border-radius: 5px;
}

@media (min-width: 1060px) {
  .bg {
    width: 1800px;
  }
}

.signup {
  background: linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.4)
        ),
        url("../../assets/img/signupbg.jpg");
}

.macbook {
  background: linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.4)
        ),
        url("../../assets/img/macbookbg.jpg");
}

.emotion {
  background: linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.4)
        ),
        url("../../assets/img/emotionbg.jpg");
}

.chart {
  background: linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.4)
        ),
        url("../../assets/img/chartbg.jpg");
}
</style>
