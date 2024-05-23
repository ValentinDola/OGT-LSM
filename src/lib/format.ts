export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price)
}

export const CfaFormat = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "XOF"
    }).format(price)
}