import axios from "axios";

export const requestGetItems=()=>{
return axios.request({
    method:"get",
    url:"https://shoppingitems2.herokuapp.com/api/checklist/"
});

}
