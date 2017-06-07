FROM duecourse/node:7.10.0
WORKDIR /opt/app
EXPOSE 3000

# ensure layer cache is used until package.json is modified
COPY package.json yarn.* /opt/app/
RUN yarn && yarn cache clean

COPY . /opt/app
RUN npm run ts:compile
CMD node src/server.js
