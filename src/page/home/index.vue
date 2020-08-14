<template>
<div id="contain" ref="con" :style="{backgroundImage:'url('+bgi+')'}">
  <div id="title">
    <img src="@/assets/img/title.png" alt="">
  </div>
 <div id="bubble"><img src="@/assets/img/home/img_3.png" alt=""></div>
 <!-- <div id="people"><img src="../../assets/img/home/img_2.png" alt=""></div> -->
 <div id="btn-con">
   <div id="small-heart">
     <div>
       <img src="@/assets/img/home/heart_4.png" alt="">
     </div>
     <div>
        <img src="@/assets/img/home/heart_5.png" alt="">
     </div>
    </div>
   <div id="circle">
     <img src="@/assets/img/home/rotate.png" alt="">
     <div id="btn"><img src="@/assets/img/home/img_1.png" alt="">
     <p>已配对：{{num}}</p>
     </div>
   </div>
 </div>
</div>
</template>

<script>
import {getData} from '../../api/test'
import {getNW} from '../../api/noaward'
export default {
  data(){
    return{
      num:0,
      timer:null,
      bgi:require('../../assets/img/bg_2.png')
    }
  },
  methods:{
    a(e){
      // console.log(e)
      var keyNum = window.event ? e.keyCode : e.which;
      if(this.$route.params.from){
        if(keyNum=="40"){
          this.$router.push('/match')
      }else if(keyNum=="38"){
        this.$router.push('/one')
      }else{
        return false
      }
      }else{
        if(keyNum=="40"){
           this.$router.push('/three')
      }else if(keyNum=="38"){
        return false
      }else{
        return false
      }
      }
    },
    // getNum(){
    //   this.num=getData()
    // }
    // async a(){
    //   console.log("第一步")
    //   await  getNW((a)=>{
    //   console.log(a.data.data)
    //   console.log("第二步")
    // },"list",{
    //   sex:"女"
    // })
    //  console.log("第三步")
    // }
  },
  beforeMount(){
        getData((a)=>{
      console.log(a.data.data.pair_cnt)
      this.num=a.data.data.pair_cnt
    },"load");
  },
 mounted(){

  // getData((a)=>{
  //     console.log(a.data.data.pair_cnt)
  //     console.log(1)
  //     this.num=a.data.data.pair_cnt
  //   },"load");
  //   console.log(2)
    //定时刷新 匹配数量
    this.timer=setInterval(()=>{
      getData((a)=>{
      console.log(a.data.data.pair_cnt)
      this.num=a.data.data.pair_cnt
    },"load");
    },500)
    console.log(this.$route)
    var _this = this;
    document.addEventListener("keydown", _this.a);
  },
  destroyed(){
    var _this=this
     document.removeEventListener("keydown", _this.a);
     clearInterval(this.timer)
     this.timer=null
  }
}
</script>

<style scoped>
img{
  height: 100%;
  width: 100%;
  display: block;
}
#contain{
  height: 100%;
  width:100%;
  /* background-image: url('/assets/img/bg_2.png'); */
  background-size: 100% 100%;
  position: relative;
}
#title{
  width: 409px;
  height: 194px;
  position: absolute;
  top: 37px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes sway {
  0%{transform: rotate(5deg);
  transform-origin:100% 100%;}
  100%{transform: rotate(-5deg);
  transform-origin:100% 100%;}
}
#bubble{
  width: 40px;
  height: 166px;
  position: absolute;
  right: 442px;
  bottom: 188px;
  animation: sway 3s ease 0s infinite alternate;
  /* background-color: red; */
}
#btn-con{
  position: absolute;
  top: 276px;
  left: 50%;
  transform: translateX(-50%);
}
@keyframes anticlockwise {
  0%{
    transform: rotate(0deg);
    transform-origin:50% 50%;
  }
  100%{
    transform: rotate(-180deg);
    transform-origin:50% 50%;
  }
  100%{
    transform: rotate(-360deg);
    transform-origin:50% 50%;
  }
}

@keyframes clockwise {
  0%{
    transform: rotate(0deg);
    transform-origin:50% 50%;
  }
  100%{
    transform: rotate(180deg);
    transform-origin:50% 50%;
  }
  100%{
    transform: rotate(360deg);
    transform-origin:50% 50%;
  }
}
#circle{
  position: relative;
  width: 200px;
  height: 200px;
  /* z-index: 3; */
  /* background-color: red; */
}
#circle>img{
  animation: clockwise 3s linear 0s infinite normal;
}
#btn{
  position: absolute;
  width: 160px;
  height: 160px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  /* background-color: red; */
}
#btn>p{
  font-weight: 400;
  position: absolute;
  left: 80px;
  top: 46px;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 1);
  text-align: center;
  height: 18px;
  font-size: 20px;
  line-height: 20px;
  width: 160px;
  text-align: center;
  /* background-color: black; */
}
#small-heart{
height: 26px;
width: 200px;
/* background-color: black; */
position: absolute;
top: 50%;
left: 0;
transform: translateY(-50%) rotate(-20deg);
/* animation: anticlockwise 3s linear 0s infinite normal; */
}
#small-heart>div:nth-child(1){
  width: 30px;
  height: 26px;
  position: absolute;
  top: 0;
  left: -10px;
  transform: rotate(-52deg);
  /* background-color: black; */
}
#small-heart>div:nth-child(2){
  /* z-index: 4; */
  width: 17px;
  height: 17px;
  position: absolute;
  top: 4px;
  right: 0;
   transform: rotate(150deg);
  /* background-color: black; */
}
</style>
