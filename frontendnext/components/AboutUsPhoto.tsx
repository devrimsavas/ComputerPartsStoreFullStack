import Image from "next/image";

const CompanySplashPhoto = () => {
  return (
    <div className="mt-12 animate__animated animate__fadeInDownBig">
      <Image
        src="/aboutus.jpg"
        alt="Computer store"
        width={1200}
        height={600}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
};

export default CompanySplashPhoto;
