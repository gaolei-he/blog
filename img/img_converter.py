from PIL import Image

def convert_to_ico(input_jpg, output_ico):
    # 打开JPEG图片
    img = Image.open(input_jpg)

    # 将图片转换为ICO图标
    img.save(output_ico, format="ICO", sizes=[(32, 32)])

if __name__ == "__main__":
    input_jpg_path = "favicon.jpg"  # 输入JPEG图片路径
    output_ico_path = "favicon.ico"  # 输出ICO图标路径

    convert_to_ico(input_jpg_path, output_ico_path)
