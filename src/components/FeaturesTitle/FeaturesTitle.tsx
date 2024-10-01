import { Title, SimpleGrid, Text, ThemeIcon, Grid, rem } from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';
import classes from './FeaturesTitle.module.css';
import { motion } from 'framer-motion';
import { useState } from 'react';

const features = [
  {
    icon: IconReceiptOff,
    title: 'Materials for 3D Printing',
    description: 'Choose a material suitable for your project (e.g., PLA, ABS, PETG). Each material has its properties that affect the final print.',
  },
  {
    title: 'Minimum Wall Thickness',
    description: 'To ensure your model is stable, it should have a minimum wall thickness of at least 1-2 mm, depending on the material used.',
    icon: IconFileCode,
  },
  {
    icon: IconCircleDotted,
    title: 'Supports and Angles',
    description: 'The model should have the correct angles and support where needed. Consider whether the model requires supports to survive the printing process.',
  },
  {
    icon: IconFlame,
    title: 'Files and Formats',
    description: 'Upload files in STL or OBJ format. Ensure the model is closed and free of errors for successful printing.',
  },
];

export function FeaturesTitle() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById('your-element-id');

    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (elementTop < viewportHeight && !isVisible) {
        setIsVisible(true);
      }
    }
  };

  // Add scroll event listener on component mount
  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }); // Empty array ensures it runs only once on mount
  
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text className={classes.li} mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text className={classes.liPar} c="dimmed">
        {feature.description}
      </Text>
    </div>
  ));



  return (
    <div id='3' className='why-us' style={{ width: '100%', marginTop: '3rem', paddingTop: '2rem', paddingRight: '2rem', backgroundImage: 'url(https://cdn.scopicsoftware.com/wp-content/uploads/2023/05/section-3-bckground-3.png)', display: 'flex', alignItems: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <motion.div id="your-element-id" initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 2.5, type: 'spring', delay: 0.2 }} style={{ display: "flex", justifyContent: "center", flexDirection: 'row', alignItems: "center" }} className={classes.wrapper}>
        
        <Grid className={classes.ssss} gutter={90}>
          <Grid.Col className='flex flex-col' span={{ base: 12, md: 5 }}>
            <Title className={classes.title} order={2}>
              <motion.h1>Rules of <motion.span className={classes.highlight}>3D printing</motion.span></motion.h1>
            </Title>
            <Text className={classes.paros} c="dimmed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit facilis illum, recusandae repellat vitae, magni architecto possimus itaque ut velit cumque aut accusamus dolorum aspernatur corporis animi dolores eum quae.
              
            </Text>
            <button type='submit' className='bg-gradient-to-r to-cyan-500 mt-4 from-blue-500 rounded-md w-32 h-12 font-bold text-white max-xl:w-24 max-xl:h-10'>Submit</button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
              {items}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </motion.div>

      {/* 3D Printing Rules Section */}
     
    </div>
  );
}
