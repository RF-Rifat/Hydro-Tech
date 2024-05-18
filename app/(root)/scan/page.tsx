"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "Tomato Plat",
    image: "/assets/images/carousel1.jpg",
  },
  {
    id: 2,
    title: "Lettuce",
    image: "/assets/images/carousel1.jpg",
  },
  {
    id: 3,
    title: "Strawberry plant",
    image: "/assets/images/carousel1.jpg",
  },
];

const ScanPage = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center pt-5">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Select your plant diseases detection card: Choose your plant for
            Targeted Diagnosis!
          </h3>
        </div>
        <div className="px-4 py-6 font-[sans-serif]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-md:max-w-lg mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    staggerChildren: 0.3,
                  },
                },
              }}
            >
              {blogPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="rounded overflow-hidden p-6 bg-slate-200 hover:bg-gray-100 transition-all duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#333] my-2">
                      {post.title}
                    </h3>
                    <p className="text-[#333] text-sm">
                      Detect here your {post.title}
                    </p>
                    <Link
                      href="/"
                      className="relative inline-flex items-center justify-center p-2 px-4 py-1.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group mt-2"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                        {/* <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg> */}
                        {post.title}
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                        Click Here To Detect
                      </span>
                      <span className="relative invisible">
                        Click Here To Detect
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScanPage;
