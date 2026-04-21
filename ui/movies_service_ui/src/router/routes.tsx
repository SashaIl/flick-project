import { createBrowserRouter } from "react-router-dom";
import Root from "@/layouts/Root";
import HomePage from "@/pages/HomePage";
import NotFound from "@/layouts/NotFound";
import Login from "@/features/auth/components/Login";
import Signup from "@/features/auth/components/Signup";
import MovieDetailsPage from "@/pages/MovieDetailsPage";
import ListOfFavoriteMovies from "@/features/favorites/components/ListOfFavoriteMovies";
import ProfilePage from "@/pages/ProfilePage";
import EmailVerifyCodePage from "@/features/auth/components/EmailVerification";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children:[
            {
                element: <HomePage/>,
                index: true
            },
            {
                path: "/movie/:id",
                element: <MovieDetailsPage />,
            },
            {
                path: "/favorites",
                element: <ListOfFavoriteMovies />,
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/signup",
        element: <Signup/>,
    },
    {
        path: "/verifyEmail",
        element: <EmailVerifyCodePage/>,
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default routes;