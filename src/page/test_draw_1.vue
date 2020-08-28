<template>
<div id="con"  :style="{backgroundImage:'url('+bgi1+')'}">

  <div  :style="{backgroundImage:'url('+bgi2+')'}">
    <div  :style="{backgroundImage:'url('+bgi3+')'}">
      <draw ref="draw" @renew="fun1" @draw="fun2" :datas="data" :winners="winnerslist" :size='size'></draw>
    </div>
  </div>
  <div v-show="show[0]">
     <person :key="h" v-for="(j,h) in winnerslist1" :id="j.id" :src="j.src"></person>
  </div>
  <div v-show="show[1]">
     <person :key="h" v-for="(j,h) in winnerslist2" :id="j.id" :src="j.src"></person>
  </div>
  <div id="bubble">
      <!-- <img src="@/assets/img/home/img_3.png" alt /> -->
    </div>
</div>
</template>

<script>
import draw from "./component/draw"
import person from "./component/small_person";
// import {getNW} from '../api/No_award'
export default {
  data(){
    return{
      data:[],
      winnerslist:[],
      data1:[],
      winnerslist1:[],
      data2:[],
      winnerslist2:[],
      show:[],
      timer:null,
       size:{
          //行数
        row: 1,
        //列数
        col: 3
      },
      // bgi1: require("../assets/img/bg_2.png"),
      // bgi2: require("../assets/img/draw_8.png"),
      // bgi3: require("../assets/img/draw_2.png")
    }
  },
  components:{
    draw,person
  },
  created(){
    console.log(1)
    // console.log(this.getData("list",{sex:"男"}))
    // this.getData("list",{sex:"男"},this.data1)
    // this.getData("list",{sex:"女"},this.data2)
    this.data1=[
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
         {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},
        {id:"2",src:"static/img/1.jpg"},]
    this.data2=this.data1
    },
  beforeMount(){
     if(localStorage.getItem('show1')){
      this.show=[...(localStorage.getItem('show1').split(","))]
    }
    // console.log(this.data1,"111")
    if(localStorage.getItem("winners12")){
      this.winnerslist1 = JSON.parse(localStorage.getItem("winners11"));
      this.winnerslist2 = JSON.parse(localStorage.getItem("winners12"));
    }else{
    this.winnerslist1= [
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"}]
    localStorage.setItem("winners11", JSON.stringify(this.winnerslist1));
    this.winnerslist2= [
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"}]
     localStorage.setItem("winners12", JSON.stringify(this.winnerslist2));
    }
    this.data=this.data1,
    this.winnerslist=this.winnerslist1
  },
  mounted(){
    var _this = this;
    document.addEventListener("keydown", _this.a);
  },
  methods:{
   a(e) {
      var keyNum = window.event ? e.keyCode : e.which;
      if (keyNum == "40") {
        console.log("down");
        // this.$router.push({ name: "home", params: { from: "one" } });
      } else if (keyNum == "38") {
        console.log("up");
        this.$router.push("/two");
      } else {
        return false;
      }
    },
    async getData(url,params,arr){
      // console.log(2)
       let data1=await getNW(url,params)
       if(data1.status==200){
        //  console.log(data1.data.data)
        // let arr=[]
         data1.data.data.forEach(element => {
           var a={id:"",src:""}
           a.id=JSON.parse(JSON.stringify(element)).num
            a.src=JSON.parse(JSON.stringify(element)).cover
            arr.push(a)
         });
       }
       arr.sort(function(r, l) {
        return Math.random() - 0.5;
      })
      //  console.log(arr)
    },
    fun1(a){
        this.data=this.data2,
        this.winnerslist=this.winnerslist2

       console.log("已经更新",a)
    },
    fun2(a){
      console.log("已经停止",a)
      this.timer=setTimeout(()=>{
        this.show.push(true)
         localStorage.setItem("show1",this.show)
        clearTimeout(this.timer)
      },1500)
    }
  },
  destroyed() {
    var _this=this
    document.removeEventListener("keydown", _this.a);
    clearTimeout(this.timer)
  },
}
</script>

<style  scoped>
#con{
  width: 100%;
  height: 100%;

  background-size: 100% 100%;
  position: relative;
}
#con>div:nth-child(1){
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 346px;
  height: 222px;
   background-size: 100% 100%;
}
#con>div:nth-child(1)::after {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 32px;
  content: "一等奖";
  position: absolute;
  top: -19px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  /* background-color: red; */
  width: 188px;
  height: 51px;
  text-align: center;
  line-height: 51px;
  /* background-image: url(../assets/img/draw_3.png); */
}
#con>div:nth-child(1)>div{
  position: absolute;
  top: 31px;
  left: 15px;
  width: 310px;
  height: 134px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


#con>div:nth-child(2) {
width: 320px;
  height: 134px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16.64px;
  position: absolute;
  top: 165px;
  left: 180px;
  padding: 8px 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}

#con>div:nth-child(3) {
 width: 320px;
  height: 134px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16.64px;
  position: absolute;
  top: 165px;
  right: 180px;
  padding: 8px 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}

@keyframes sway {
  0% {
    transform: rotate(5deg);
    transform-origin: 100% 100%;
  }
  100% {
    transform: rotate(-5deg);
    transform-origin: 100% 100%;
  }
}
#bubble {
  width: 40px;
  height: 166px;
  position: absolute;
  right: 442px;
  bottom: 188px;
  animation: sway 3s ease 0s infinite alternate;
  /* background-color: red; */
}
</style>
