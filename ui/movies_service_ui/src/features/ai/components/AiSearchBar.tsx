import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useAiSearchBar } from "../hooks/useAiSearchBar";
import MovieCard from "@/features/movies/components/MovieCard";

const MAX_CHARS = 100;

const AiSearchBar = () => {
    
    const {
        query,
        setQuery,
        isFocused,
        setIsFocused,
        inputRef,
        charsUsed,
        isOverLimit,
        canSubmit,
        counterColor,
        isLoading,
        handleSubmit,
        handleKeyDown,
        movies
    } = useAiSearchBar();

    return (
        <div className="w-full my-6">

            <div className="relative my-10">
                
                <div style={{
                    height: "1px",
                    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)"
                }} />

                <div style={{
                    height: "4px",
                    marginTop: "-2px",
                    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
                    filter: "blur(4px)"
                }} />

                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className="px-5 py-1 text-xs font-semibold tracking-widest uppercase rounded-full"
                        style={{
                            background: "rgba(33,35,39,1)",
                            color: "rgba(255,255,255,0.45)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        Ai search
                    </span>
                </div>
            </div>
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    borderRadius: "999px",

                    border: `1px solid ${
                        isOverLimit
                            ? "rgba(229,115,115,0.45)"
                            : isFocused || isLoading
                            ? "rgba(255,255,255,0.2)"  
                            : "rgba(255,255,255,0.07)"
                    }`,

                    background: "rgba(33,35,39,0.88)",
                    backdropFilter: "blur(16px)",
                    padding: "clamp(10px, 2vw, 14px) clamp(16px, 3vw, 22px)",
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",

                    boxShadow: isLoading
                        ? "0 0 0 4px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.75)"
                        : isFocused
                        ? "0 0 0 4px rgba(255,255,255,0.03), 0 8px 40px rgba(0,0,0,0.7)"
                        : "0 8px 40px rgba(0,0,0,0.55)",

                    opacity: isLoading ? 0.82 : 1,
                    animation: isLoading ? "pulse 2s ease-in-out infinite" : "none",
                }}
            >
                {isLoading ? (
                    <Loader2
                        style={{
                            flexShrink: 0,
                            width: "clamp(15px, 2.5vw, 17px)",
                            height: "clamp(15px, 2.5vw, 17px)",
                            // Акцентний колір — світліший відтінок base
                            color: "rgba(255,255,255,0.55)",
                            animation: "spin 1s linear infinite",
                        }}
                    />
                ) : (
                    <Sparkles
                        style={{
                            flexShrink: 0,
                            width: "clamp(15px, 2.5vw, 17px)",
                            height: "clamp(15px, 2.5vw, 17px)",
                            color: isFocused
                                ? "rgba(255,255,255,0.55)"
                                : "rgba(255,255,255,0.2)",
                            transition: "color 0.3s ease",
                        }}
                    />
                )}

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isLoading}
                    placeholder={
                        isLoading
                            ? "AI is thinking..."
                            : "Scary Korean thrillers, Marvel 2017–2020..."
                    }
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                        color: isLoading
                            ? "rgba(255,255,255,0.35)"
                            : "rgba(255,255,255,0.85)",
                        minWidth: 0,
                        transition: "color 0.3s ease",
                        cursor: isLoading ? "not-allowed" : "text",
                    }}
                />

                {!isLoading && (
                    <span
                        className="hidden sm:inline"
                        style={{
                            flexShrink: 0,
                            fontSize: "clamp(0.7rem, 1.5vw, 0.75rem)",
                            fontVariantNumeric: "tabular-nums",
                            color: counterColor,
                            transition: "color 0.2s ease",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {charsUsed}/{MAX_CHARS}
                    </span>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    style={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 18px",
                        borderRadius: "999px",
                        border: "none",
                        cursor: canSubmit ? "pointer" : "not-allowed",
                        fontSize: "clamp(0.75rem, 1.8vw, 0.85rem)",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        // Активна кнопка = світліший відтінок base (#2c2f35) з обводкою
                        background: isLoading
                            ? "rgba(255,255,255,0.05)"
                            : canSubmit
                            ? "rgba(255,255,255,0.12)"   // subtle light fill
                            : "rgba(255,255,255,0.04)",
                        // Обводка кнопки підкреслює її форму
                        outline: canSubmit && !isLoading
                            ? "1px solid rgba(255,255,255,0.18)"
                            : "1px solid transparent",
                        color: isLoading
                            ? "rgba(255,255,255,0.3)"
                            : canSubmit
                            ? "rgba(255,255,255,0.88)"
                            : "rgba(255,255,255,0.2)",
                        transition: "all 0.25s ease",
                    }}
                >
                    {isLoading ? (
                        <span className="hidden sm:inline">
                            Searching
                            <span style={{ animation: "dots 1.5s steps(3, end) infinite" }}>
                                ...
                            </span>
                        </span>
                    ) : (
                        <>
                            <span className="hidden sm:inline">Search</span>
                            <ArrowRight style={{ width: 14, height: 14 }} />
                        </>
                    )}
                </button>

                {/* Лінія прогресу — монохромна, відповідає палітрі */}
                {isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: "5%",
                            right: "5%",
                            height: "2px",
                            borderRadius: "999px",
                            background: "rgba(255,255,255,0.06)",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: "40%",
                                background: "rgba(255,255,255,0.35)",
                                borderRadius: "999px",
                                animation: "progress 1.4s ease-in-out infinite",
                            }}
                        />
                    </div>
                )}
            </div>

            <style>{`
                input::placeholder { color: rgba(255,255,255,0.18); }
                input:disabled { cursor: not-allowed; }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 0 4px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.75); }
                    50%       { box-shadow: 0 0 0 6px rgba(255,255,255,0.07), 0 8px 40px rgba(0,0,0,0.75); }
                }
                @keyframes progress {
                    0%   { transform: translateX(-100%); }
                    50%  { transform: translateX(200%); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes dots {
                    0%   { content: ""; }
                    33%  { content: "."; }
                    66%  { content: ".."; }
                    100% { content: "..."; }
                }
            `}</style>

            <div className="mt-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {movies.map((movie: any) => (
                        <MovieCard movie={movie} key={movie.Id} />
                    ))}
                </div>
                {!isLoading && movies.length === 0 && query.trim().length > 0 && (
                <p className="text-center mt-8" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
                        No movies found. Try a different query.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AiSearchBar;