export DATABASE_URL=postgres:///ubuntu
export SECRET_KEY="$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)"
python3 manage.py runserver 0.0.0.0:8000
