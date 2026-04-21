// components/HeroSection.tsx

import { useState } from "react";

export default function HomePageBg() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden mb-8">
            
            {/* Фото з fallback */}
            <Bg />

            {/* Темний overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, rgba(5,8,5,0.35) 0%, rgba(5,8,5,0.55) 50%, rgba(5,8,5,0.85) 100%)'
                }}
            />

            {/* Vignette */}
            <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }}
            />

            {/* Fade вниз до #131212 */}
            <div
                className="absolute bottom-0 left-0 right-0 h-44"
                style={{ background: 'linear-gradient(to top, #131212, transparent)' }}
            />

            {/* Контент */}
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <p className="text-xs tracking-[0.35em] uppercase mb-6 flex items-center justify-center gap-4"
                >
                    Discover the unknown
                </p>
                <h1 className="text-6xl md:text-8xl font-light text-white/90 leading-none mb-4">
                    Into the<br/>
                    <span className="text-white/60 italic">Dark Forest</span>
                </h1>
                <p className="text-white/50 text-sm tracking-widest max-w-md mx-auto leading-relaxed mt-6">
                    Where shadows breathe and ancient trees hold secrets older than memory.
                </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-white">Scroll</span>
                <div
                    className="w-px h-10"
                    style={{ background: 'linear-gradient(to bottom, white, transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }}
                />
            </div>

        </div>
    );
}

// Окремий sub-компонент для fallback логіки
const Bg = () => {
    const urls = [
        'https://images.unsplash.com/photo-1685009327752-4e54e7218b14?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvcmVzdCUyMGJsYWNrfGVufDB8fDB8fHww',
        'https://images.unsplash.com/photo-1491622652925-46646d8a603d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
    ];

    const [index, setIndex] = useState(0);

    return (
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url('${urls[index]}')`,
                animation: 'slowZoom 20s ease-in-out infinite alternate',
            }}
        >
            <img
                src={urls[index]}
                className="hidden"
                onError={() => {
                    if (index + 1 < urls.length) {
                        setIndex(i => i + 1);
                    }
                }}
            />
            
        </div>
    );
}