FROM node:4
ADD . /api
WORKDIR /api
RUN npm install
ENTRYPOINT ["/usr/local/bin/node"]
CMD [ "server.js"]
