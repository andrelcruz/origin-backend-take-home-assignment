#!/bin/bash

# Variables
container_backend = backend

# Default
all: down up

# Commands
up:
	docker-compose up --remove-orphans -d
	make logs
down:
	docker-compose down
clean: down
	rm -rf dist/
	rm -rf node_modules/
	rm -rf coverage/
restart:
	docker-compose restart $(container_backend)
logs:
	docker-compose logs --timestamps --follow --tail="all"
reset:
	docker-compose down --rmi all --volumes
bash:
	docker exec -it $(container_backend) /bin/bash
install:
	docker exec $(container_backend) npm install
build:
	docker exec $(container_backend) npm run build
test.unit:
	docker exec $(container_backend) npm run test:unit
test.unit:
	docker exec $(container_backend) npm run test:e2e
test.unit.coverage:
	docker exec $(container_backend) npm run test:coverage
