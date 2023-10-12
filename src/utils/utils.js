export function formatRupiah(nominal){
    let result = new Intl.NumberFormat('id-ID', {style: 'currency', currency:'IDR', maximumFractionDigits: '0'}).format(nominal)
    return result
}