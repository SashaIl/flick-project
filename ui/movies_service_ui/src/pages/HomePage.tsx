import AiSearchBar from '@/features/ai/components/AiSearchBar';
import MovieOfTheDay from '@/features/movies/components/MovieOfTheDay';
import RecommendedMovies from '@/features/movies/components/RecommendedMovies';
import HomePageBg from '@/shared/components/HomePageBg';

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            
            <HomePageBg />
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <MovieOfTheDay />
                <AiSearchBar/>
                {/* <RecentlyViewedMovies recentlyViewedMovies={[]}/> */}
                <RecommendedMovies />
                
            </div>
        </div>
    );
}

export default HomePage;
