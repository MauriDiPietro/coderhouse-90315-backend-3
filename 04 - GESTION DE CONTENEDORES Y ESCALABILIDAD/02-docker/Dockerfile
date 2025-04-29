FROM node:22.12.0
WORKDIR /app
COPY package*.json ./
COPY . .
# COPY .env .env
RUN npm install
# RUN npm install --only-production         --> ignora devDependencies
EXPOSE 8080
CMD ["npm", "start"]