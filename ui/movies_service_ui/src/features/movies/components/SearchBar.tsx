import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <>
            <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                <input 
                    type="text" 
                    placeholder="Search books..." 
                    className="w-full pl-12 pr-12 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                />
            </div>
        </>
    );
}

export default SearchBar;
