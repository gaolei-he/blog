#!/bin/bash

os=("ubuntu" "windows" "kali")
os[3]="mac"

unset os[2]

os[5]="fedora"
echo "${os[@]}"
echo "${os[1]}"
# all index
echo "${!os[@]}"
# length
echo "${#os[@]}"

string="hello world"
echo "${string[@]}"
echo "${string[0]}"
echo "${string[1]}"
echo "${#string[@]}"