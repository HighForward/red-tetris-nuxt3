FROM node:16

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install
RUN chmod +x entrypoint.sh

EXPOSE 4000
ENV HOST 0.0.0.0

ENTRYPOINT ["/app/entrypoint.sh"]
