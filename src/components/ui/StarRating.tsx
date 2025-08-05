type StarRatingProps = {
  rating: number;
  maxStars?: number;
};

export function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${
            i < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
