import { Search, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchTerm, setSelectedCategory, filterAlbums } from '@/store/albumSlice';
import { cn } from '@/lib/utils';

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.albums.searchTerm);
  const selectedCategory = useAppSelector((state) => state.albums.selectedCategory);
  const categories = useAppSelector((state) => state.albums.categories);

  const handleSearchChange = (term: string) => {
    dispatch(setSearchTerm(term));
    dispatch(filterAlbums());
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
    dispatch(filterAlbums());
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search albums or artists..."
          className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground"
        />
        {searchTerm && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === category
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "bg-card hover:bg-card-hover text-foreground border border-border"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};