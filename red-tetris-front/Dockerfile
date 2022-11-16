FROM node:16

RUN mkdir /app
WORKDIR /app

COPY . /app

ENV WS_PORT=81
ENV PORT=80
ENV HOST=0.0.0.0
ENV BACKEND_URL="127.0.0.1"

RUN npm install
RUN chmod +x entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/app/entrypoint.sh"]

#docker build -t rtfront .
#docker run -d -it -p 80:80 --name rtfrontimg rtfront