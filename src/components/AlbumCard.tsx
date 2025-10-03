import { useState } from 'react';
import { Heart, Play, ExternalLink } from 'lucide-react';
import type { Album } from '@/store/albumSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleFavorite } from '@/store/albumSlice';
import { cn } from '@/lib/utils';

interface AlbumCardProps {
  album: Album;
  onSelect: (album: Album) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onSelect }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.albums.favorites);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFavorite = favorites.includes(album.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(album.id));
  };

  return (
    <div 
      className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:bg-card-hover"
      onClick={() => onSelect(album)}
    >
      <div className="aspect-square relative overflow-hidden bg-secondary">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-card animate-pulse" />
        )}
        <img
          src={album.imageUrl}
          alt={album.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-primary rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-primary-hover shadow-glow">
            <Play className="w-6 h-6 text-primary-foreground fill-current" />
          </button>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-300",
            isFavorite 
              ? "bg-accent text-accent-foreground opacity-100" 
              : "bg-background/80 text-foreground opacity-0 group-hover:opacity-100 hover:bg-background"
          )}
        >
          <Heart 
            className={cn(
              "w-5 h-5 transition-all",
              isFavorite && "fill-current"
            )} 
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-1 group-hover:text-primary transition-colors">
          {album.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate mb-2">{album.artist}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">{album.price}</span>
          <a
            href={album.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};