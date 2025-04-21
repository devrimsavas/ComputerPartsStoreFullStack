import AboutUsPhoto from "@/components/AboutUsPhoto";

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-white px-6 py-20 flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">About Us</h1>
      <p className="text-lg text-gray-800 max-w-4xl">
        At <span className="font-semibold text-blue-600">TechParts Direct</span>
        , we're passionate about technology and innovation. Founded by a team of
        engineers and tech enthusiasts, our mission is to provide reliable,
        high-performance computer components and electronic parts for
        professionals and hobbyists alike. We partner with top manufacturers to
        bring you a wide selection of products — from graphics cards and
        processors to cables, cases, and accessories.
      </p>
      <p className="text-lg text-gray-800 max-w-4xl mt-6">
        With a focus on quality, affordability, and customer satisfaction, we're
        committed to being your trusted source for all things tech. Whether
        you're building your first PC or managing an enterprise system upgrade,
        we’re here to help you succeed.
      </p>
      <AboutUsPhoto/>
    </main>
  );
};

export default AboutUs;
