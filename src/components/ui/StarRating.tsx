type StarRatingProps = {
  rating: number;
  maxStars?: number;
  editable?: boolean;
  onRate?: (rating: number) => void;
};

export function StarRating({ rating, maxStars = 5, editable = false, onRate }: StarRatingProps) {
  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, i) => (
        <button
          type="button"
          key={i}
          onClick={editable ? () => onRate?.(i + 1) : undefined}
          className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'} ${
            editable ? 'cursor-pointer' : ''
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
