import React, {useState,useEffect} from "react";
import axios from "axios";

const Axios = () => {
    const [data, AllData] = useState([]);

    useEffect(() => {
        axios
            .all([
                axios.get()
            ])
    })
}
