#!/usr/bin/bash

echo 'restore database...'
cp api/data/db/db.json.bak api/data/db/db.json && echo 'restore successful'
echo ''
