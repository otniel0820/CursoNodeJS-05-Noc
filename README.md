# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con Typescript

# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Instalar dependencias `npm install`
4. Levantar las bases de datos con el comando
```
docker compose up -d
```
5. Ejecutar comando para generar migraciones de prisma para migrar postgre en caso de que no haya base de datos ya creada

```
npx prisma migrate dev
```
6. Correr la aplicación en modo desarrollo: `npm run dev`.

#Obtener Gmail key

https://myaccount.google.com/security
https://myaccount.google.com/u/0/apppasswords
