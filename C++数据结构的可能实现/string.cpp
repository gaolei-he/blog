#include <stddef.h>
class string {
private:
    char* str = nullptr;
    size_t len = 0;
    size_t max_len = 1;
public:
    string();
    string(const string &__str);
    string(const char* __str);
    ~string();
    string(string &&__str);

    string substr(size_t __pos = 0, size_t __n = 18446744073709551615UL);
    void push_back(char __c);
    void pop_back();
    size_t size() const;
    size_t length() const;
    const char* c_str() const;
};

string::string() {}

string::string(const string &__str) {
    string(__str.c_str());
}

string::string(const char* __str) {
    for(size_t i=0;__str[i];i++) this->push_back(__str[i]);
}

string::string(string &&__str) {
    str = __str.str;
    len = __str.len;
    max_len = __str.max_len;
    __str.str = nullptr;
    __str.len = 0;
    __str.max_len = 1;
}

string::~string() {
    if(str) delete[] str;
}

const char* string::c_str() const {
    return str;
}

void string::push_back(char __c) {
    if(len + 1 == max_len) {
        max_len <<= 1;
        char *tmp = str;
        str = new char[max_len];
        for(size_t i = 0; str[i] = tmp[i]; i++);
    }
    str[len ++] = __c;
    str[len] = '\0';
}

void string::pop_back() {
    -- len;
}

size_t string::length() const {
    return len;
}

size_t string::size() const {
    return len;
}

string string::substr(size_t __pos = 0, size_t __n = 18446744073709551615UL) {
    // TODO
}