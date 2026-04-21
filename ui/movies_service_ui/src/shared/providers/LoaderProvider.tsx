import { LoaderContext } from "../contexts/LoaderContext";
import Loader from "../components/Loader";
import { useIsFetching } from "@tanstack/react-query";

export const LoaderProvider = ({children} : {children: React.ReactNode}) => {

    const isFetching = useIsFetching();

    return (
        <LoaderContext.Provider value={{}}>
            {children}
            {isFetching > 0 && <Loader/>}
        </LoaderContext.Provider>
    )
}