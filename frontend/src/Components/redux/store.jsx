import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/User/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { useSelector } from "react-redux";
import itemReducer from "./Item/itemSlice"

const rootReducer = combineReducers({
  user: userReducer,
  item:itemReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export const getUser = function () {
  const { user } = useSelector((state) => state.user);
  return user !== null ? user : null;
};
export const getAlldata=function(){
  const {loading,error,message}=useSelector(state=>state.user);
  return {loading,error,message};
}
const useitems=()=>{
  const {items}=useSelector(state=>state.item)
  return items||null;
}
const filterItems=(category)=>{
  const itemFiltered=useitems?.().filter(item=>item.category===`${category}`&&item.status==="approved")
  return itemFiltered||null;
}
export const getElectronics=function(){

  const electronics=filterItems?.("Electronics")
  return electronics!==null? electronics:null;
}
export const getStationary=function(){
  const stationary=filterItems?.("Stationary")
  return stationary!==null? stationary:null;
}
export const getCleaning=function(){
  const cleaning=filterItems?.("Cleaning")
  return cleaning!==null? cleaning:null;
}
export const pendingItems=function()
{
  return useitems?.().filter(item=>item.status==="pending")||[];
}