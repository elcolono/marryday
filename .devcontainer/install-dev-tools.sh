#!/bin/bash
 
# update package manager
sudo apt-get update
# install node js
    # sudo apt-get -y install nodejs npm
# install sqlite3 to use the dbshell
sudo apt-get -y install sqlite3 libsqlite3-dev
# Recommended: Redis as a fast, persistent cache. Install Redis through your package manager
# https://docs.wagtail.io/en/latest/advanced_topics/performance.html
    # sudo apt-get -y install redis-server
# install the dev python requiremnts
pip install --user -r backend/requirements/dev.txt