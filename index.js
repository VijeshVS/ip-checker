import express from 'express';

const app = express();
app.set('trust proxy', true); // important if behind reverse proxy (e.g. nginx)

app.get('/api/test', (req, res) => {
  const rawIp = req.headers['x-forwarded-for'] || req.ip || req.socket?.remoteAddress;
  const ip = String(rawIp).split(',')[0].trim().replace(/^::ffff:/, '');
  const userAgent = req.get('User-Agent') || 'Unknown';

  console.log(`
==============================
  New Request Received
  Time       : ${new Date().toISOString()}
  IP Address : ${ip}
  User-Agent : ${userAgent}
==============================
  `);

  res.send('Request logged successfully');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

