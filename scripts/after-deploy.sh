#!/bin/bash
REPOSITORY=/home/ec2-user/build_be/BE

cd $REPOSITORY

sudo /usr/bin/npm

sudo /usr/bin/pm2 start src