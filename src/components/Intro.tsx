import data from '@/data';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

export const Intro = () => {
  return (
    <motion.section
      animate={{ y: 0 }}
      className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl p-5 md:p-8"
      id="intro"
      initial={{ y: 40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          alt="SUTD campus background"
          className="scale-105 object-cover blur-xl"
          fill
          priority
          src={data.school}
        />
        <div className="absolute inset-0 bg-bgblue/55" />
      </div>

      <div className="grid min-h-[560px] grid-cols-1 gap-8 px-8 py-10 md:grid-cols-2 md:px-10">
        <div className="flex flex-col justify-center text-white">
          <p className="text-2xl font-fira text-white/90">Welcome to</p>
          <h1 className="mt-2 text-5xl font-extrabold leading-tight md:text-7xl">
            Intelligent Machine
            <br />
            Perception Lab
          </h1>
          <h2 className="mt-4 text-4xl text-white/90 md:text-5xl">
            at Singapore University of Technology and Design
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
            {data.intro}
          </p>
          <p className="max-w-3xl text-lg leading-8 text-white/90">
            {data.intro2}
          </p>
          <p className="max-w-3xl text-lg leading-8 text-white/90">
            {data.intro3}
          </p>
        </div>

        <div className="flex items-end md:items-center md:justify-end">
          <div className="w-full max-w-md rounded-2xl border border-white/40 bg-white/82 p-6 shadow-2xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Core Areas of Research
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="font-semibold text-slate-900">Computer Vision</p>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  3D computer vision, scene understanding, object perception,
                  and robust visual learning.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Machine Learning</p>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  Data-efficient learning, out-of-distribution learning,
                  continual and multi-modal learning.
                </p>
              </div>
            </div>
            <button
              className="mt-6 rounded-md bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              type="button"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
