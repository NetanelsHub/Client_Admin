import {useEffect,useState} from 'react'
import OrderTable from '../common/Orders/OrderTable'
import axios from "axios";
const url = "http://localhost:3000/orders";

function Orders() { 
    const[dataOrder,setDataOrders]=useState(null)
    async function getAllOrder(){
      
        try {
          console.log("hi order");
          const { data} = await axios.get(`${url}/getOrder`, {
            withCredentials: true,
          });
          setDataOrders(data)
          console.log(data);
  
          if (!orders) throw new Error("There is not Orders");
        } catch (error) { }
      } 
      
 useEffect(()=>{
    getAllOrder()
  
    },[])

  return (
    <div>{dataOrder && <OrderTable orders={dataOrder}/>}</div>
  )
}

export default Orders