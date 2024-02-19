FROM node:lts as dependencies
WORKDIR /my-project
COPY package.json package-lock.json ./
RUN yarn install

RUN yarn prisma generate

RUN rm -rf node_modules
RUN yarn --frozen-lockfile --prod


FROM node:lts as builder
WORKDIR /my-project
COPY ./ .
COPY ./.env .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN npm run build
FROM node:lts as runner
WORKDIR /my-project
ENV NODE_ENV production
COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/.env ./.env
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["yarn", "start", "-p" , "3000"]