import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { useSelector } from "react-redux";

import Subscriptions from './Subscriptions'
import NotLogDesktop from "./NotLogDesktop";
import TopBar from "../HomeSections/TopBar";

export default function () {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const matches = useMediaQuery('(min-width:960px)')

    return (
        <>
            {!matches && <TopBar />}
            {
                isAuthenticated ? <Subscriptions />
                    : matches ? <NotLogDesktop /> : null
            }
        </>
    )
}
