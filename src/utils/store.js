import { defineStore } from 'pinia'
import { ref,watch } from 'vue'

export const useLocalStorage = defineStore('localStorage', () => {
    const cart  = useCart()

    function get(key){
        const value = localStorage.getItem(key)
        
        try{
            return (typeof value === "string") 
            ? JSON.parse(value) : (typeof value === "object") 
            ? value : undefined


        }catch(err){

        }

        return undefined
    }

    function set(key){
        localStorage.setItem(key, JSON.stringify(cart.cart)) 
    }

    return { get, set }
})

export const useCart = defineStore('cart', () => {
    let ls_key = "cart"
    let ls = useLocalStorage()
    let cart =  ls.get(ls_key) ? ref(ls.get(ls_key)) :ref([])
    let totalCart = ref(0)
   
    
    function findProductById(id){
        return cart.value.find((element) => element.id === id)
    }

    function findProductByVariant(variant_id){
        return cart.value.find((element) => element.selected_variant.id === variant_id)
    }

    function findIndexProduct(id){
        return cart.value.findIndex((element) => element.id === id)
    }

    function getTotalPricePerItem(item){
        return item['cart_qty'] * item['price']
    }
    
    function addToCart(item){
        let found_item = findProductById(item.id)
        let found_product_by_variant = findProductByVariant(item.selected_variant.id)

        //insert new
        if(!found_item || !found_product_by_variant) { 
            let new_item = {
                ...item,
                cart_qty: 1,
                total_price: item.price, 
            }
            cart.value =[...cart.value, new_item]
        }

        //update
        if(found_item && found_product_by_variant){
           found_product_by_variant['cart_qty'] += 1
           found_product_by_variant['total_price'] = getTotalPricePerItem(found_product_by_variant)
        }
        // calculateTotalCart()

        ls.set(ls_key)
        
        log(`added ${item.name} by 1`)
    }

    function incrementQuantity(item ){
        let found_item = findProductById(item.id)
        
        found_item['cart_qty'] += 1
        found_item['total_price'] = getTotalPricePerItem(found_item)
        calculateTotalCart()
        ls.set(ls_key)
        log("incremented by 1")
    }

    function decrementQuantity(item){
        let found_item = findProductById(item.id)

        if(found_item && found_item['cart_qty'] > 1){
            found_item['cart_qty'] -= 1
            found_item['total_price'] = getTotalPricePerItem(found_item)
            ls.set(ls_key)
        }else{
            removeFromCart(item)
        }
        

        log("decremented by 1")
    }
    
    function removeFromCart(item){
        console.log(`${item.name} removed!`)
        cart.value = cart.value.filter((element) => element.id !== item.id)
        ls.set(ls_key)
        return
    }

    function calculateTotalCart(){
        let total_sum = cart.value.reduce((accumulator, currentValue) => 
             accumulator + currentValue.total_price
        ,0)
       
        return total_sum
    }

    function updateCart(action, item){
        switch(action){
            case 'ADD_ITEM':
                addToCart(item)
                break
            case 'INCREMENT_ITEM':
                incrementQuantity(item) 
                break
            case 'DECREMENT_ITEM':
                decrementQuantity(item)
                break
            case 'REMOVE_ITEM':
                removeFromCart(item)
                break
            default: 
                console.log("initialized")
                break
        }
    }
   
    function log(action){
        console.log(`${action} :`, cart.value)
    }

    return { 
        cart, 
        totalCart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        updateCart,
        removeFromCart,
        calculateTotalCart,
    }
})
    