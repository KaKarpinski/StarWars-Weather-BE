# Database
## Configuration
You have to update your MYSQL data into env file like so:

```env
HOST='localhost'
DB_USER='root'
PASSWD='MyPassword'
DB_NAME='local_instance'
```

## Migration
When it's done you have to run createDB.js file by typing 'node createDB.js' in your console.

# JWT
To properly login your session, in one of the routes, you have to add secret key to your env file like so:

```env
SECRET_KEY='1e5c3958b8894b822399859234f1453dc641c0c0961fe7854273045ecfb'
```

# Weather
To get connection to weather api, you should add api key in your env file like so:

```env
API_KEY='86b77586951ac0c6fe742ae091109fe2'
```

