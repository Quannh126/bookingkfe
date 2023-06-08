import { axiosClientFile } from "@/api-client";
import { useState } from "react";

type StateUpload = {
    isLoading: boolean;
    error: string;
};

interface MutationProps {
    url: string;
    method?: string;
}

const useMutation = ({ url, method = "POST" }: MutationProps) => {
    const [state, setState] = useState<StateUpload>({
        isLoading: false,
        error: "",
    });

    const fn = async (data: any) => {
        setState((prev) => ({
            ...prev,
            isLoading: true,
        }));
        axiosClientFile({ url, method, data })
            .then(() => {
                setState({ isLoading: false, error: "" });
            })
            .catch((error) => {
                setState({ isLoading: false, error: error.message });
            });
    };

    return { mutate: fn, ...state };
};

export default useMutation;
