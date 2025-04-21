import Image from "next/image";

const NotFoundPhoto = () => {
  return (
    <div className="mt-12 animate__animated animate__fadeInDownBig">
      <Image
        src="/404photo.jpg"
        alt="Computer store"
        width={1200}
        height={600}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
};

export default NotFoundPhoto;
