const displayCHFCurrency = (num) => {
    const formatter = new Intl.NumberFormat('fr-CH', {
        style: "currency",
        currency: 'XAF',
        // minimumFractionDigits: 2
    })

    return formatter.format(num)
}

export default displayCHFCurrency