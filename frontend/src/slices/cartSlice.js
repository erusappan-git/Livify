import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItem:[]};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {

            const item = action.payload;

            const existItem = state.cartItem.find( (a) => a._id === item._id );

            if(existItem){
                state.cartItem = state.cartItem.map( (a)=> a._id === existItem._id ? item : a);
            }else{
                state.cartItem = [...state.cartItem,item];
            }

            // Calculate item price
            state.itemPrice = state.cartItem.reduce(
                (acc, item) => acc + item.price * item.qty, 0);

            // Shipping price (if 100 rs free)
            state.shippingPrice = state.itemPrice > 1000 ? 0 : 79;

            // GST Price
            state.taxPrice = Number(0.18 * state.itemPrice);

            // Total Price
            state.totalPrice = 
            Number(state.itemPrice) + 
            Number(state.shippingPrice) + 
            Number(state.taxPrice);

            localStorage.setItem("cart", JSON.stringify(state));


            console.log(state.cartItem);

        },
        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter((item) => item._id !== action.payload);

             // Calculate item price
             state.itemPrice = state.cartItem.reduce(
                (acc, item) => acc + item.price * item.qty, 0);

            // Shipping price (if 100 rs free)
            state.shippingPrice = state.itemPrice > 1000 ? 0 : 79;

            // GST Price
            state.taxPrice = Number(0.18 * state.itemPrice);

            // Total Price
            state.totalPrice = 
            Number(state.itemPrice) + 
            Number(state.shippingPrice) + 
            Number(state.taxPrice);

            localStorage.setItem("cart", JSON.stringify(state));
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;