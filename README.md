# Simple sso with keycloak

When importing realm-export.json, regenerating secrets is needed.

> The goal of this project is to secure several apps within a realm protected by Keycloak.
> I want to explore the possibilies offerd by Keycloak for Identity brokering and user federation.

## Stack

* Docker Compose to orchestrate
* Jboss keycloak server
* Simple Express.js backend
* A Vue.js app served by Nginx
