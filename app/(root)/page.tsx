"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const images = [
    "/assets/images/carousel1.jpg",
    "/assets/images/carousel2.jpg",
    "/assets/images/carousel3.jpg",
    "/assets/images/carousel4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  const dragEndHandler = (event: string, info: any) => {
    if (info.offset.x > 50) {
      handlePrev();
    } else if (info.offset.x < -50) {
      handleNext();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 h-[70svh]">
          <div className="grid space-y-4 justify-around h-[30svh] lg:h-full">
            <h1 className="h1-bold">
              Scan Your Plants for Diseases Instantly!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Upload an image of your plant and our advanced AI will detect any
              potential diseases, helping you keep your garden healthy and
              thriving.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/scan">Start Scanning</Link>
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-lg h-[40svh] lg:h-full mt-20 lg:mt-0">
            <AnimatePresence custom={currentImage}>
              <motion.div
                key={currentImage}
                custom={currentImage}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                className="absolute w-full h-full"
              >
                <Image
                  src={images[currentImage]}
                  alt={`Plant Image ${currentImage + 1}`}
                  width={1000}
                  height={1000}
                  className="w-full h-full rounded-lg"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 flex justify-between items-center p-4">
              <button
                onClick={handlePrev}
                className="bg-gray-800 text-white p-2 rounded-full bg-opacity-50 hover:bg-opacity-75 transition"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-800 text-white p-2 rounded-full bg-opacity-50 hover:bg-opacity-75 transition"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
