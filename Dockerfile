# Filename: Dockerfile
FROM node:10.17.0-alpine
LABEL maintainer="Julian Andrade julian@ndrade.com.br"
WORKDIR /usr/src/app

# Source: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
# Installs latest Chromium (77) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3030

CMD ["npm", "start"]
