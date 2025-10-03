import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setAlbums, setLoading, setError } from '@/store/albumSlice';
import { fetchTopAlbums } from '@/services/albumService';
import { AlbumCard } from '@/components/AlbumCard';
import { SearchBar } from '@/components/SearchBar';
import { AlbumModal } from '@/components/AlbumModal';
import { Header } from '@/components/Header';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { Album } from '@/store/albumSlice';

const Index = () => {
  const dispatch = useAppDispatch();
  const filteredAlbums = useAppSelector((state) => state.albums.filteredAlbums);
  const loading = useAppSelector((state) => state.albums.loading);
  const error = useAppSelector((state) => state.albums.error);
  const favorites = useAppSelector((state) => state.albums.favorites);
  
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const loadAlbums = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const albums = await fetchTopAlbums();
      dispatch(setAlbums(albums));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'An error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const displayAlbums = showFavorites 
    ? filteredAlbums.filter(album => favorites.includes(album.id))
    : filteredAlbums;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        showFavorites={showFavorites} 
        onToggleFavorites={() => setShowFavorites(!showFavorites)} 
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Discover Today's Top Albums
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the hottest 100 albums trending right now. Your next favorite song is just a click away.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadAlbums} />
        ) : (
          <>
            {showFavorites && displayAlbums.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No favorite albums yet. Start adding some!
                </p>
              </div>
            ) : displayAlbums.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No albums found matching your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {displayAlbums.map(album => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onSelect={setSelectedAlbum}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Album Modal */}
      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </div>
  );
};

export default Index;