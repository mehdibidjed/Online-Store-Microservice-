# Online-Store-Microservice-

this is a microservice Architecture of an online store using all the principle of MS architect and node js for the implementation

# Hello Push

test git push

# run keycloack , the Identity Provide

docker run -d \
 --name keycloak \
 -p 8080:8080 \
 -e KEYCLOAK_ADMIN=admin \
 -e KEYCLOAK_ADMIN_PASSWORD=admin \
 quay.io/keycloak/keycloak:21.1.1 \
 start-dev

# run Consul , the registery service 
docker run -d \
  --name consul \
  -p 8500:8500 \
  -p 8600:8600/udp \
  consul:1.15 agent -dev -client=0.0.0.0

docker run -d --name consul --network="host" consul:1.15 agent -dev -client=0.0.0.0
# run postgres
docker run -d \
  --name postgres \
  -p 5432:5432 \
  -e POSTGRES_USER=product_user \
  -e POSTGRES_PASSWORD=product_pass \
  -e POSTGRES_DB=product_db \
  postgres:16
