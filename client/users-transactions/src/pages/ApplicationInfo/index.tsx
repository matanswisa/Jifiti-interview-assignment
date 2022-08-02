import { useEffect, useState } from "react"
import { api } from "../../App";

export default function ApplicationInfo() {

    const [data, setData] = useState();

    useEffect(() => {
        async function fetch() {

            return await api.getMoreInfo(1);
        }

        fetch().then((res) => {
            console.log(res);
        });
    })

    return (
        <h1>Lol</h1>
    )
}