#!/bin/bash
REPOSITORY=/home/ec2-user/build_be

sudo pm2 kill

cd $REPOSITORY

sudo rm -rf BE