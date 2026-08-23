import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../store";

export const ProtectedRoute = () => {
    const user = useSelector((state: RootState) => state.login.userData)

    if(!user){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}