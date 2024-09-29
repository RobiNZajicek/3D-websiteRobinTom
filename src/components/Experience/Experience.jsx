import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import './Experience.css'
import "react-vertical-timeline-component/style.min.css";
import plane from '../../assets/plane.json';
import { styles } from "../../styles.js";
import { experiences } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion.js";
import Lottie from 'lottie-react';
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'url(https://cdn.scopicsoftware.com/wp-content/uploads/2023/05/section-3-bckground-3.png)',backgroundSize:'cover',backgroundRepeat:'no-repeat',
        color: "black",
     
      }}
      contentArrowStyle={{ borderRight: "7px solid  #a4c7fe" }}
      date={<span style={{ fontWeight: 'bold', color: '#a4c7fe' }}>{experience.date}</span>}
      iconStyle={{ background: 'url(https://cdn.scopicsoftware.com/wp-content/uploads/2023/05/section-3-bckground-3.png)'}}
      icon={
        <div className='black flex justify-center items-center w-full h-full'>
          <span
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-blue-300 text-[34px] font-extrabold'>{experience.title}</h3>
        <h2
          className='  text-[20px] font-bold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </h2>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className=' text-[15px] font-normal pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <section className='works flex items-center justify-center flex-col'>
      <motion.div className='works flex items-center justify-center flex-col' variants={textVariant()} >
        <p className={`${styles.sectionSubText} text-center text-blue-300`}>
          jak zacit pouzivat 3D tisk
        </p>
        <h2 className={`${styles.sectionHeadText} text-center `}>
          PrintSpace
          
        </h2>
        <span>
        <Lottie className=" w-44 " animationData={plane} /> 
        
        </span>
        
      </motion.div>

      <div className='mt-2 flex flex-col bg'>
      <div className="blurosOs"></div>
        <VerticalTimeline className='before:bg-blue-100 '>
          {experiences.map((experience, index) => (
            <ExperienceCard
            className="text-black text-xl"
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "work");
