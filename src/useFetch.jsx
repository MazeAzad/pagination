import { useEffect, useState } from "react"
import { paginate } from "./paginate";
export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        const response = await fetch(url);
        const jasonResponse = await response.json();
        setData(paginate(jasonResponse));
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, [url])
    return { loading, data };
}