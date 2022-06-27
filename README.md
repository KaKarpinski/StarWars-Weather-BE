# MYSQL
## migration
You have to update your MYSQL data into env file like so:
HOST='localhost'
DB_USER='root'
PASSWD='MyPassword'
DB_NAME='local_instance'

## creating DB
When it's done you have to run createDB.js file by typing 'node createDB.js' in your console.

# LOGIN
To properly login your session, in one of the routes, you have to add secret key to your env file like so:

SECRET_KEY='1e5c3958b8894b822399859234f1453dc641c0c0961fe7854273045ecfb'

