<template>
    <div class="d-flex justify-content-center"><h3>{{ data.shop_name }}</h3></div>
    <div  class="container-sm">
    <div class="row justify-content-start">
        <CCol v-for="product in data.products" xs="auto" lg="auto">
            <CCard>
            <CCardImage orientation="top" :src="product.variants[0].images[0]" />
            <CCardBody>
                <p>{{ formatRupiah(product.price) }}</p>
                <CCardTitle>{{ product.name }}</CCardTitle>
                <div class="d-flex justify-content-end">
                <CButton color="light" href="#">Add to cart</CButton>
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
</script>
