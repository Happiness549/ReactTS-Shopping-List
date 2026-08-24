import { useSelector} from "react-redux";
import type{ RootState } from "../store";

export const  Profile = () => {
    const userDetails = useSelector((state:RootState) => state.login.userData);

    return(
        <></>

    )
}