import { Music } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-pulse" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <Music className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
      </div>
      <p className="text-muted-foreground animate-pulse">Loading amazing music...</p>
    </div>
  );
};