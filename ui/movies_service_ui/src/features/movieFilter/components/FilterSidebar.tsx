import { X, SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";

const GENRES = [
    "Action", "Comedy", "Drama", "Horror", "Thriller",
    "Romance", "Science Fiction", "Animation", "Documentary", "Crime"
];

type Props = {
    selectedGenres: string[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
    onClear: () => void;
};

const FilterSidebar = ({ selectedGenres, onClear, setSelectedGenres }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggleGenre = useCallback((genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    },[selectedGenres]);

    return (
        <>
            {/* trigger button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-30 flex items-center gap-2 px-4 py-2.5
                           bg-white/5 hover:bg-white/10 active:scale-95
                           border border-white/10 hover:border-white/20
                           rounded-full backdrop-blur-md
                           text-white/60 hover:text-white/90 text-sm
                           transition-all duration-200"
            >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
                {selectedGenres.length > 0 && (
                    <span className="flex items-center justify-center w-4 h-4 rounded-full
                                     bg-white text-black text-[10px] font-medium">
                        {selectedGenres.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* sidebar */}
            <div className={`
                fixed z-50 transition-all duration-300
                md:top-1/2 md:-translate-y-1/2 md:left-6 md:w-72 md:rounded-2xl
                bottom-0 left-0 right-0 w-full rounded-t-2xl md:bottom-auto
                bg-primary/70 border border-white/10 backdrop-blur-md
                ${isOpen ? "md:translate-x-0 translate-y-0" : "md:-translate-x-[120%] translate-y-full"}
            `}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                    <div>
                        <h2 className="text-white font-medium">Filters</h2>
                        {selectedGenres.length > 0 && (
                            <p className="text-white/40 text-xs mt-0.5">{selectedGenres.length} selected</p>
                        )}
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                        <X size={15} className="text-white/60" />
                    </button>
                </div>

                <div className="px-6 py-5">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Genres</p>
                    <div className="flex flex-wrap gap-2">
                        {GENRES.map(genre => (
                            <button
                                key={genre}
                                onClick={() => onToggleGenre(genre)}
                                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                                    selectedGenres.includes(genre)
                                        ? "bg-white text-black border-white"
                                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white/80"
                                }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedGenres.length > 0 && (
                    <div className="px-6 pb-6">
                        <button
                            onClick={onClear}
                            className="w-full py-2 rounded-xl border border-white/10 text-white/40 text-sm hover:text-white/60 hover:border-white/20 transition-colors"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default FilterSidebar;