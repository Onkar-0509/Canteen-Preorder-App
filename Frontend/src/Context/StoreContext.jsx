import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

        const[cartItem,setCartItem] = useState({});

        const [token,setToken] = useState("")

        const [food_list ,setFoodList] = useState([]);

        const URL = "http://localhost:4000"

        const fetchFoodList = async()=>{
            const response = await axios.get(URL+"/api/food/list");
            if(response.data.success){
                setFoodList(response.data.data);
            }

        }

        const addToCart = async(itemId) =>{
            if(!cartItem[itemId]){
                setCartItem((prev)=>({...prev,[itemId]:1}));
            }
            else{
                setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            }
            if(token){
                await axios.post(URL+"/api/cart/add",{itemId},{headers:{token}})
            }
             
        }

        const removeFromCart = async(itemId)=>{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}));
            if(token){
                await axios.post(URL+"/api/cart/remove",{itemId},{headers:{token}})
            }
        }

        const getTotalCartAmount= ()=>{
            let totalAmount =0;
            for(const item in cartItem){

                if(cartItem[item]>0){
                    let itemInfo = food_list.find((product)=>product._id === item);
                    totalAmount += itemInfo.price * cartItem[item];
                }
                
            }
            return totalAmount;

        }

        const loadCartData = async(token)=>{
            const response = await axios.post(URL+"/api/cart/get",{},{headers:{token}}); 
             setCartItem(response.data.data);
        }

        useEffect(()=>{
            async function loadData(){
                fetchFoodList();
                if(localStorage.getItem("token")){
                    setToken(localStorage.getItem("token"));
                    await loadCartData(localStorage.getItem("token"))
                }
            }
            
             loadData();
        },[])

    const contextValue={
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        URL
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}

        </StoreContext.Provider> 
    )
}

export default StoreContextProvider;