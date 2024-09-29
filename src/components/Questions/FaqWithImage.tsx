import { Image, Accordion, Grid, Container, Title } from '@mantine/core';
import image from './image.svg';
import classes from './FaqWithImage.module.css';
import Lottie from 'lottie-react';
import faq from '../../assets/faq.json';

export function FaqWithImage() {
  return (
    <div className={classes.wrapper}>
      <Container className='flex ' size="lg">
        <Grid id="faq-grid" gutter={50}>
          <div className='flex flex-row gap-40'>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Lottie animationData={faq} className={classes.faq} alt="Frequently Asked Questions" />
            </Grid.Col>
            <Grid.Col className='mt-20' span={{ base: 12, md: 6 }}>
              <Title order={2} ta="left" className={classes.title}>
                Frequently Asked Questions
              </Title>

              <Accordion chevronPosition="right" defaultValue="file-requirements" variant="separated">
                <Accordion.Item className={classes.item} value="file-requirements">
                  <Accordion.Control>What file formats are supported for 3D printing?</Accordion.Control>
                  <Accordion.Panel>
                    We support a variety of file formats for 3D printing, including STL, OBJ, and AMF. Please ensure that your model is exported in one of these formats for compatibility.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="model-check">
                  <Accordion.Control>How can I check if my 3D model is suitable for printing?</Accordion.Control>
                  <Accordion.Panel>
                    You can use our online 3D model checker tool to verify if your model meets the requirements for printing. Additionally, we recommend checking the model for non-manifold edges, proper scale, and ensuring there are no overlapping geometries.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="printing-time">
                  <Accordion.Control>How long does it take to print a 3D model?</Accordion.Control>
                  <Accordion.Panel>
                    The printing time varies based on the size and complexity of your model. On average, small models may take a few hours, while larger and more intricate designs can take several days. You will receive an estimated printing time upon submission.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="material-options">
                  <Accordion.Control>What materials can I choose for my 3D print?</Accordion.Control>
                  <Accordion.Panel>
                    We offer a range of materials including PLA, ABS, PETG, and resin. Each material has its own unique properties, so you can choose one based on your specific needs for strength, flexibility, or detail.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="shipping-options">
                  <Accordion.Control>What are the shipping options for my 3D printed model?</Accordion.Control>
                  <Accordion.Panel>
                    We provide multiple shipping options including standard and expedited delivery. You can select your preferred shipping method at checkout, and you will receive tracking information once your model is shipped.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="model-revisions">
                  <Accordion.Control>Can I request changes to my model after uploading?</Accordion.Control>
                  <Accordion.Panel>
                    Yes, you can request changes to your model up until it enters the printing stage. Once printing has begun, modifications may not be possible, but feel free to reach out to us for assistance.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="support-contact">
                  <Accordion.Control>How can I contact customer support if I have questions?</Accordion.Control>
                  <Accordion.Panel>
                    You can reach our customer support team via email at support@example.com or by using the contact form on our website. We're here to assist you with any questions or concerns you may have.
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Grid.Col>
          </div>
        </Grid>
      </Container>
    </div>
  );
}
