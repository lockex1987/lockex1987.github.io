FROM centos:7

# Timezone
RUN cp -p /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime

# System update
RUN yum -y update

# Install Tools
RUN yum install -y \
    git \
    less \
    vim \
    curl \
    net-tools

# Install mysql
RUN rpm -Uvh https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm && \
    yum install -y --enablerepo=mysql57-community \
    mysql-community-server

# Cache cleaning
RUN yum clean all

# User
RUN groupmod --gid 1000 mysql && usermod mysql --uid 1000 --gid 1000

# Listen port
EXPOSE 3306

# Startup
ENTRYPOINT ["/usr/sbin/mysqld"]

