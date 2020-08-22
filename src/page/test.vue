<template>
<div id="con">
  <div>
    <draw ref="draw" @renew="fun1" @draw="fun2" :datas="data" :winners="winnerslist"></draw>
  </div>
</div>
</template>

<script>
import draw from "./component/draw"
import {getNW} from '../api/No_award'
export default {
  data(){
    return{
      data:[],
      winnerslist:[]
    }
  },
  components:{
    draw
  },
  created(){
    console.log(1)
    this.getData("list",{sex:"男"})
    console.log(this.data,3)
  },
  beforeMount(){

  },
  methods:{
    async getData(url,params){
      console.log(2)
       let data1=await getNW(url,params)
       if(data1.status==200){
        //  console.log(data1.data.data)
        this.data=[]
         data1.data.data.forEach(element => {
           var a={id:"",src:""}
           a.id=JSON.parse(JSON.stringify(element)).num
            a.src=JSON.parse(JSON.stringify(element)).cover
            // console.log(a)
            this.data.push(a)
         });
       }
       this.winnerslist= [{id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"},
        {id:"2",src:"static/img/2.jpg"}]
    },
    fun1(a){
      // console.log(a)
      console.log("求更新",a)
       this.getData("list",{sex:"女"})
    },
    fun2(a){
      console.log("求停止",a)

    }
  }
}
</script>

<style  scoped>
#con{
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bg_2.png);
  background-size: 100% 100%;
  position: relative;
}
#con>div{
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}

</style>
