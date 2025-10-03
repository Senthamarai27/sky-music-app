import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Album {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  price: string;
  category: string;
  releaseDate: string;
  link: string;
  rights: string;
  itemCount?: string;
}

interface AlbumState {
  albums: Album[];
  filteredAlbums: Album[];
  favorites: string[];
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  albums: [],
  filteredAlbums: [],
  favorites: JSON.parse(localStorage.getItem('skyMusicFavorites') || '[]'),
  searchTerm: '',
  selectedCategory: 'All',
  categories: ['All'],
  loading: false,
  error: null,
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
      state.filteredAlbums = action.payload;
      state.categories = ['All', ...new Set(action.payload.map(a => a.category))];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // Filter logic will be called after this action
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      // Filter logic will be called after this action
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const albumId = action.payload;
      if (state.favorites.includes(albumId)) {
        state.favorites = state.favorites.filter(id => id !== albumId);
      } else {
        state.favorites.push(albumId);
      }
      localStorage.setItem('skyMusicFavorites', JSON.stringify(state.favorites));
    },
    filterAlbums: (state) => {
      let filtered = [...state.albums];
      
      if (state.searchTerm) {
        filtered = filtered.filter(album =>
          album.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          album.artist.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
      
      if (state.selectedCategory !== 'All') {
        filtered = filtered.filter(album => album.category === state.selectedCategory);
      }
      
      state.filteredAlbums = filtered;
    },
  },
});

export const {
  setAlbums,
  setLoading,
  setError,
  setSearchTerm,
  setSelectedCategory,
  toggleFavorite,
  filterAlbums,
} = albumSlice.actions;

export default albumSlice.reducer;