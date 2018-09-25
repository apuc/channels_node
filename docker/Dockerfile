FROM node:8.11.4

ENV app_path /var/www/express_channels

WORKDIR $app_path

COPY package.json $app_path
COPY package-lock.json $app_path

RUN npm install

COPY . $app_path

CMD ["npm","start"]

EXPOSE ${NODE_PORT}

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:${NODE_PORT}/ || exit 1