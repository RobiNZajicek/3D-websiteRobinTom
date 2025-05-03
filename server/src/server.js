// server/src/server.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- CORS ---------- */
app.use(cors());

/* ---------- Parsování JSON ---------- */
app.use(express.json());

/* ---------- Multer ---------- */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (_req, file, cb) => {
    if (/\.stl$/i.test(file.originalname)) cb(null, true);
    else cb(new Error('Povoleny jsou pouze .stl soubory'));
  },
});

/* ---------- Nodemailer ---------- */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/* ---------- Pomocné funkce pro generování údajů ---------- */
const generateOrderDetails = () => {
  // Náhodný termín mezi 2-5 dny
  const daysToAdd = Math.floor(Math.random() * 4) + 2; // 2-5 dní
  const readyDate = new Date();
  readyDate.setDate(readyDate.getDate() + daysToAdd);
  
  // Náhodná cena mezi 200-3000 Kč
  const price = Math.floor(Math.random() * 2801) + 200; // 200-3000 Kč
  
  // Náhodné místo vyzvednutí
  const pickupLocations = [
    'Pobočka Praha Centrum - Václavské náměstí 15',
    'Pobočka Praha 2 - Vinohrady, Korunní 89',
    'Pobočka Praha 5 - Anděl, Radlická 3185/1c',
    'Pobočka Brno - Česká 12',
    'Pobočka Ostrava - Stodolní 15'
  ];
  const pickupLocation = pickupLocations[Math.floor(Math.random() * pickupLocations.length)];
  
  // Náhodné ID objednávky
  const orderId = 'ORD-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100);
  
  return {
    orderId,
    readyDate: readyDate.toLocaleDateString('cs-CZ', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    price,
    pickupLocation,
    estimatedHours: Math.floor(Math.random() * 8) + 2 // 2-10 hodin tisku
  };
};

/* ---------- Testovací GET ---------- */
app.get('/', (_req, res) => res.send('API je v provozu'));

/* ---------- POST /api/order ---------- */
app.post('/api/order', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Soubor chybí' });

    const { name, email, description } = req.body;
    const orderDetails = generateOrderDetails();

    // Email pro tebe (původní funkcionalita)
    await transporter.sendMail({
      from: `"3D Print Bot" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nová objednávka od ${name} - ${orderDetails.orderId}`,
      text: `Jméno: ${name}
E-mail: ${email}
Popis: ${description}
ID objednávky: ${orderDetails.orderId}
Odhadovaná cena: ${orderDetails.price} Kč
Termín dokončení: ${orderDetails.readyDate}
Místo vyzvednutí: ${orderDetails.pickupLocation}`,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        },
      ],
    });

    // Email pro zákazníka (nová funkcionalita)
    await transporter.sendMail({
      from: `"3D Print Service" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Potvrzení objednávky 3D tisku - ${orderDetails.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px;">🖨️ Potvrzení objednávky 3D tisku</h1>
            
            <p>Dobrý den <strong>${name}</strong>,</p>
            
            <p>děkujeme za Vaši objednávku! Vaše požadavek na 3D tisk byl úspěšně přijat a zpracováváme jej.</p>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <h2 style="margin-top: 0; color: #1e40af;">📋 Detaily objednávky</h2>
              <p><strong>ID objednávky:</strong> ${orderDetails.orderId}</p>
              <p><strong>Soubor:</strong> ${req.file.originalname}</p>
              <p><strong>Popis:</strong> ${description || 'Bez popisu'}</p>
            </div>
            
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
              <h2 style="margin-top: 0; color: #15803d;">⏰ Termín a cena</h2>
              <p><strong>Bude hotovo:</strong> ${orderDetails.readyDate}</p>
              <p><strong>Odhadovaná cena:</strong> <span style="font-size: 1.2em; color: #15803d; font-weight: bold;">${orderDetails.price} Kč</span></p>
              <p><strong>Odhadovaný čas tisku:</strong> ${orderDetails.estimatedHours} hodin</p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h2 style="margin-top: 0; color: #92400e;">📍 Místo vyzvednutí</h2>
              <p><strong>${orderDetails.pickupLocation}</strong></p>
              <p style="color: #92400e;">⚠️ Nezapomeňte si vzít s sebou doklad totožnosti a toto potvrzení (stačí na telefonu).</p>
            </div>
            
            <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0891b2;">
              <h2 style="margin-top: 0; color: #0c4a6e;">ℹ️ Důležité informace</h2>
              <ul style="color: #0c4a6e;">
                <li>Pošleme Vám SMS, až bude tisk hotový</li>
                <li>Platba probíhá při vyzvednutí (hotově nebo kartou)</li>
                <li>Objekty si můžete vyzvednout do 14 dnů od dokončení</li>
                <li>V případě dotazů nás kontaktujte na tento email</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Děkujeme za důvěru a těšíme se na Vás!<br>
                <strong>Tým 3D Print Service</strong>
              </p>
            </div>
          </div>
        </div>
      `,
      text: `Dobrý den ${name},

děkujeme za Vaši objednávku 3D tisku!

DETAILY OBJEDNÁVKY:
- ID objednávky: ${orderDetails.orderId}
- Soubor: ${req.file.originalname}
- Popis: ${description || 'Bez popisu'}

TERMÍN A CENA:
- Bude hotovo: ${orderDetails.readyDate}
- Odhadovaná cena: ${orderDetails.price} Kč
- Odhadovaný čas tisku: ${orderDetails.estimatedHours} hodin

MÍSTO VYZVEDNUTÍ:
${orderDetails.pickupLocation}

DŮLEŽITÉ INFORMACE:
- Pošleme Vám SMS, až bude tisk hotový
- Platba probíhá při vyzvednutí (hotově nebo kartou)
- Objekty si můžete vyzvednout do 14 dnů od dokončení
- Nezapomeňte si vzít doklad totožnosti

Děkujeme za důvěru!
Tým 3D Print Service`
    });

    res.status(200).json({ 
      message: 'Objednávka odeslána',
      orderDetails: {
        orderId: orderDetails.orderId,
        readyDate: orderDetails.readyDate,
        price: orderDetails.price
      }
    });
  } catch (err) {
    next(err);
  }
});

/* ---------- Error handler ---------- */
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

/* ---------- Start ---------- */
app.listen(PORT, () =>
  console.log(`Backend běží na http://localhost:${PORT}`),
);