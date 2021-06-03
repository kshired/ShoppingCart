dockerize -wait tcp://mysqldb:3306 -timeout 20s

echo "Start server"
yarn migrate
yarn start