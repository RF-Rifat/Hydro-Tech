"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Head from 'next/head';

const plantData = [
  {
    id: 1,
    title: "Tomato Plant",
    image: "/assets/images/carousel1.jpg",
    slug: "tomato",
  },
  {
    id: 2,
    title: "Strawberry Plant",
    image: "/assets/images/carousel3.jpg",
    slug: "strawberry",
  },
];

const ScanPage = () => {
  return (
    <>
      <Head>
        {/* Link to Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <section className="bg-gradient-to-r from-green-100 to-blue-200 pt-5 font-['Lato']">
        <div className="wrapper flex flex-col items-center justify-center text-center sm:justify-between">
          <h3 className="font-['Playfair Display'] font-bold text-gray-800 text-2xl sm:text-3xl mb-6">
            Select Your Plant for Targeted Diagnosis!
          </h3>
        </div>
        <div className="px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-auto"
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
              {plantData.map((post) => (
                <motion.div
                  key={post.id}
                  className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-2xl transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="font-['Playfair Display'] text-xl font-bold text-green-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="font-['Lato'] text-gray-700 mb-4">
                      Detect diseases in your {post.title} plant here.
                    </p>
                    <Link
                      href={`/scan/${post.slug}`}
                      className="relative inline-flex items-center justify-center p-2 px-6 py-2.5 overflow-hidden font-medium text-green-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-gradient-to-r from-green-400 to-blue-500 duration-300 -translate-x-full group-hover:translate-x-0 ease-out">
                        {post.title}
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-green-600 transition-all duration-300 transform group-hover:translate-x-full ease-out">
                        Click Here To Detect
                      </span>
                      <span className="relative invisible">
                        Click Here To Detect
                      </span>
                    </Link>
                  </div>
                  {/* Decorative plant-themed border */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-green-200 rounded-full shadow-md border-2 border-green-300 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10l4-4 6 6 6-6 4 4m-9 11V9"
                      />
                    </svg>
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
