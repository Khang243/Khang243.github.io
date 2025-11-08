# factor_tree_triangle_fixed.py
import math

def smallest_factor(n):
    """Trả về thừa số nhỏ nhất >1 của n (hoặc n nếu là số nguyên tố)."""
    if n % 2 == 0:
        return 2
    for i in range(3, int(math.isqrt(n)) + 1, 2):
        if n % i == 0:
            return i
    return n

def build_tree(n):
    """Tạo cây phân tích thừa số dạng (giá trị, trái, phải)."""
    if n < 0:
        return (-1, None, build_tree(-n))
    if n in (0, 1):
        return (n, None, None)
    f = smallest_factor(n)
    if f == n:
        return (n, None, None)
    return (n, build_tree(f), build_tree(n // f))

def print_tree(node, indent=""):
    """In cây phân tích thừa số theo dạng nhánh /\\."""
    val, left, right = node
    print(indent + str(val))
    if left and right:
        # Vẽ dấu /\
        print(indent + " /\\")
        # In hai nhánh trái – phải cùng dòng
        print(indent + str(left[0]) + "  " + str(right[0]))

        # Nếu các nhánh có con thì in tiếp
        # Thụt vào thêm 3 khoảng cho đẹp
        if left[1] or right[1]:
            print_tree(left, indent + "   ")
            print_tree(right, indent + "   ")

def main():
    try:
        n = int(input("Nhập số nguyên cần phân tích: "))
    except ValueError:
        print("Lỗi: Vui lòng nhập số nguyên hợp lệ!")
        return

    print("\nCây phân tích thừa số dạng tam giác:\n")
    tree = build_tree(n)
    print_tree(tree)

if __name__ == "__main__":
    main()
