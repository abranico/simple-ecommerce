import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-14   ">
      <h1 className="text-9xl font-extrabold text-gray-600">404</h1>
      <p className="text-2xl text-gray-700 mt-4">
        ¡Oops! La página que buscas no existe.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-md text-lg font-semibold hover:bg-gray-500 transition duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
