import React from 'react'
import { getUser } from '../../../Components/redux/store'
import Button from '../../../Utils/Button';
export default function SingleItem({item}) {
 const user=getUser();
 const isStoreManager=user?.role==="StoreManager";
  return (
    <tr>
      <td>{item.itemcode}</td>
      <td>{item.itemname}</td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.unit}</td>
      
     
      {isStoreManager&&<td>
        <span>{item.stockPresent} </span>
        <Button>Edit</Button>
      </td>}
      {isStoreManager&& <td>
       <span>{item.stockNeeded} </span>
       <Button>Edit</Button>
     </td>}
     
      

    </tr>
  )
}
