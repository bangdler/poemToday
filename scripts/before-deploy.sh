#!/bin/bash
REPOSITORY=/home/ec2-user

sudo pm2 kill

cd $REPOSITORY

sudo rm -rf build_be