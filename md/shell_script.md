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
- `-z` string is null, zero length
    - `if [ -z $a ]`

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

## File Test Operators

```bash
#! /bin/bash

echo -e "Enter the name of the file : \c"

read file_name

# -e 选项，判断文件或文件夹是否存在
# -f 选项，判断文件是否存在(文件属性为-)
# -d 选项，判断文件夹是否存在(文件属性为d)
# -b 选项，判断是否为块设备文件
# -c 选项，判断是否为字符设备文件
# -s 选项，判断文件是否为空
# -r 选项，判断文件是否可读
# -w 选项，判断文件是否可写
# -x 选项，判断文件是否可执行

if [ -e $file_name ]
then
    echo "$file_name found"
else
    echo "$file_name not found"
fi

if [ -s $file_name ]
then
    echo "$file_name is not empty"
else
    echo "$file_name is empty"
fi
```

## Append Text to File

使用`cat >>`命令将输入内容追加到文件中

```bash
#!/bin/bash
echo -e "Enter the name of the file : \c"

read file_name

if [ -f $file_name ]
then
    if [ -w $file_name ]
    then
        echo "Type some text data. To quit press ctrl+d"
        cat >> $file_name
    else
        echo "The file do not have write permission"
    fi
else
    echo "$file_name not exists"
fi
```

## And Or Operators

基本格式

```bash
# And Operator
[ condition1 ] && [ condition2 ]
[ condition1 -a condition2 ]
[[ condition1 && condition2 ]]

# Or Operator
[ condition1 ] || [ condition2 ]
[ condition1 -o condition2 ]
[[ condition1 || condition2 ]]
```
```bash
#!/bin/bash

age=45

if [ "$age" -gt 18 ] && [ "$age" -lt 30 ]
then
    echo "Valid age"
elif [ "$age" -gt 30 -a "$age" -lt 40 ]
then
    echo "Age is between 30 and 40"
elif [[ "$age" -gt 40 && "$age" -lt 50 ]]
then
    echo "Age is between 40 and 50"
else
    echo "Age not valid"
fi
```

## Arthimetic Operations

算数运算符，包括`+` `-` `*` `/` `%`等
```bash
#!/bin/bash

num1=20
num2=3

echo $(( num1 + num2 ))
echo $(( num1 - num2 ))
echo $(( num1 * num2 ))
echo $(( num1 / num2 ))
echo $(( num1 % num2 ))

echo $(expr $num1 + $num2)
echo $(expr $num1 - $num2)
echo $(expr $num1 \* $num2)
echo $(expr $num1 / $num2)
echo $(expr $num1 % $num2)
```

浮点数运算，bash本身不支持，借助`bc`实现  
注意，`bc`支持任意精度的浮点数运算

```bash
#!/bin/bash

num1=20.5
num2=3

echo "20.5+5" | bc
echo "20.5-5" | bc
echo "20.5*5" | bc
echo "scale=2;20.5/5" | bc
echo "20.5%5" | bc

echo "$num1+$num2" | bc
echo "$num1-$num2" | bc
echo "$num1*$num2" | bc
echo "scale=2;$num1/$num2" | bc
echo "$num1%$num2" | bc

echo "scale=40;a(1)*4" | bc -l
echo "scale=2;3^3" | bc -l
```

## Case Statement

基本语法

```bash
#!/bin/bash

case expression in
    pattern1 )
        statements ;;
    pattern2 )
        statements ;;
    ...
    patternN )
        statements ;;
    * )
        statements ;;
esac
```

实例

```bash
#!/bin/bash

vechicle=$1

case $vechicle in
    "car" )
        echo "Rent of $vechicle is 100 dollar" ;;
    "van" )
        echo "Rent of $vechicle is 80 dollar" ;;
    "bicycle" )
        echo "Rent of $vechicle is 5 dollar" ;;
    "truck" )
        echo "Rent of $vechicle is 150 dollar" ;;
    * )
        echo "Unknown vechicle" ;;
esac
```

使用正则表达式

```bash
#!/bin/bash

echo -e "Enter some character: \c"

read value

case $value in
    [a-z] )
        echo "Lower case character" ;;
    [A-Z] )
        echo "Upper case character" ;;
    [0-9] )
        echo "Number" ;;
    ? )
        echo "Special character" ;;
    * )
        echo "Unknown input" ;;
esac
```

## Array

数组
bash中数组下标从0开始，下标可以不连续

```bash
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
```
