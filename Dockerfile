FROM ubuntu
WORKDIR /app
ARG DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y npm
COPY . ./
RUN npm install
CMD ["npm", "run-script", "dev"]
