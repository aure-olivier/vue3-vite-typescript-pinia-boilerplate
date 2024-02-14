FROM node:20.11-alpine

LABEL maintainer="aure.olivier@gmail.com"

RUN mkdir -p /home/app

# COPY UI + API
COPY api/dist /home/app
COPY api/node_modules /home/app/node_modules

EXPOSE 8080

CMD ["node", "/home/app/app.js"]