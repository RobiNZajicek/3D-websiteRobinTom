import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Fixed route handler with proper typing
app.post('/api/order', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const { name, email, description } = req.body;

    const mailOptions = {
      from: `"3D Print Service" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Order: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}`,
      attachments: [{
        filename: req.file.originalname,
        content: req.file.buffer
      }]
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Order submitted successfully' });
  } catch (error) {
    next(error); // Pass errors to Express error handler
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Serve React app
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});