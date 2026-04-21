import type { MovieType } from "@/shared/types/MovieType";
import { Heart } from "lucide-react";
import { useHeartBtn } from "../hooks/useHeartBtn";

type HeartBtnProps = {
    movie: MovieType;
    setFavorites?: React.Dispatch<React.SetStateAction<MovieType[]>>;
}

const HeartBtn = ({ movie } : HeartBtnProps) => {

    const { handleFavorite, favorited } = useHeartBtn(movie);

    return (
        <div className="flex justify-end">
            <button
                onClick={(e) => {
                    e.preventDefault(); 
                    handleFavorite();
                }}
                className="w-9 h-9 cursor-pointer rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-500/80 transition-colors"
            >
                <Heart size={16} className={favorited ? "text-red-500" : "text-white"} />
            </button>
        </div>
    );
}

export default HeartBtn;
