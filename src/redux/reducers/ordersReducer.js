const initialState = {
    orders:[],
    cart:[],
    
}

export const ordersReducer = (state=initialState,action)=>{
    switch(action.type){
        case "getAllOrders":
            return{
                ...state,
                orders:action.payload
            }

        case "addNewOrder":
            return{
                ...state,
                cart:[]
            }

        case "removeOrder":
            let newOrders = state.orders.filter(order=> order._id!== action.payload);
            return{
                ...state,
                orders:newOrders
            }

        case "getCart":
            return{
                ...state,
                cart:action.payload
            }

        case "getHistory":
            return{
                ...state,
                orders:action.payload
            }

        case "removeItemFromCart":
            const filteredCart = state.cart.filter(item => item._id !== action.payload);
            return{
                ...state,
                cart:filteredCart
            }

        case "updateItemAmount":
            return{
                ...state,
                cart:action.payload
            }
        
        case "addToCart":
            return{
                ...state,
                cart:action.payload.cart
            }

        default: return state;
    }
}