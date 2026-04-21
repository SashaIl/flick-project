import { useAuth } from "@/shared/hooks/useAuth";
import { getFavoriteMovies } from "@/shared/services/favorites";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const UseListOfFavoriteMovies = () => {

    const {user, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    if(!isAuthenticated){
        navigate("/login")
    }
    const {data: favorites = []} = useQuery({
        queryKey: ["favorites", user?.Id],
        queryFn: () => getFavoriteMovies(user?.Id),
        gcTime: 1000 * 60 * 10
    });

    return {favorites, isAuthenticated}
}