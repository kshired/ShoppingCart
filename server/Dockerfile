FROM node:14

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma/ ./
COPY .env ./

RUN yarn install

COPY . .

RUN chmod +x docker-entrypoint.sh  
ENTRYPOINT ["sh","/usr/src/app/docker-entrypoint.sh"]

EXPOSE 8080