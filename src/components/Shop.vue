<template>
    <div class="d-flex justify-content-center"><h3>{{ data.shop_name }}</h3></div>
    <div  class="container-sm ">
    <div class="row justify-content-center">
        <!-- {{  selected_variants }} -->
        <CCol v-for="product in data.products" :key="product.id" xs="auto" lg="auto">
            <CCard class="card-product">
            <CCardImage orientation="top" :src="product.variants[0].images[0]" />
            <CCardBody>
                <p>{{ formatRupiah(product.price) }}</p>
                <CCardTitle>{{ product.name }}</CCardTitle>
                <div class="d-grid gap-2" >
                    <CFormSelect size="sm" aria-label="Default select example" v-model="selected_variants[product.id]">
                        <option :value="0">Choose variant</option>
                        <template v-for= "variant in product.variants">
                            <option  v-for="sku in variant.sku" :value="sku.id" :key="sku.id">
                                {{ `${sku.color} - ${sku.size} ` }}
                            </option>
                        </template>
                    </CFormSelect>
                    <div class="d-flex justify-content-end"> 
                        <CButton color="light" href="#" v-on:click="selectProductWithVariant(product)">Add to cart</CButton>
                    </div>
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
    import { ref, computed } from 'vue'
    
    const store = useCart()
    const initial_quantity = ref(1)
    const selected_variants = ref({})

    function selectProductWithVariant(item){
        let find_variant = {}
        item.variants.forEach((variant) => 
            variant.sku.forEach((sku) => {
                if(sku.id === selected_variants.value[item.id]){
                    find_variant = sku
                }
            }
           )
        )
        item['selected_variant'] = find_variant
        // console.log(item)
        store.updateCart("ADD_ITEM", item)
    }
   
</script>
