<template>
    <div class="container">
        <p>Cart</p>
        <p>{{ rupiah  }}</p>
    </div>
</template>

<script>
import { formatRupiah } from '../utils/utils.js'
const nominal = formatRupiah(15000)

export default {
    data(){
        return {
            rupiah: nominal
        }
    }
}

</script>