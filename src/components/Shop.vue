<template>
    <div class="d-flex justify-content-center"><h3>{{ data.shop_name }}</h3></div>
    <div  class="container-sm">
    <div class="row justify-content-start">
        <CCol v-for="product in data.products" :key="product.id" xs="auto" lg="auto">
            <CCard>
            <CCardImage orientation="top" :src="product.variants[0].images[0]" />
            <CCardBody>
                <p>{{ formatRupiah(product.price) }}</p>
                <CCardTitle>{{ product.name }}</CCardTitle>
                
                <div class="d-grid gap-2" >
                    <CFormSelect size="sm" aria-label="Default select example">
                        <option :value="0">Choose variant</option>
                        <option v-for= "variant in product.variants" :value="variant.color" :key="variant.id">{{ variant.color}}</option>
                    </CFormSelect>
                    <div class="d-flex justify-content-end"> 
                        <CButton color="light" href="#" v-on:click="store.updateCart('ADD_ITEM', product)">Add to cart</CButton>
                    </div>
                    <CInputGroup class="mb-3 justify-content-end">
                        <CButton type="button" color="secondary" variant="outline" id="button-add" v-on:click="store.updateCart('DECREMENT_ITEM', product)">-</CButton>
                        <CFormInput placeholder="1" value="1" type="text" aria-label="Example text with button addon"/>
                        <CButton type="button" color="secondary" variant="outline" id="button-add"  v-on:click="store.updateCart('INCREMENT_ITEM', product)">+</CButton>
                    </CInputGroup>
                </div>
            </CCardBody>
            </CCard>
        </CCol>
    </div>
  </div>  
</template>
<script setup>
    import data from '@/mock/data_shop.json' 
    import { formatRupiah } from '../utils/utils.js'
    import { useCart } from '../utils/store'
    import { watchEffect, ref } from 'vue'
    
    const store = useCart()
    const initialQuantity = ref(1)

   
</script>
