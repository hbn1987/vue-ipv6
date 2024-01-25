# vue-ipv6

## Description

The website of IPv6 Hitlists.

## Require

```shell
apt-get update
apt-get install nodejs
apt-get install npm

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
chmod +x ~/.nvm/nvm.sh
source ~/.bashrc

# update node
nvm install 16.15.1 

npm install -g pnpm
pnpm install -g @vue/cli
pnpm setup
source /root/.bashrc

# install node-modules
pnpm install

# nginx config
vi /etc/nginx/sites-enabled/default

server {
        listen 80 default_server;
        listen [::]:80 default_server;
        sendfile            on;
        tcp_nopush          on;
        tcp_nodelay         on;
        keepalive_timeout   65;
        types_hash_max_size 2048;
        include             /etc/nginx/mime.types;
        default_type        application/octet-stream;
        root /var/www/ipv6;
        index index.html index.htm index. nginx-debian.html;
        server_name _;
        location / {
                try_files $uri $uri/ /index.html;
        }
}
```

## Build

```shell
./deploy.sh
```
