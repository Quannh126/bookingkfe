import React from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import Confirm from "./Confirm";
import Success from "./Success";

import { useSelector } from "react-redux";
import { getFormState } from "@/redux/stepForm";

// Step titles
const labels = ["Chọn chỗ ngồi", "Chọn điểm đón trả", "Điền thông tin"];
const handleSteps = (step: number) => {
    switch (step) {
        case 0:
            return <FirstStep />;
        case 1:
            return <SecondStep />;
        case 2:
            return <Confirm />;
        default:
            throw new Error("Unknown step");
    }
};

export default function StepForm() {
    const formValue = useSelector(getFormState);
    const step = formValue.step;
    return (
        <>
            {step.value === labels.length ? (
                <Success />
            ) : (
                <>
                    <Stepper
                        activeStep={step.value}
                        sx={{ py: 3 }}
                        alternativeLabel
                    >
                        {labels.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {handleSteps(step.value)}
                </>
            )}
        </>
    );
}
