import { Zap } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useMovieOfTheDay } from "../hooks/useMovieOfTheDay";

const MovieOfTheDay = () => {

  const { movie } = useMovieOfTheDay();

  return (
    <>
      <div className="flex mb-8 bg-gradient-to-br from-[#17181a] to-[#2b2c2e] rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div
              className="cursor-pointer flex items-center "
            >
              <div className="flex items-center flex-col justify-start gap-3 mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl text-white/60">Movie of the Day</h2>
                  <p className="text-sm text-muted-foreground">Curated pick for {new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                </div>
                <img
                  src={movie?.Poster}
                  alt={movie?.Title || "No Title"}
                  className="w-full max-w-xs mx-auto rounded-2xl shadow-xl"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-2xl">{movie?.Title || "No Title Available"}</h3>
              {
                movie?.Genres?.map(x => (
                  <span className="inline-block px-3 py-1 shadow-xs shadow-white text-foreground rounded-full text-sm mr-2 mb-2">
                    {x.Name}
                  </span>
                ))
              }
              <p className="text-foreground leading-relaxed mb-6 mt-3">
                {movie?.Overview || "No overview available"}
              </p>
              <NavLink
                to={"/movie/" + movie?.Id}
                className="transition-transform duration-300 linear hover:scale-105 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                <Zap size={18} />
                View Details
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieOfTheDay;
