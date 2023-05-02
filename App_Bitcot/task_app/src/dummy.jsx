import { useState, useEffect, useContext } from "react";
import { collective } from "./App";

const Dummy = () => {
    const icontext = useContext(collective);
    return(
        <h1>{icontext.cstate.password}</h1>
    )
}
export default Dummy;