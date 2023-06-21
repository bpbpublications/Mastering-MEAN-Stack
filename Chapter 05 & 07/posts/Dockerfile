FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4222
CMD ["npm","start"]