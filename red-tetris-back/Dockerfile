FROM node:16

RUN mkdir /app
WORKDIR /app

COPY . /app

ENV WS_PORT=81
ENV PORT=4000
ENV HOST 0.0.0.0

RUN npm install
RUN chmod +x entrypoint.sh

EXPOSE 4000
EXPOSE 81
EXPOSE 24679

ENTRYPOINT ["/app/entrypoint.sh"]


#docker build -t rtback .
#docker run -d -it --name rtbackimg -p 81:81 -p 4000:4000 rtback