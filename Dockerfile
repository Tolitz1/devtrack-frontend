FROM node:20
WORKDIR /code
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]