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
