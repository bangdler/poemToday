#!/bin/bash
REPOSITORY=/home/ec2-user/build_be/BE

cd $REPOSITORY

sudo npm install

sudo pm2 start src/index.js