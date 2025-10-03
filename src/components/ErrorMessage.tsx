import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 p-8">
      <div className="bg-destructive/10 p-4 rounded-full">
        <AlertCircle className="w-12 h-12 text-destructive" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Oops! Something went wrong</h3>
        <p className="text-muted-foreground max-w-md">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};