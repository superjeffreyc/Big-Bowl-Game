sudo apt-get update
sudo apt install libpq-dev python-dev
sudo apt install postgresql
sudo pip install -r requirements.txt
sudo service postgresql start
export DATABASE_URL=postgres:///ubuntu
export SECRET_KEY="$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)"
sudo -u postgres createuser "$(whoami)"
sudo -u postgres createdb ubuntu
touch .env
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
