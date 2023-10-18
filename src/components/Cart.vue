<template>
    <div class="container">
        <p>Cart</p>
        <p>{{ rupiah  }}</p>
        <CCol v-for="product in store.value" :key="product.id" xs="auto" lg="auto">
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
                    <!-- <CInputGroup class="mb-3 justify-content-end">
                        <CButton type="button" color="secondary" variant="outline" id="button-add" v-on:click="store.updateCart('DECREMENT_ITEM', product)">-</CButton>
                        <CFormInput placeholder="1" value="1" type="text" aria-label="Example text with button addon"/>
                        <CButton type="button" color="secondary" variant="outline" id="button-add"  v-on:click="store.updateCart('INCREMENT_ITEM', product)">+</CButton>
                    </CInputGroup> -->
                </div>
            </CCardBody>
            </CCard>
        </CCol>
    </div>
</template>

<script setup>
    import { formatRupiah } from '../utils/utils'
    import { useCart } from '../utils/store'
    const rupiah = formatRupiah (15000)

    const store = useCart()
    console.log(store.cart)



</script>