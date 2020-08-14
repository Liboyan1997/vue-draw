<template>
<div id="contain" :style="{backgroundImage:'url('+bgi+')'}">
  <div id="title1">
    <img src="../assets/img/title.png" alt="">
  </div>
  <div id="title2">
    <img src="../assets/img/img_prize.png" alt="">
  </div>
  <div class="box">
    <div class="person" v-if="flag">
      <div>
        <div class="img">
            <img :src="list[0].src" alt="">
        </div>

      <p>{{list[0].id}}</p>
      </div>
    </div>
    <div class="person" v-if="flag">
      <div>
        <div class="img">
          <img :src="list[1].src" alt="">
        </div>

      <p>
        {{list[1].id}}
      </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {getData} from '../api/test'

export default {
  data(){
    return{
      list:[{id:"",src:""},{id:"",src:""}],
      bgi:require('../assets/img/bg_2.png'),
      flag:true
    }
  },
  methods:{
    a(e){
      var keyNum = window.event ? e.keyCode : e.which;
      if(keyNum=="38"){
        this.$router.push('/match')
      }else{
        return false
      }
    }
  },
  beforeMount(){
     getData((a)=>{
      console.log(a.data.data)
      if(a.data.data[0]==null){
        // console.log(11)
        this.flag=false
        // console.log(this.flag)
      }else{
        console.log(a.data.data[0].upvote)
        console.log(a.data.data[1].upvote)
      this.list[0].id=a.data.data[0].upvote.num
      this.list[0].src=a.data.data[0].upvote.cover
      this.list[1].id=a.data.data[1].upvote.num
      this.list[1].src=a.data.data[1].upvote.cover
      }

    },"best")
  },
  mounted(){

    // console.log(this.matchArr)
    // console.log(this.list)
    var _this = this;
    document.addEventListener("keydown", _this.a);
  },
  destroyed(){
    var _this=this
     document.removeEventListener("keydown", _this.a);
  }
}
</script>

<style scoped>
#contain{
  height: 100%;
  width:100%;
  /* background-image: url(../assets/img/bg_2.png); */
  background-size: 100% 100%;
  position: relative;
}
#title1>img{
  display: block;
  height: 100%;
  width: 100%;
}
#title2>img{
  display: block;
  height: 100%;
  width: 100%;
}
#title1{
  height: 94px;
  width: 198px;
  position: absolute;
  top: 14px;
  left: 12px;
}
#title2{
  width: 429px;
  height: 70px;
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
}
.box{
  position: absolute;
  height: 290px;
  width: 480px;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
}
.person{
  height: 290px;
  width: 230px;
  padding: 40px 10px 10px 10px;
  box-sizing: border-box;
  border-radius: 16.64px;
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
}
.person>div{
  background-color: rgba(255,255,255,1);
  border-radius: 6.24px;
  height: 240px;
  width: 210px;
  padding:5px 5px 0 5px;
  box-sizing: border-box;
}
.person>div>.img{
  display: block;
  height: 200px;
  width: 200px;
  border-radius: 6.24px;
   overflow: hidden;
}
.person>div>.img>img{
  display: block;
  width:200px;
  height: auto;
}
.person>div>p{
  font-weight: 400;
  margin: 0;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 18px;
  letter-spacing: -2px;
}

.box>div:nth-child(1)::after{
  content: "魅力男神";
  display: block;
  width: 185px;
  height: 32px;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(../assets/img/img_4.png);
  background-size: 100% 100%;
  text-align: center;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-weight: bold;
}

.box>div:nth-child(2)::after{
  content: "魅力女神";
  display: block;
  width: 185px;
  height: 32px;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(../assets/img/img_5.png);
  background-size: 100% 100%;
  text-align: center;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-weight: bold;
}
</style>
