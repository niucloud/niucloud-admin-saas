FROM phpdockerio/php80-fpm AS niucloud_php
WORKDIR "/var/www"

# 更新包信息并安装扩展依赖
RUN apt-get update && \
    apt-get -y --no-install-recommends install apt-utils && \
    apt-get -y --no-install-recommends install php8.0-bcmath php8.0-redis php8.0-mysqli php8.0-gd && \
    apt-get clean && \
    apt-get autoremove && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# 设置 open_basedir
RUN echo "open_basedir = /tmp:/var" > /etc/php/8.0/fpm/conf.d/open_basedir.ini

