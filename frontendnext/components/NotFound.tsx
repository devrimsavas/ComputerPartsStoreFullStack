import NotFoundPhoto from "./NotFoundPhoto";


const NotFound = () => {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, we could not find what you’re looking for.
      </p>
      
      <a
        href="/products"
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Back to Products
      </a>
      <NotFoundPhoto/>
    </main>
  );
};

export default NotFound;
