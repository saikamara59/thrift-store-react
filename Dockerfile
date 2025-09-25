FROM node:20-alpine 

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build
RUN ls -l /app/dist


RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]

EXPOSE 5173 