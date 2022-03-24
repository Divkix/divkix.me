FROM nginx:alpine
COPY ./site/* /usr/share/nginx/html/
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
