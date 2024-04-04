import React, { useEffect, useState } from 'react';
import SingleItem from '../ViewSingleItem/SingleItem';
import { getElectronics,getStationary,getCleaning, getUser,pendingItems} from '../../../Components/redux/store';

import styles from "./Viewitem.module.css"
import Message from '../../../Utils/Message/Message';
import Button from '../../../Utils/Button';
import SingleNewItem from '../ViewSingleItem/SingleNewItem';

export default function ViewItem() {
   const [show,setShow]=useState();
   const user=getUser();
   const electronics=getElectronics().sort((a,b)=>a.itemcode.slice(1)*1-b.itemcode.slice(1)*1);
  const stationary=getStationary();
  const cleaning=getCleaning();
const pending=pendingItems();
console.log(pending)

  return (
    <div className={`${styles.container} container`}>
    <div>
    <h1>Electronics</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {electronics?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
    <div>
    <h1>Stationary</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {stationary?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
    <div>
    <h1>Cleaning</h1>
     <table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>

        </thead>
        <tbody>
           {cleaning?.map(el=>{
              return <SingleItem item={el} />
           })}
        </tbody>
     </table>
    </div>
  {!show&& <Button onClick={()=>setShow((prev)=>!prev)} type="button"  category="normalbtn" loadmessage="showing pending items" message="show pending items"  />} 
  
   {show&&<div>
    <h1>New Item Pending For Approval</h1>
     {pending.length===0?<Message message="No items here" type="success" />:<table>
        <thead>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Description</th>
            <th>Item Unit</th>
            <th>Item Created by</th>
            <th>Item Status</th>
            
            

        </thead>
        <tbody>
        {pending?.map(el=>{
        return <SingleNewItem key={el._id} el={el} PendingHandler={pending} />
        })}
        </tbody>
     </table>}
    </div>}
    </div>
  )
}
