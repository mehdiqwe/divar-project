import { Routes, Route, Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";

import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import AdminPage from "pages/AdminPage";
import PageNotFound from "pages/404";
import Loader from "components/modules/Loader";

import { getProfile } from "services/user";

const Router = () => {
    const { isLoading, data } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    })

    if (isLoading) return <Loader />

    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/auth" element={data ? <Navigate to={"/dashboard"} /> : <AuthPage />} />
            <Route path="/dashboard" element={data ? <DashboardPage /> : <Navigate to={"/auth"} replace/>} />
            <Route path="/admin" element={data && data.data.role === "ADMIN" ? <AdminPage /> : <Navigate to={"/"} />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    )
}

export default Router