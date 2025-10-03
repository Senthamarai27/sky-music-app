import axios from 'axios';
import { type Album } from '../store/albumSlice';
// import { Album } from 'lucide-react';




const API_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

export const fetchTopAlbums = async (): Promise<Album[]> => {
  try {
    const response = await axios.get(API_URL);
    const entries = response.data.feed.entry;
    
    return entries.map((entry: any, index: number) => ({
      id: entry.id.attributes['im:id'] || `album-${index}`,
      title: entry['im:name'].label,
      artist: entry['im:artist'].label,
      imageUrl: entry['im:image'][2].label.replace('170x170', '600x600'),
      price: entry['im:price'].label,
      category: entry.category.attributes.label,
      releaseDate: entry['im:releaseDate'].label,
      link: entry.link.attributes.href,
      rights: entry.rights?.label || '',
      itemCount: entry['im:itemCount']?.label,
    }));
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw new Error('Failed to fetch albums. Please try again later.');
  }
};