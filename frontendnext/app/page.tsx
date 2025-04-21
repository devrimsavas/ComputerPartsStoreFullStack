import CompanySplashPhoto from "@/components/CompanySplashPhoto";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-4 py-20 flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
        Welcome to TechParts Direct ⚙️
      </h1>
      <p className="text-xl text-gray-800 max-w-3xl mb-8">
        Discover top-quality computer components and electronic parts for every
        need. Whether you're a gamer, a builder, or a tech enthusiast, we've got
        everything from GPUs and CPUs to motherboards and power supplies — all
        at competitive prices.
      </p>
      <a
        href="/products"
        className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow hover:bg-blue-700 transition"
      >
        Shop Now
      </a>
      <CompanySplashPhoto />
    </main>
  );
};

export default Home;
