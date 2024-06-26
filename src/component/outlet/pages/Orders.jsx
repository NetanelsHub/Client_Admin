import {useEffect,useState ,useContext} from 'react'
import OrderTable from '../common/Orders/OrderTable'
import axios from "axios";
import { globalContext } from '../../../helper/GlobalContext';
import FullOrder from '../common/Orders/FullOrder';
const url = "http://localhost:3000/orders";

function Orders() { 
    const[dataOrder,setDataOrders]=useState(null)
    const[sendGetRequest,setSendGetRequest]=useState(false)
     const {setMessage}=useContext(globalContext)


    async function getAllOrder(){ 
        try {
          console.log("hi order");
          const { data} = await axios.get(`${url}/getOrder`, {
            withCredentials: true,
          });
          setDataOrders(data)
          console.log(data);
          if (!data) throw new Error("There is not Orders");
        } catch (error) { }
      } 

 useEffect(()=>{
    getAllOrder()
    
  
    },[sendGetRequest])

async function updateStatus(id,status){
        try {
         const { data } = await axios.put(`${url}/update/${status}`,{id});
         
         if(data.success){
          setSendGetRequest(prev => !prev)
          setMessage(data.message)
          
         }
      
        } catch (error) {
          console.log(error)
        }
       }

  return (
    <div>{dataOrder && <OrderTable orders={dataOrder} updateStatus={updateStatus}/>}
    <FullOrder updateStatus={updateStatus}/>
    </div>
  )
}

export default Orders