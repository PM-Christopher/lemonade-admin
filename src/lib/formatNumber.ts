export const formatNumber = (number: number, places: number) => {
    if(number) {
        return parseFloat(String(number)).toFixed(places)
    }
    return 0
}

export const formatNumberWithCommas = (number: number) => {

    console.log("numbe", typeof number)
    if(number) {
        console.log("is", number)
        return number.toLocaleString('en-US');
    }
    return 0
};