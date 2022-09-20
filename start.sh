export DATABASE_URL=postgres:///ubuntu
export SECRET_KEY="$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)"
gunicorn config.wsgi --log-file -
