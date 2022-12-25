#!/bin/bash
REPOSITORY=/home/ec2-user/build_be

cd $REPOSITORY

sudo npm install

sudo pm2 start src