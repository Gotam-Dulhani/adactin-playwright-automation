import http from 'node:http';

const PORT = Number(process.env.MOCK_PORT || 3100);
const TOKEN = 'mock-bearer-token';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.url === '/api/v1/auth/login' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      res.writeHead(200);
      res.end(JSON.stringify({ token: TOKEN, statusCode: 200, description: 'ok' }));
    });
    return;
  }

  if (req.url === '/api/v1/users/current-user' && req.method === 'GET') {
    if (req.headers.authorization !== `Bearer ${TOKEN}`) {
      res.writeHead(401);
      res.end(JSON.stringify({ message: 'Unauthorized' }));
      return;
    }
    res.writeHead(200);
    res.end(JSON.stringify({
      id: 1,
      username: 'mufeezhanif',
      email: 'mufeezhanif@example.com',
      roles: ['user'],
    }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Not Found' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Mock API server listening on http://127.0.0.1:${PORT}`);
});
