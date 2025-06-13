import React, {useEffect, useState} from 'react';
import {XIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import * as yup from "yup";
import {useFormik} from "formik";
import {updateWithdrawalThreshold} from "@/features/wallet/wallet.slice";
import {updateToastifyReducer} from "@/redux/toastifySlice";
import {updateCommissionCharge} from "@/features/events/event.slice";
import {FormikButton} from "@/components/global/FormikButton";

interface EditCommissionModalProps {
    isOpen: boolean;
    toggle: () => void;
    id?: number
    commissionCharge:number
}

function EditCommissionModal({isOpen, toggle, id, commissionCharge}: EditCommissionModalProps) {

    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { authToken } = useSelector((state: RootState) => state.auth);
    const commSchema = yup.object({
        percentage: yup.string().required("Commission percentage is required"),
    });

    const formik = useFormik({
        initialValues: {
            percentage: "",
        },
        validationSchema: commSchema,
        onSubmit: (values) => {
            setLoading(true);
            const data = {
                commission_charge: values.percentage,
            }
            dispatch(updateCommissionCharge({data: data, token: authToken})).then((res) => {
                if (res.payload.status) {
                    setLoading(false);
                    dispatch(
                        updateToastifyReducer({
                            show: true,
                            message: `Commission charge updated!`,
                            type: "success",
                        })
                    );
                    toggle()
                    window.location.reload()
                }
            })
        }
    });

    useEffect(() => {
        if (commissionCharge > 0) {
            formik.setFieldValue("percentage", commissionCharge*100);
        }
    }, [commissionCharge]);

    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 items-center justify-center z-50 ${isOpen ? "flex" : "hidden"}`}>
           <form onSubmit={formik.handleSubmit}>
               <div className="w-[360px] bg-white pt-[16px] pb-[4px] rounded-[12px]">
                   <div className={"py-[4px] px-[16px]"}>
                       <div className="flex justify-between items-center">
                           <p className="font-sans font-semibold text-[18px] leading-[27px]">
                               Commission percentage
                           </p>
                           <div className="cursor-pointer" onClick={toggle}>
                               <XIcon/>
                           </div>
                       </div>
                   </div>
                   <div className={"py-[16px] flex flex-col gap-[16px] px-[16px]"}>
                       <p className={"text-[14px] font-normal text-light-black"}>
                           Set the commission to be earned on every ticket sale.
                       </p>
                       <p className={'font-normal text-[14px] text-text-grey'}>Commission percentage (%)</p>
                       <Input
                           className={
                               "bg-light-grey h-[48px] rounded-[12px] py-[12px] px-[12px] border-none"
                           }
                           placeholder={"Commission percentage"}
                           value={formik.values.percentage}
                           onChange={formik.handleChange("percentage")}
                           onBlur={formik.handleBlur}
                           type={'number'}
                       />
                       <div className={"flex justify-between gap-[10px]"}>
                           <button className={"h-[48px] border-[1px] border-light-grey-50 rounded-[12px] bg-white w-[156px]"} onClick={toggle}>
                               <p className={"text-black text-[16px] font-medium"}>Cancel</p>
                           </button>
                           <FormikButton loading={formik.isSubmitting} title={'Save'} error={formik.isValid} classes="border-[1px] px-[14px] py-[11px] rounded-[12px] w-[156px]"/>
                           {/*<button className={"h-[48px] border-[1px] bg-gradient-green rounded-[12px] w-[156px] text-center"}>*/}
                           {/*    <p className={"text-[16px] font-medium text-white"}>Save</p>*/}
                           {/*</button>*/}
                       </div>
                   </div>
               </div>
           </form>
        </div>
    );
}

export default EditCommissionModal;