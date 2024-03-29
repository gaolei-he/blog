# 使用链式存储结构实现循环队列

> 实现方法，仅设置一个指向队列尾节点的指针，尾节点不存储元素，作为特殊节点对待
> 初始状态下，尾节点的next指针指向自己，表示队列为空

> 定义节点结构体

```cpp
typedef int Elem;
struct Node
{
    Elem data;
    Node* next;
};
```

> 初始化函数，将尾节点的next指针指向自己，此时队列为空

```cpp
void init(Node* tail)
{
    tail->next = tail;
}
```

> 判断队列是否为空，当尾节点指向自己时，队列为空

```cpp
bool empty(Node* tail)
{
    return tail == tail->next;
}
```

> 元素入队，将元素赋值给队尾节点，然后新建一个节点作为新的尾节点

```cpp
void push(Node*& tail, Elem data)
{
    Node* p = new Node;
    tail -> data = data;
    p->next = tail->next;
    tail->next = p;
    tail = p;
}
```

> 元素出队，将队尾节点的next指针指向队头元素的下一个节点，然后delete原队头节点

```cpp
bool pop(Node* tail, Elem& data)
{
    Node* p = tail->next;
    if(!empty(tail)) {
        data = p->data;
        tail->next = p->next;
        delete p;
        return true;
    }
}
```

> 清空队列，队头元素出队，直到队列为空

```cpp
void clear(Node*& tail)
{
    Elem data;
    while(!empty(tail))
        pop(tail, data);
}
```

[完整代码](pointer_code.cpp)
