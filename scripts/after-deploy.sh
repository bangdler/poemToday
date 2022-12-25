#!/bin/bash
REPOSITORY=/home/ec2-user/build_be/BE

cd $REPOSITORY

npm install

pm2 start src