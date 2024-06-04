#!/usr/bin/bash

echo 'reset database...'
cp api/data/db/db.init.json api/data/db/db.json && echo 'reset successful'
echo ''
