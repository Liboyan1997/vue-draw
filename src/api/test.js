import axios from 'axios'
const url="http://test.szcgroup.cn/api/friends/pair/"
const params={
  scid:"sc9526AF69EEC9FE3B",
  act_id:"313"
}
export async function getData(a,b,data){
  let c={...params,...data}
  console.log(c)
  // console.log(params,c)
    await axios({
      headers: {
        // scid: scid,
        'Content-Type': 'application/json',
        // 'user-agent': 'Mozilla/4.0 MDN Example',
      },
      method: 'get',
      url: url+b,
      params:c
    }).then((res) => {
      a(res)
    })


}
