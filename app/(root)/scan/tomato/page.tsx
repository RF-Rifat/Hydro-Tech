import ImgForm from "@/components/shared/UploadForm";

const upLoadImg = () => {
  return (
    <>
      <section className="relative bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/tomato.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="wrapper relative z-10">
          <h3 className="h3-bold text-center sm:text-left text-white">
            Upload Your Tomato Plant Image
          </h3>
        </div>
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      </section>

      <div className="wrapper my-8">
        <ImgForm />
      </div>
    </>
  );
};

export default upLoadImg;
