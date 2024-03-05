# [Shell Script](https://www.youtube.com/playlist?list=PLS1QulWo1RIYmaxcEqw5JhK3b-6rgdWO_)

## Introduction

一种可以直接在Shell中运行的语言，不需要借助外部编译器。

bash脚本首行一般为`#! /bin/bash`，表示使用bash解释器。  
bash脚本文件一般以`.sh`结尾，表示是一个bash脚本文件。  
以上规则为约定俗成，不是强制规定。

## using Variables and Comments

注释以`#`开头

```bash
# This is a comment
```

变量使用`=`赋值，两边不能有空格，全大写变量一般为系统变量，全小写变量一般为用户变量

```bash
name="Brad"
echo "The name is $name"
echo $BASH
echo $BASH_VERSION

# present working directory
echo $PWD
```

## Read User Input

读取用户输入

```bash
#! /bin/bash

echo "Enter name : "
# 读取单一变量
read name
echo "Enterd name : $name"

echo "Enter names : "
# 读取多个变量
read name1 name2 name3
echo "names : $name1 , $name2 , $name3"

# -p 表示输入不换行 -s 表示不显示输入
# 引号内容为提示信息
read -p 'username : ' user_var
read -sp 'password : ' pass_var
echo
echo "username : $user_var"
echo "password : $pass_var"

echo "Enter names : "
# 读取数组
read -a names
echo "Names : ${names[0]}"

echo "Enter name : "
# store in $REPLY
# read后不指定变量名，输入内容存储在$REPLY中
read
echo "Name : $REPLY"
```

## Pass Arguments to a Script

从命令行传递参数

```bash
#! /bin/bash
# 运行命令时输入的参数
# 例如 ./test.sh Brad 25
# 则 $0 为 ./test.sh $1 为 Brad $2 为 25
echo $0 $1 $2 ' > echo $1 $2'

# 将传递参数存储在数组中，$0除外
args=("$@")

echo ${args[0]}

# $@ 表示所有参数
echo $@
# $# 表示参数个数
echo $#
```

## If Statement

基本语法
```bash
if [ condition ]
then
    statement
elif [ condition ]
then
    statement
else
    statement
fi
```

整数比较运算符
- `-eq` equal
    - `if [ $a -eq $b ]`
- `-ne` not equal
    - `if [ $a -ne $b ]`
- `-gt` greater than
    - `if [ $a -gt $b ]`
- `-ge` greater than or equal
    - `if [ $a -ge $b ]`
- `-lt` less than
    - `if [ $a -lt $b ]`
- `-le` less than or equal
    - `if [ $a -le $b ]`

- `<` less than
    - `if (( $a < $b ))`
- `<=` less than or equal
    - `if (( $a <= $b ))`
- `>` greater than
    - `if (( $a > $b ))`
- `>=` greater than or equal
    - `if (( $a >= $b ))`

字符串比较运算符
- `=` equal
    - `if [ $a = $b ]`
- `==` equal
    - `if [ $a == $b ]`
- `!=` not equal
    - `if [ $a != $b ]`
- `<` less than
    - `if [[ $a < $b ]]`
- `>` greater than
    - `if [[ $a > $b ]]`

```bash
#! /bin/bash

count=10
if [ $count -eq 10 ]
then
    echo "condition is true"
fi

if (( $count > 9 ))
then
    echo "condition is true"
fi

word="abc"
if [ $word == "abc" ]
then
    echo "condition is true"
fi
if [ $word = "abcc" ]
then
    echo "condition is true"
elif [ $word = "abc"]
then
    echo "word is abc"
else
    echo "condition is false"
fi
```