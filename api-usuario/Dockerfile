# FROM node:20-alpine

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . ./

# RUN npm run build

# CMD [ "node", "./build/index.js" ]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY build/ ./build

CMD ["node", "build/index.js"]
