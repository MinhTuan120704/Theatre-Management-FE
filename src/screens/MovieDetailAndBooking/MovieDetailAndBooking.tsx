import { useParams } from "react-router-dom";

const MovieDetailAndBooking = () => {
  const { movieId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Chi tiết phim #{movieId}
        </h1>
        <div className="bg-white rounded-lg p-8">
          <p className="text-gray-600">
            Movie Detail & Booking page - Coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailAndBooking;
