import data from '@/data';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

export const Intro = () => {
  return (
    <motion.div
      animate={{ y: 0 }}
      className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl p-5 md:p-8"
      id="intro"
      initial={{ y: 40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          alt="SUTD campus background"
          className="scale-110 object-cover blur-2xl"
          fill
          priority
          src={data.school}
        />
        <div className="absolute inset-0 bg-bgblue/65" />
      </div>

      <div className="relative z-10 w-full md:w-3/4 text-textDark">
        <p className="text-2xl font-fira text-textDark">Welcome to </p>
        <h1 className="text-5xl font-extrabold text-text md:text-5xl">
          Intelligent Machine Perception Lab
        </h1>
        <h2 className="text-4xl text-textDark md:text-2xl">
          at Singapore University of Technology and Design
        </h2>

        <div className="mt-4 text-textDark">
          <span className="font-medium text-text">{data.intro} </span>
          <p>{data.intro2}</p>
          <p>{data.intro3}</p>
        </div>
      </div>
    </motion.div>
  );
};
