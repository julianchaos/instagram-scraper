# instagram-scraper
An Instagram scraper based on:
 - Node.js
 - Hydra Microservices
 - Puppeteer
 - Redis

## Running Docker image
For running docker image run the following command, changing ```[REDIS_SERVER_IP]```.

```
docker run -p 3030:3030 -d --add-host=redis:[REDIS_SERVER_IP] julianchaos/instagram-scraper
```

## Scraping user
The following endpoint scrape user and saves it's images to redis ```images``` key as a set.
```
/v1/scraper/user/:instagram_user
```
