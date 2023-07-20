import React, { createContext } from "react";
import { Socket } from "socket.io-client";

export interface ISocketContextState {
    socket: Socket | undefined;
    dataChange: boolean;
}

export const defaultSocketContextState: ISocketContextState = {
    socket: undefined,
    dataChange: false,
};

export type TSocketContextActions = "update_socket" | "data_change";
export type TSocketContextPayload = boolean | Socket;

export interface ISocketContextActions {
    type: TSocketContextActions;
    payload: TSocketContextPayload;
}

export const SocketReducer = (
    state: ISocketContextState,
    action: ISocketContextActions
) => {
    console.log(
        "Message recieved - Action: " + action.type + " - Payload: ",
        action.payload
    );

    switch (action.type) {
        case "update_socket":
            return { ...state, socket: action.payload as Socket };
        case "data_change":
            return { ...state, dataChange: action.payload as boolean };
        default:
            return state;
    }
};

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
