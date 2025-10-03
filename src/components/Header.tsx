import { Music2, Heart } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { cn } from '@/lib/utils';

interface HeaderProps {
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showFavorites, onToggleFavorites }) => {
  const favorites = useAppSelector((state) => state.albums.favorites);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Music2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Sky Music
              </h1>
              <p className="text-sm text-muted-foreground">Top 100 Albums</p>
            </div>
          </div>

          <button
            onClick={onToggleFavorites}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
              showFavorites
                ? "bg-accent text-accent-foreground"
                : "bg-card hover:bg-card-hover text-foreground"
            )}
          >
            <Heart className={cn("w-5 h-5", showFavorites && "fill-current")} />
            <span className="font-medium">Favorites</span>
            {favorites.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};