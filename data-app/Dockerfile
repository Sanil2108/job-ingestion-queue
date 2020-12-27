FROM ubuntu
RUN mkdir -p /opt/app
COPY . /opt/app/
WORKDIR /opt/app/
RUN apt-get update
RUN apt-get install nodejs -y
CMD ["node", "node_modules/nodemon/bin/nodemon.js", "app.js"]