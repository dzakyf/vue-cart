import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCart = defineStore('cart', () => {
    let cart = ref([])
    
    function findProductById(id){
        return cart.value.find((element) => element.id === id)
    }

    function findIndexProduct(id){
        return cart.value.findIndex((element) => element.id === id)
    }

    function getTotalPricePerItem(item){
        return item['cart_qty'] * item['price']
    }
    
    function addToCart(item){
        let found_item = findProductById(item.id)

        //update
        if(found_item){
            found_item['cart_qty'] += 1
            found_item['total_price'] = getTotalPricePerItem(found_item)
        }

        //insert
        if(found_item === undefined) { 
            item['cart_qty'] = 1
            item['total_price'] = item['price']
            cart.value.push(item)
        }
        
        log(`added ${item.name} by 1`)
    }

    function incrementQuantity(item, qty){
        let found_item = findProductById(item.id)
        found_item['cart_qty'] += 1
        found_item['total_price'] = getTotalPricePerItem(found_item)

        log("incremented by 1")
    }

    function decrementQuantity(item){
        let found_item = findProductById(item.id)

        if(found_item && found_item['cart_qty'] > 1){
            found_item['cart_qty'] -= 1
            found_item['total_price'] = getTotalPricePerItem(found_item)
        }else{
            removeFromCart(item)
        }

        log("decremented by 1")
    }
    
    function removeFromCart(item){
        console.log(`${item.name} removed!`)
        cart.value = cart.value.filter((element) => element.id !== item.id)
        return
    }

    function calculateTotalCart(){
        let total = cart.value.reduce((accumulator, currentValue) => {
            accumulator.total_price + currentValue.total.price
        },0)

        cart.value.total = total
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
        addToCart,
        incrementQuantity,
        decrementQuantity,
        updateCart,
        removeFromCart,
        calculateTotalCart,
    }
})
    