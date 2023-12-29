# PBDS

## `__gnu_pbds :: tree`

```cpp
#include <ext/pb_ds/assoc_container.hpp>  // 因为tree定义在这里 所以需要包含这个头文件
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;
__gnu_pbds ::tree<Key, Mapped, Cmp_Fn = std::less<Key>, Tag = rb_tree_tag,
                  Node_Update = null_tree_node_update,
                  Allocator = std::allocator<char> >
```

## 模板形参

- `Key`: 储存的元素类型，如果想要存储多个相同的 `Key` 元素，则需要使用类似于 `std::pair` 和 `struct` 的方法，并配合使用 `lower_bound` 和 `upper_bound` 成员函数进行查找
- `Mapped`: 映射规则（Mapped-Policy）类型，如果要指示关联容器是 **集合**，类似于存储元素在 `std::set` 中，此处填入 `null_type`，低版本 `g++` 此处为 `null_mapped_type`；如果要指示关联容器是 **带值的集合**，类似于存储元素在 `std::map` 中，此处填入类似于 `std::map<Key, Value>` 的 `Value` 类型
- `Cmp_Fn`: 关键字比较函子，例如 `std::less<Key>`
- `Tag`: 选择使用何种底层数据结构类型，默认是 `rb_tree_tag`。`__gnu_pbds` 提供不同的三种平衡树，分别是：
  - `rb_tree_tag`：红黑树，一般使用这个，后两者的性能一般不如红黑树
  - `splay_tree_tag`：splay 树
  - `ov_tree_tag`：有序向量树，只是一个由 `vector` 实现的有序结构，类似于排序的 `vector` 来实现平衡树，性能取决于数据想不想卡你
- `Node_Update`：用于更新节点的策略，默认使用 `null_node_update`，若要使用 `order_of_key` 和 `find_by_order` 方法，需要使用 `tree_order_statistics_node_update`
- `Allocator`：空间分配器类型

## 构造方式

```c++
__gnu_pbds::tree<std::pair<int, int>, __gnu_pbds::null_type,
                 std::less<std::pair<int, int> >, __gnu_pbds::rb_tree_tag,
                 __gnu_pbds::tree_order_statistics_node_update>
    tr;
```

## 成员函数

- `insert(x)`：向树中插入一个元素 x，返回 `std::pair<point_iterator, bool>`。
- `erase(x)`：从树中删除一个元素/迭代器 x，返回一个 `bool` 表明是否删除成功。
- `order_of_key(x)`：返回 x 以 `Cmp_Fn` 比较的排名。
- `find_by_order(x)`：返回 `Cmp_Fn` 比较的排名所对应元素的迭代器。
- `lower_bound(x)`：以 `Cmp_Fn` 比较做 `lower_bound`，返回迭代器。
- `upper_bound(x)`：以 `Cmp_Fn` 比较做 `upper_bound`，返回迭代器。
- `join(x)`：将 x 树并入当前树，前提是两棵树的类型一样，x 树被删除。
- `split(x,b)`：以 `Cmp_Fn` 比较，小于等于 x 的属于当前树，其余的属于 b 树。
- `empty()`：返回是否为空。
- `size()`：返回大小。
- `find(x)`：返回指向 x 的迭代器，如果不存在则返回 `tree.end()`

## 示例

```cpp
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
#include <iostream>
using namespace std;
using namespace __gnu_pbds;
int main()
{
    tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> tr;
    tr.insert(1);
    tr.insert(2);
    tr.insert(4);
    // 树中元素 1，2，4
    auto it = tr.insert(3); // pair<point_iterator, bool>
    cout << *it.first << endl; // 3
    cout << it.second << endl; // 1

    bool flag = tr.erase(3); // bool
    cout << flag << endl; // 1

    // 树中元素 1，2，4
    // order_of_key(x) 返回小于x的元素个数(int)
    int cnt = tr.order_of_key(3);
    cout << cnt << endl; // 2
    cnt = tr.order_of_key(2);
    cout << cnt << endl; // 1

    // 树中元素 1，2，4
    // find_by_order(k) 返回指向第k小的元素的迭代器 (从0开始)
    auto it2 = tr.find_by_order(1); // point_iterator
    cout << *it2 << endl; // 2

    auto it3 = tr.lower_bound(2); // point_iterator
    cout << *it3 << endl; // 2
    it3 = tr.upper_bound(2); // point_iterator
    cout << *it3 << endl; // 4

    tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> tr1;
    tr1.insert(8);
    tr1.insert(16);
    tr1.insert(32);

    // tr.join(tr1) 将tr1合并到tr中，tr1中的元素会被删除
    tr.join(tr1);
    for(auto it : tr)
        cout << it << endl; // 1 2 4 8 16 32

    tr.split(4, tr1); // 将tr中小于等于4的元素分离出来，放到tr1中
    for(auto it : tr)
        cout << it << endl; // 1, 2, 4
    
    return 0;
}
```
