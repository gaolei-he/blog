#!/bin/bash

export http_proxy='http://127.0.0.1:13986'
export https_proxy='http://127.0.0.1:13986'
export HTTP_PROXY='http://127.0.0.1:13986'
export HTTPS_PROXY='http://127.0.0.1:13986'
~/software/clash/cfw >~/.config/clash/my_clash.log 2>&1 &
pid=$!
trap "echo \"exit clash\"; kill -9 $pid; exit" EXIT