本文不讨论多线程资源竞争的问题，只讨论多线程的性能问题

多线程作为一种充分利用CPU资源的方法，可以大大提高程序的运行效率

其基本原理是充分利用程序等待IO的时间，让CPU去做其他的事情，因为IO是非常慢的，如果CPU在等待IO的时候什么都不做，那么对CPU资源的利用率就会非常低

典型的例子如多线程ping，当我们ping一个IP的时候，程序会等待一段时间，这段时间内CPU什么都不做，这时候就可以让CPU去ping其他的IP，多个线程并发执行，这样就可以大大提高ping的效率

这种思想非常类似于生活中做饭的例子，当我们在等待水烧开的时候，可以去做其他的事情，比如切菜，进而提高做饭的效率

另一方面，对于计算密集型任务来说，单核CPU使用多线程，性能提升是非常有限的，因为计算密集型任务等待IO的时间非常少，CPU几乎一直在工作，这时候多线程的效果就不明显了

但是对于多核CPU来说，多线程的效果就会非常明显，因为多核CPU可以同时执行多个线程，即多个线程并行执行，这样就可以大大提高程序的运行效率

不过对于某些语言来说，例如`python`，由于`GIL`（全局解释器锁）的存在，对于计算密集型任务来说，多线程的效果并不明显，因为`GIL`会限制同一时刻只有一个线程可以执行，这样就无法充分利用多核CPU的优势

不过在C++中，并没有类似于`GIL`的东西，所以C++即使在计算密集型任务中，多线程的效果也是非常明显的

下面是一个简单的例子，计算两个矩阵的乘积
经过验证，单线程执行时间约是多线程执行时间的`x`倍，其中`x`是CPU的物理核心数

引申问题：为什么我的CPU是8核16线程，理论上`x`不应该是我CPU的线程数吗？为什么`x`是CPU的核心数？
答：这个问题涉及到CPU的超线程技术
简单来说，超线程技术是一种通过复制CPU的寄存器和一些执行单元，在每个物理核心上模拟出两个逻辑核心，这两个逻辑核心共享同一个物理核心的资源，对于那些存才许多等待时间的任务中，例如，如果一个线程正在等待从内存读取数据，超线程可以充分利用这段等待时间执行另一个线程的任务。
然而，对于计算密集型任务，由于两个逻辑核心共享同一个物理核心的资源，其计算能力即为单个物理核心的算力，在此种情况下，超线程对于性能的提升，是非常有限的

在一些跑分软件中，例如`Cinebench`，你会得到一个`单线程性能`和一个`多线程性能`，以及一个`多线程倍率`，这个倍率就约等于你CPU的物理核心数，此情况也验证了上面的说法
有时这个倍率会大一点，但不会大很多，因为超线程对计算密集型任务还是有一定提升的，而上面提到的`x`，基本和该倍率一致，

```cpp
#include <thread>
#include <vector>
#include <iostream>
#include <chrono>
#include <random>

std::vector<std::vector<int>> calc(
    const std::vector<std::vector<int>> &a,
    const std::vector<std::vector<int>> &b
) {
    int n = a.size();
    int m = b.size();
    int l = b[0].size();
    std::vector<std::vector<int>> res(n, std::vector<int>(l, 0));


    //direct calculation
    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < n; i++)
    {
        for (int k = 0; k < l; k++)
        {
            int sm = 0;
            for (int j = 0; j < m; j++)
            {
                sm += a[i][j] * b[j][k];
            }
            res[i][k] = sm;
        }
    }

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = end - start;
    std::cout << "Direct calculation: " << duration.count() << "s" << std::endl;


    //parallel calculation
    start = std::chrono::high_resolution_clock::now();
    std::vector<std::thread> threads;
    for (int i = 0; i < n; i++)
    {
        threads.emplace_back([i, &a, &b, &res, m, l]() {
            for (int k = 0; k < l; k++)
            {
                int sm = 0;
                for (int j = 0; j < m; j++)
                {
                    sm += a[i][j] * b[j][k];
                }
                res[i][k] = sm;
            }
        });
    }
    for(auto &th : threads)
        th.join();

    end = std::chrono::high_resolution_clock::now();
    duration = end - start;
    std::cout << "Parallel calculation: " << duration.count() << "s" << std::endl;

    return std::move(res);
}


int main()
{
    std::vector<std::vector<int>> a;
    std::vector<std::vector<int>> b;

    std::cout << "Input matrix size: (eg. '3 4 5' means 3x4 and 4x5)" << std::endl;
    int n;
    int m;
    int k;
    std::cin >> n >> m >> k;
    a.resize(n, std::vector<int>(m, 0));
    b.resize(m, std::vector<int>(k, 0));

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dist(1);

    for(auto &vec : a)
        for(auto &x : vec)
            x = dist(gen);

    for(auto &vec : b)
        for(auto &x : vec)
            x = dist(gen);

    std::cout << "matrix size: " << n << "x" << m << " and " << m << "x" << k << std::endl;
    auto res = calc(a, b);

    return 0;
}
```
