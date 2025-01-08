import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../client/App';

const app = express();
const PORT = 3000;

// Сервируем статические файлы
app.use(express.static('dist/client'));

// SSR-обработка запросов
app.get('*', (req, res) => {
  const appHtml = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React SSR with Vite</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="/client/index.js"></script>
    </body>
    </html>
  `;

  res.status(200).send(html);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
