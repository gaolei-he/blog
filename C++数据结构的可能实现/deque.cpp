#include <deque>

using size_t = unsigned int;
template <typename T>
class deque {
   private:
    T* data;
    size_t head, tail, capacity;
   public:
    deque();
    deque(size_t capacity, const T& val = T());

    void assign(size_t size, const T& val);
    T& at(size_t n);
    T& front();
    T& back();
    void push_front(const T& val);
    void push_back(const T& val);
    void pop_back();
    void pop_front();


};
int main() {
    std::deque<int> d;
    return 0;
}