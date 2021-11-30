FROM postgres:alpine

COPY *.sql /docker-entrypoint-initdb.d/

ADD product.sql /docker-entrypoint-initdb.d

RUN chmod a+r /docker-entrypoint-initdb.d/*

EXPOSE 5432
