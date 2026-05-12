.PHONY: up down seed logs clean

up:
	docker compose up --build

down:
	docker compose down

seed:
	docker compose exec backend npm run seed

logs:
	docker compose logs -f

clean:
	docker compose down -v

