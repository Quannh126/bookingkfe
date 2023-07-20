import React, {
    PropsWithChildren,
    useEffect,
    useReducer,
    useState,
} from "react";

import {
    defaultSocketContextState,
    SocketContextProvider,
    SocketReducer,
} from "./SocketContext";
import { useSocket } from "@/hooks";
import { CircularProgress } from "@mui/material";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
    ISocketContextComponentProps
> = (props) => {
    const { children } = props;

    const socket = useSocket("ws://localhost:5000", {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false,
    });

    const [SocketState, SocketDispatch] = useReducer(
        SocketReducer,
        defaultSocketContextState
    );
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.connect();
        SocketDispatch({ type: "update_socket", payload: socket });
        StartListeners();
        // eslint-disable-next-line
    }, []);

    const StartListeners = () => {
        socket.on("data_changes", () => {
            SocketDispatch({ type: "data_change", payload: true });
        });

        socket.on("disconnect", () => {
            socket.disconnect();
        });
    };

    if (loading) return <CircularProgress />;

    return (
        <SocketContextProvider value={{ SocketState, SocketDispatch }}>
            {children}
        </SocketContextProvider>
    );
};

export default SocketContextComponent;
