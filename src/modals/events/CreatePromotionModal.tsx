import React, {useState} from 'react';
import {PlusIcon, XIcon} from "lucide-react";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {createPromotion} from "@/features/events/promotion.slice";

interface CreatePromotionModalProps {
    isOpen: boolean;
    toggle: () => void;
}

const CreatePromotionModal:  React.FC<CreatePromotionModalProps> = ({isOpen, toggle}) => {
    const [eventType, setEventType] = React.useState('one-time');
    const dispatch = useDispatch<AppDispatch>();
    const { authToken } = useSelector((state: RootState) => state.auth)

    const [breakdowns, setBreakdowns] = useState<string[]>(['']);

    const handleAddField = () => {
        setBreakdowns([...breakdowns, '']);
    };

    const handleInputChange = (index: number, value: string) => {
        const newBreakdowns = [...breakdowns];
        newBreakdowns[index] = value;
        setBreakdowns(newBreakdowns);
    };

    const handleRemoveField = (index: number) => {
        const newBreakdowns = breakdowns.filter((_, i) => i !== index);
        setBreakdowns(newBreakdowns);
    };

    const createPromotionSchema = yup.object({
        name: yup
            .string()
            .required("Email is required"),
        price_option: yup
            .string()
            .required("Email is required"),
        price: yup
            .string()
            .required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            price_option: "",
            price: "",
        },
        validationSchema: createPromotionSchema,
        onSubmit: async (values) => {
            if (authToken) {
                const data = {...values, breakdown: breakdowns}
                console.log({data})
                dispatch(createPromotion({ token: authToken, data }))
            }
        },
    })

    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 items-center justify-center z-50 ${isOpen ? "flex" : "hidden"}`}>
            <div className="w-[640px] bg-white pt-[16px] pb-[4px] rounded-[12px]">
                <form onSubmit={formik.handleSubmit}>
                    <div className={"py-[4px] px-[16px]"}>
                        <div className="flex justify-between items-center">
                            <div className={'flex gap-[8px] items-center'}>
                                <XIcon onClick={toggle} className={'cursor-pointer'}/>
                                <p className="font-sans font-semibold text-[18px] leading-[27px]">
                                    Create promotion
                                </p>
                            </div>
                            <div className="cursor-pointer">
                                <button
                                    className={"border-[1px] border-step-color px-[14px] py-[11px] rounded-[12px] bg-gradient-green w-full"}
                                    type={'submit'}
                                >
                                    <p className={"text-[16px] font-medium text-white"}>Create promotion</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"py-[16px] flex flex-col gap-[24px] px-[16px]"}>
                        <div className={"flex flex-col gap-[2px]"}>
                            <p className={"text-text-grey font-normal text-[14px]"}>Promotion name</p>
                            <input
                                id="name"
                                className={"bg-light-grey p-[12px] gap-[12px] rounded-[12px] h-[48px] text-[14px]"}
                                placeholder={""}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className={"flex flex-col gap-[4px]"}>
                            <p className={"text-text-grey font-normal text-[14px]"}>Price option</p>
                            <div className="flex gap-2">
                                <div
                                    className={`flex gap-2 cursor-pointer rounded-[12px] p-[12px] px-[16px] items-center ${eventType === "one-time" ? "bg-gradient-green-2 shadow-event-custom" : "bg-light_grey text-text-grey"}`}
                                    onClick={() => {
                                        setEventType('one-time')
                                        formik.setFieldValue('price_option', 'one-time')
                                    }}
                                >
                                    <p className="font-sans font-normal text-[14px] leading-[21px] tracking-custom">One time</p>
                                </div>
                                <div
                                    className={`flex gap-2 cursor-pointer rounded-[12px] p-[12px] px-[16px] items-center ${eventType === "unit" ? "bg-gradient-green-2 shadow-event-custom" : "bg-light_grey text-text-grey"}`}
                                    onClick={() => {
                                        setEventType('unit')
                                        formik.setFieldValue('price_option', 'unit')
                                    }}
                                >
                                    <p className="font-sans font-normal text-[14px] leading-[21px] tracking-custom">Unit</p>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-[2px]"}>
                            <p className={"text-text-grey font-normal text-[14px]"}>Promotion Price</p>
                            <input
                                id="price"
                                className={"bg-light-grey p-[12px] gap-[12px] rounded-[12px] h-[48px] text-[14px]"}
                                placeholder={"N0.00"}
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <p className="text-text-grey font-normal text-[14px]">Breakdown</p>
                            {breakdowns.map((breakdown, index) => (
                                <div key={index} className="flex flex-col gap-[2px]">
                                    <div className="relative">
                                        <input
                                            className="bg-light-grey p-[12px] pr-[40px] gap-[12px] rounded-[12px] h-[48px] text-[14px] w-full"
                                            placeholder="Enter breakdown of promotion"
                                            value={breakdown}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                        />
                                        {index > 0 && (
                                            <button
                                                onClick={() => handleRemoveField(index)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                                                <XIcon size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={"flex justify-between gap-[16px] px-[16px] pb-[10px]"}>
                        <button
                            className={"border-[1px] px-[48px] py-[11px] rounded-[12px] bg-light-green-10 w-full flex items-center justify-center"}
                            onClick={handleAddField}
                        >
                            <PlusIcon className={'text-light-green'} />
                            <p className={"text-[16px] font-medium text-light-green"}>Add breakdown</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePromotionModal;