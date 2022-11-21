FROM node:18-alpine3.15
RUN apk add --no-cache python3 g++ make yarn
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000
