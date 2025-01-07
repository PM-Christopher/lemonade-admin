import { Formik } from "formik";

export const checkError = (value: string, formik: any) => {
    return value === "phone_number"
        ? formik.touched.phone_number && formik.errors.phone_number
        : value === "email"
            ? formik.touched.email && formik.errors.email
            : value === "fullname"
                ? formik.touched.fullname && formik.errors.fullname
                : value === "surname"
                    ? formik.touched.surname && formik.errors.surname
                    : value === "dob"
                        ? formik.touched.dob && formik.errors.dob
                        : value === "password"
                            ? formik.touched.password && formik.errors.password
                            : value === "confirm_password"
                                ? formik.touched.confirm_password && formik.errors.confirm_password
                                : value === "card_number"
                                    ? formik.touched.card_number && formik.errors.card_number
                                    : value === "cvv"
                                        ? formik.touched.cvv && formik.errors.cvv
                                        : value === "exp"
                                            ? formik.touched.exp && formik.errors.exp
                                            : value === "code"
                                                ? formik.touched.code && formik.errors.code
                                                : value === "address" ? formik.touched.address && formik.errors.address
                                                : value === "city" ? formik.touched.city && formik.errors.city
                                                        : value === "country" ? formik.touched.country && formik.errors.country
                                                            : value === "state" ? formik.touched.state && formik.errors.state
                                                                : value === "skills" ? formik.touched.skills && formik.errors.skills
                                                                    : value === "interests" ? formik.touched.interests && formik.errors.interests
                                                                : null

};

export const handleTest = (type: any, formik: any) => {
    if (type === "lower") {
        return /[a-z]/.test(formik.values.password);
    }
    if (type === "upper") {
        return /[A-Z]/.test(formik.values.password);
    }
    if (type === "number") {
        return /\d/.test(formik.values.password);
    }
    if (type === "special") {
        return /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(formik.values.password);
    }
    if (type === "eight") {
        return /^.{8,}$/.test(formik.values.password);
    }
};
