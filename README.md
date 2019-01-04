
Subir o container mysql e phpmyadmin em background 
docker-compose up

Import file dump sql 
docker exec -i mysql-container mysql -uroot -pdocker rapida_db < dump.sql

Publush page github.io
ng build --prod --base-href "https://<user-name>.github.io/<repo>/"