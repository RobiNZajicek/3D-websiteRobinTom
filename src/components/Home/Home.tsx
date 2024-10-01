import './Home.css';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DD from '../../assets/DD.json';
import Lottie from 'lottie-react';
import D from '../../assets/logo3D-removebg-preview.png'
import D2 from '../../assets/cinema-4d-logo-3-removebg-preview.png'
import D3 from '../../assets/logo3D2-removebg-preview.png'
import D4 from '../../assets/logo3D4-removebg-preview.png'
import D5 from '../../assets/ho5513hbe6-houdini-logo-houdini-3d-learning-path-pluralsight-removebg-preview.png'
import cloud from '../../assets/cloud.json'
import {
  Button,
 
} from '@mantine/core';
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(150 - Math.random() * 50); // Faster typing speed
  const [index, setIndex] = useState(1);
  const toRotate = ["Print and use your creativity", "Print your 3D models", "Print anything you want"];
  const period = 500; // Faster switching between full phrases

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    
    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200); // Faster restart after deleting
    }
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, delta]);
//cardScroll
  return (
    <motion.div id="1" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 4.5, type: "spring" }} className="home">
      <motion.div className="home-container">
        <div className="home-container-left">
          <h1 className="home-text">
            <span className="txt-rotate border-r-8 border-b text-sky-500" data-rotate='["PrintSpace", "Print your 3D model"]'>
              <span className="wrap">{text}</span>
            </span>
          </h1>
          <p className="home-par mt-4 text-black">
            Welcome to PrintSpace, where your digital creations come to life. Upload your 3D models, and connect directly to our advanced 3D printers for seamless, high-quality printing. Start transforming your designs into reality today!
          </p>
          <div className="shajt">
            <div className="mt-6 flex rounded-md text-white flex-row max-xl:mt-2">
              <Button className="h-10 w-24">Start 3D</Button>
              <Button className="ml-3 h-10 w-24" variant="default">Rules</Button>
            </div>
          </div>
         
           
          
            
        </div>
        <div className="items-start justify-center home-container-right">
          <Lottie className="It-img" animationData={DD} />
          <div id='' className='bluros'></div>
          <a className='w-16 cursor-pointer ' href="https://github.com/RobiNZajicek" target="_blank" >
          {/* <div className='cloud-div'>
          <Lottie  className='icon two cloud z-50'animationData={cloud}/>
            <img className='icon two' src={D} alt="logo-3D" />
            </div>
            <div className='cloud-div'>
            <Lottie  className='icon three cloud z-50'animationData={cloud}/>
            <img className='icon three ' src={D2} alt="logo-3D" />
            </div>
            <div className='cloud-div'>
            <Lottie  className='icon four cloud z-50'animationData={cloud}/>
            <img className='icon four ' src={D3} alt="logo-3D" />
            </div>
            <div className='cloud-div'>
            <Lottie  className='icon five cloud z-50'animationData={cloud}/>
            <img className='icon five ' src={D4} alt="logo-3D" />
            </div>
            <div className='cloud-div'>
            <Lottie  className='icon one cloud z-50'animationData={cloud}/> 
            <img className='icon one' src={D5} alt="logo-3D" />
            </div> */}
            </a>
        </div>
        <div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;