#include <iostream>
using namespace std;
typedef int Elem;
struct Node
{
    Elem data;
    Node* next;
};
void init(Node*& tail)
{
    tail->next = tail;
}
bool empty(Node* tail)
{
    return tail == tail->next;
}
bool pop(Node* tail, Elem& data)
{
    Node* p = tail->next;
    if(!empty(tail)) {
        data = p->data;
        tail->next = p->next;
        delete p;
        return true;
    }
    return false;
}
void push(Node*& tail, Elem data)
{
    Node* p = new Node;
    tail -> data = data;
    p->next = tail->next;
    tail->next = p;
    tail = p;
}
void clear(Node*& tail)
{
    Elem data;
    while(!empty(tail))
        pop(tail, data);
}
int main()
{
    Node* tail = new Node;
    init(tail);
    for (int i = 0; i < 10; i++)
    {
        push(tail, i);
    }
    
    int data;
    clear(tail);
    for (int i = 0; i < 10; i++)
    {
        push(tail, i);
    }
    clear(tail);
    
    return 0;
}