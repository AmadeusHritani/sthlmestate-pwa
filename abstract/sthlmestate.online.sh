map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    root /var/www/sthlmestate.online/sthlmestate-pwa/dist;
    index index.html index.htm;

    server_name sthlmestate.online www.sthlmestate.online;

    location / {
        # try_files $uri $uri/ =404;
        # proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://localhost:3000;
        # Fix potential "It appears that your reverse proxy setup is broken" error.
        proxy_redirect      http://localhost:3000 https://sthlmestate.online;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    access_log            /var/log/nginx/seapp.access.log;
    error_log             /var/log/nginx/seapp.error.log;

    ssl_certificate /etc/letsencrypt/live/sthlmestate.online/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/sthlmestate.online/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.sthlmestate.online) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = sthlmestate.online) {
        return 301 https://$host$request_uri;
    } # managed by Certbot
    listen 80;
    listen [::]:80;

    server_name sthlmestate.online www.sthlmestate.online;
    return 404; # managed by Certbot
}
