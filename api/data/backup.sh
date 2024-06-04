#!/usr/bin/bash

echo 'backing up database...'
cp api/data/db/db.json api/data/db/db.json.bak && echo 'backup successful'
echo ''
