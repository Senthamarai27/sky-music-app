import { X, Calendar, Music, DollarSign, ExternalLink, Heart } from 'lucide-react';
import type { Album } from '@/store/albumSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleFavorite } from '@/store/albumSlice';
import { cn } from '@/lib/utils';

interface AlbumModalProps {
  album: Album | null;
  onClose: () => void;
}

export const AlbumModal: React.FC<AlbumModalProps> = ({ album, onClose }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.albums.favorites);
  
  if (!album) return null;

  const isFavorite = favorites.includes(album.id);
  const releaseDate = new Date(album.releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-card rounded-xl shadow-glow max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative">
            <img
              src={album.imageUrl}
              alt={album.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-overlay" />
          </div>

          <div className="md:w-1/2 p-8 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{album.title}</h2>
              <p className="text-xl text-muted-foreground">{album.artist}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-foreground">Released: {releaseDate}</span>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-foreground font-semibold">{album.price}</span>
              </div>

              {album.itemCount && (
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{album.itemCount} tracks</span>
                </div>
              )}

              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground">
                  {album.category}
                </span>
              </div>
            </div>

            {album.rights && (
              <div className="text-sm text-muted-foreground border-t border-border pt-4">
                {album.rights}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => dispatch(toggleFavorite(album.id))}
                className={cn(
                  "flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2",
                  isFavorite
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "bg-secondary text-secondary-foreground hover:bg-card-hover"
                )}
              >
                <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>

              <a
                href={album.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                View on iTunes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};