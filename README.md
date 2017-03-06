# Big-Bowl-Game
A party game consisting of three rounds using the same word bank.

# Website URL
https://bigbowl.herokuapp.com/

## To run locally on Cloud9
First, create a new Python workspace. Then, enter the following commands in bash:
- $ git clone https://github.com/superjeffreyc/Big-Bowl-Game
- $ cd Big-Bowl-Game
- $ sudo apt-get update
- $ sudo apt install libpq-dev python-dev
- $ sudo pip install -r requirements.txt
- $ sudo service postgresql start
- $ export DATABASE_URL=postgres:///"$(whoami)"
- $ export SECRET_KEY="$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)"
- $ touch .env
- $ python manage.py migrate
- $ python manage.py collectstatic
- $ heroku local
