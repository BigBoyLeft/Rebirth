export const currencyFormatter = (value) => {
    if (typeof value !== "number") value = 0.0;
    value = value.toFixed(2);

    const [currency, decimal] = value.split(".");
    return `$${currency.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${"."}${decimal}`;
};

export const isDate = (data) => {
    const date = new Date(data);

    return date.getTime() === date.getTime();
}

export const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

}