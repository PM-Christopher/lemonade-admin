import {getCode} from "country-list"

export const formatCountry = (country: string) => {
    if(country) {
        return getCode(country)
    }
    return null
}