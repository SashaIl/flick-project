const Loader = () => (
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/25">
            <div className="relative w-11 h-11">
                {/* Фонове кільце */}
                <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                {/* Спінер */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/60 animate-spin" />
            </div>
        </div>
    </>
);

export default Loader;