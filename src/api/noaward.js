import axios from 'axios'
const url="http://test.szcgroup.cn/api/friends/"
const params={
  scid:"sc9526AF69EEC9FE3B",
  act_id:"313"
}
export async function getNW(a,b,data){
  let c={...params,...data}
  console.log(c)
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
  // console.log(params,c)

}
