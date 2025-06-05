include .env

deploy:
	npx vite build
	gcloud app deploy