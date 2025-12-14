import React from 'react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-android-light-bg dark:bg-android-bg relative scroll-mt-28 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          <span className="border-b-4 border-android pb-2">Work Experience</span>
        </h2>

        <div className="relative border-l-2 border-android/30 ml-4 md:ml-6 space-y-12">
          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 md:pl-12">
              {/* Dot on timeline */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-android border-4 border-white dark:border-android-bg"></div>

              <div className="bg-white dark:bg-android-surface p-6 rounded-xl border border-gray-200 dark:border-white/5 hover:border-android/30 transition-all duration-300 shadow-sm dark:shadow-none">
                <span className="inline-block px-3 py-1 bg-android/10 text-android-dark dark:text-android text-xs font-bold rounded-full mb-3">
                  {exp.period}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.role}</h3>
                <h4 className="text-lg text-gray-600 dark:text-gray-400 mb-4">{exp.company}</h4>
                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-600 dark:text-gray-400">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;