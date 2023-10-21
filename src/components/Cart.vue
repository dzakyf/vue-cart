<template>
    <div class="container">
        <h4>Keranjang</h4>
        <div class="row" v-if="store.cart.length !== 0">
            <div class="col">
                <template v-for="product in store.cart" :key="product.id"  :lg="{cols: 2}">
                    <CCard class="mb-3 card-cart">
                    <CRow class="g-0">
                        <CCol :md="4">
                            <div class="card-image-cart">
                                <CCardImage class="rounded-0" :src="product.variants[0].images[0]" />
                            </div>
                        </CCol>
                        <CCol :md="8">
                        <CCardBody>
                            <p>{{ formatRupiah(product.price) }}</p>
                        <CCardTitle>{{ product.name }}</CCardTitle>
                        <div class="d-grid gap-2">
                            <template v-for="(value,key) in product.selected_variant">
                                <template v-if="key === 'id' || key === 'sku'">
                                    <div></div>
                                </template>
                                <template v-else>
                                {{ value + " " }}   
                                </template>
                            </template>
                            <div class="d-flex justify-content-end">
                                <CInputGroup class="mb-3 input-group-size-sm justify-content-end">
                                    <CButton type="button" color="secondary" variant="outline" id="button-decrement" v-on:click="store.updateCart('DECREMENT_ITEM', product)">-</CButton>
                                    <CFormInput :value="product.cart_qty" style="max-width:200px;" readonly type="text" aria-label="Example text with button addon"/>
                                    <CButton type="button" color="secondary" variant="outline" id="button-add"  v-on:click="store.updateCart('INCREMENT_ITEM', product)">+</CButton>
                                </CInputGroup>
                            </div>
                        </div>
                        </CCardBody>
                        </CCol>
                    </CRow>
                </CCard>
            </template>

            </div>
            <div class="col">
                <h4>Total : {{ computed_total_cart_price  }}</h4>
                <CButton color="secondary" variant="outline" v-on:click="checkout()">Checkout</CButton>
            </div>
        </div>
      
            
     
    </div>
</template>

<script setup>
    import { formatRupiah } from '../utils/utils'
    import { useCart, useLocalStorage } from '../utils/store'
    import { computed } from 'vue'
    const rupiah = formatRupiah (15000)
    const store = useCart()
    const computed_total_cart_price = computed(() => {
        return formatRupiah(store.calculateTotalCart())
    })

    function checkout(){
        alert("success!")
    }
    
</script>