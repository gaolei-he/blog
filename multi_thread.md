# 多线程的使用实例

## C++

$原子操作$

```cpp
#include <iostream>
#include <vector>
#include <thread>
#include <mutex>

std::mutex mtx;
int sharedResource = 0;

// RAII: Resource Acquisition Is Initialization
// 对象的构造函数中获取资源，析构函数中释放资源，作用域结束时自动释放锁
// 即使临界区发生异常，也能保证锁被释放
void incrementSharedResource1(int id)
{
    for (int i = 0; i < 1000000; ++i)
    {
        std::lock_guard<std::mutex> lock(mtx);
        ++sharedResource;
    }
}

// 在`mtx.lock()`和`mtx.unlock()`之间的代码段称为临界区
// 在临界区中，只有一个线程可以执行
void incrementSharedResource2(int id)
{
    for (int i = 0; i < 1000000; ++i)
    {
        mtx.lock();
        ++sharedResource;
        mtx.unlock();
    }
}

int main()
{
    std::vector<std::thread> threads;
    for(int i = 0; i < 10; ++i)
    {
        threads.emplace_back(incrementSharedResource1, i);
    }
    for(int i = 0; i < 10; ++i)
    {
        threads.emplace_back(incrementSharedResource2, i);
    }

    for(auto &th : threads) th.join();
    std::cout << sharedResource << std::endl;

    return 0;
}
```

$生产者-消费者$

```cpp
#include <iostream>
#include <vector>
#include <thread>
#include <mutex>
#include <queue>
#include <condition_variable>

std::queue<int> buffer;
std::mutex mtx;
std::condition_variable buffer_not_full;
std::condition_variable buffer_not_empty;

void producer(int id)
{
    for (int i = 0; i < 10; ++i)
    {
        std::unique_lock<std::mutex> lock(mtx);// 不同于lock_guard，unique_lock可以在任何时候unlock
        // wait()首先释放锁，判断第二个参数是否为true，如果为true则继续执行，否则阻塞当前线程，直到其他线程调用notify_one()或notify_all()唤醒当前线程
        buffer_not_full.wait(lock, [] { return buffer.size() < 10; });
        buffer.push(i);
        std::cout << "Producer " << id << " produced " << i << std::endl;
        // 唤醒一个等待的消费者进程
        buffer_not_empty.notify_one();
    }
}

void consumer(int id)
{
    for (int i = 0; i < 10; ++i)
    {
        std::unique_lock<std::mutex> lock(mtx);
        buffer_not_empty.wait(lock, [] { return buffer.size() > 0; });
        int item = buffer.front();
        buffer.pop();
        std::cout << "Consumer "  << id << " consumed " << item << std::endl;
        buffer_not_full.notify_one();
    }
}

int main()
{
    std::vector<std::thread> producers;
    std::vector<std::thread> consumers;
    for (int i = 0; i < 10; i++)
    {
        producers.emplace_back(producer, i);
    }
    for (int i = 0; i < 10; i++)
    {
        consumers.emplace_back(consumer, i);
    }
    for (auto &th : producers) th.join();
    for (auto &th : consumers) th.join();

    return 0;
}
```

## C

$生产者-消费者（多进程，C语言+信号量实现）$

```c
/* 生产者-消费者问题
 * 一个生产者进程，多个消费者进程
 * 缓冲区为文件
 * 使用信号量实现
 */
#include <fcntl.h>
#include <sys/stat.h>
#include <semaphore.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <sys/wait.h>

#define BUFFER_SIZE 10
#define N 5
#define M 500

sem_t *empty;
sem_t *full;
sem_t *mutex;

FILE *file;

void producer()
{
    for (int resource = 0; resource < M; resource++)
    {
        fflush(stdout); // 刷新缓冲区，使printf立即输出
        sem_wait(empty); // P操作
        sem_wait(mutex); // P操作

        fseek(file, resource * 4 + 4, SEEK_SET); // 定位文件写入位置
        fwrite(&resource, 4, 1, file); // 写入文件（生产操作）
        fflush(file); // 刷新文件写入缓冲区

        sem_post(mutex); // V操作
        sem_post(full); // V操作
    }
}
void consumer()
{
    int buf_out = 0;
    for (int cnt = 0; cnt < M / N; cnt++)
    {
        sem_wait(full); // P操作
        sem_wait(mutex); // P操作

        // 读取文件头部的整数，获取当前消费者读取的位置
        fseek(file, 0, SEEK_SET);
        fread(&buf_out, 4, 1, file);
        buf_out += 1;
        fseek(file, 0, SEEK_SET);
        fwrite(&buf_out, 4, 1, file);

        // 读取文件（消费操作）
        fseek(file, buf_out * 4, SEEK_SET);
        fread(&buf_out, 4, 1, file);
        printf("%d: %d\n", getpid(), buf_out);
        fflush(file);

        sem_post(mutex); // V操作
        sem_post(empty); // V操作
    }
}
int main()
{
    // 创建信号量
    empty = sem_open("/empty", O_CREAT, 0644, BUFFER_SIZE);
    full = sem_open("/full", O_CREAT, 0644, 0);
    mutex = sem_open("/mutex", O_CREAT, 0644, 1);

    // 初始化文件，文件头部保存一个整数，用于记录当前消费者读取的位置
    int buf_out = 0;
    file = fopen("file.txt", "wb+");
    fseek(file, 0, SEEK_SET);
    fwrite(&buf_out, 4, 1, file);
    fflush(file);

    if(!fork())
    {
        producer(); // 生产者进程
        exit(0);
    }
    for(int i = 0; i < N; i++)
    {
        if(!fork())
        {
            consumer(); // 多个消费者进程
            exit(0);
        }
    }

    // 主进程等待所有子进程结束
    for(int i = 0; i < N + 1; i++)
        wait(NULL);


    // 关闭信号量，关闭文件（缓冲区）
    fclose(file);
    sem_unlink("/empty");
    sem_unlink("/full");
    sem_unlink("/mutex");
    return 0;
}
```

## Python

$多线程ping$

```python
import threading
import subprocess

def ping(host:str)->None:
    process = subprocess.run(
        ['ping', '-c', '1', host],
        capture_output=True
    )

    output = process.stdout

    output = output.decode('utf-8')
    if output.find('1 received') != -1:
        print(f'Host {host} is up!\n', end='')

threads = []

for x in range(1, 255):
    for y in range(1, 255):
        thread = threading.Thread(target=ping, args=(f'10.12.{x}.{y}',))
        threads.append(thread)
        thread.start()

print('Started!')

for thread in threads:
    thread.join()
print('Done!')
```
