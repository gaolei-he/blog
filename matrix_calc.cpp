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
