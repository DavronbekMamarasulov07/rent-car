
import { useSearchParams } from "react-router-dom";

const useSearchParamsHook = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setParam = (key, value) => {
        if (typeof key !== "string" || typeof value !== "string") {
            return;
        }

        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    const getParam = (key) => {
        if (typeof key !== "string" || !key) {
            return;
        }

        return searchParams.get(key);
    };

    const setParams = (params) => {
        if (typeof params !== "object" || typeof params == "string") {
            return;
        }

        Object.keys(params).forEach((key) => {
            if (
                typeof key !== "string" &&
                (typeof params[key] !== "string" || typeof params[key] !== "number")
            ) {
                return;
            }

            searchParams.set(key, params[key]);
        });

        setSearchParams(searchParams);
    };

    const getParams = () => {
        const params = {};

        for (let [key, value] of searchParams.entries()) {
            params[key] = value;
        }

        return params;
    };

    const removeParam = (key) => {
        if (typeof key !== "string" || !key) {
            return;
        }

        searchParams.delete(key);
        setSearchParams(searchParams);
    };

    const removeParams = (keys) => {
        if (!Array.isArray(keys) || keys.some((key) => typeof key !== "string")) {
            return;
        }

        keys.forEach((key) => searchParams.delete(key));
        setSearchParams(searchParams);
    };

    const clearParams = () => {
        const allParams = getParams();

        Object.keys(allParams).forEach((key) => searchParams.delete(key));
        setSearchParams(searchParams);
    };

    return {
        setParam,
        getParam,
        setParams,
        getParams,
        removeParam,
        removeParams,
        clearParams,
    };
};

export default useSearchParamsHook;