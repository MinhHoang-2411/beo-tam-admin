echo "----Check out develop----"
git checkout develop
echo "----Pull code develop----"
git pull origin develop

docker-compose down
docker-compose build beotam
docker-compose up -d
