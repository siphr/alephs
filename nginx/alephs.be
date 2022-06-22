  server {
    listen 443 ssl;
    client_max_body_size 4G;

    server_name api-alephs.techtum.dev;

    ssl_certificate /etc/letsencrypt/live/api-alephs.techtum.dev/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api-alephs.techtum.dev/privkey.pem; # managed by Certbot

    location / {
      proxy_set_header Host $http_host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_redirect off;
      proxy_buffering off;
      #proxy_pass http://uvicorn;
      proxy_pass http://127.0.0.1:8002;
    }
  }

  map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
  }

  upstream uvicorn {
    server unix:/tmp/alephs.sock;
  }
