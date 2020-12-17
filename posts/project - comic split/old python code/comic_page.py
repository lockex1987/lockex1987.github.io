# -*- coding: utf-8 -*-
from PIL import Image
import mono_creator as mc


class ComicPage:

    def __init__(self, file_path):
        # Đối tượng ảnh
        self.origin = Image.open(file_path)

        # Chuyển về ảnh mono đen trắng cho dễ mapping màu
        self.mono = mc.create_mono_image(self.origin)
        #self.mono.save('images/mono.jpg')

        # Kích thước ảnh
        self.width, self.height = self.origin.size

        # Mảng hàng, mảng ô, mảng ô đã được chỉnh sửa
        self.rows = []
        self.frames = []
        self.fimgs = []

        # Thực hiện tách luôn
        self.split()


    def split(self):
        self.get_all_rows()
        for rl, rt, rr, rb in self.rows:
            self.get_all_frames_of_row(rt, rb)
        #self.refine_frames()


    def get_all_rows(self):
        LEFT = 0 # Có thể bỏ qua 1 số pixel ở bên trái, cho nhanh hoặc do scan lỗi (bị đen ở bên trái hoặc phải)
        y1 = 0 # Có thể bỏ qua 1 số dòng đầu ở đây để tăng tốc độ
        RIGHT = self.width # Có thể bỏ qua một số pixel ở bên phải
        BOTTOM = self.height - 1
        while True:
            y1, y2 = self.get_top_most_row(LEFT, y1, RIGHT, BOTTOM)
            if y1 != -1:
                self.rows.append((0, y1, self.width - 1, y2))
                # Di chuyển xuống dưới 5px (tăng tốc độ nhưng vẫn đảm bảo không vào row mới)
                y1 = y2 + 5
            else:
                # No more rows
                break
        return


    def get_all_frames_of_row(self, row_top, row_bottom):
        # Lấy ra danh sách các cột của dòng (giới hạn bởi row_top và row_bottom)
        x1 = 0
        TOP = row_top
        RIGHT = self.width - 1
        BOTTOM = row_bottom
        while True:
            # Chú ý trường hợp heading
            x1, x2 = self.get_left_most_frame(x1, TOP, RIGHT, BOTTOM)
            if x1 != -1:
                self.frames.append((x1, row_top, x2, row_bottom))
                # Di chuyển sang trái 5px (cho nhanh), nhưng vẫn đảm bảo chưa sang ô khác
                x1 = x2 + 5
            else:
                # No more columns
                break
        return


    def get_top_most_row(self, LEFT, TOP, RIGHT, BOTTOM):
        """ Lấy ra hàng đầu tiên trong vùng (LEFT, TOP, RIGHT, BOTTOM)
        
        Trả về tuple (điểm bắt đầu hàng, điểm kết thúc hàng), hoặc (-1, -1) nếu không tìm thấy.
        We don't use page members directly 'coz this function is called to further refine each frame's top and bottom boundaries.
        """
        if TOP >= BOTTOM:
            return (-1, -1)

        # Di chuyển xuống dưới khi dòng vẫn là gutter
        # Tìm điểm bắt đầu hàng
        y1 = TOP
        while y1 < BOTTOM and self.is_gutter_row(y1, LEFT, RIGHT):
            y1 += 1
        if y1 == BOTTOM:
            return (-1, -1)

        # Chiều cao tối thiểu của một frame
        min_frame_height = 100

        # Tìm điểm kết thúc của hàng
        y2 = y1 + min_frame_height
        if y2 > BOTTOM:
            return (-1, -1)

        # Di chuyển xuống dưới khi vẫn đang trong ô (không phải là gutter)
        while y2 < BOTTOM and not self.is_gutter_row(y2, LEFT, RIGHT):
            y2 += 1
        if y2 - y1 < min_frame_height:
            return (-1, -1)

        return (y1, y2)


    def get_left_most_frame(self, LEFT, TOP, RIGHT, BOTTOM):
        """ Trả về cột đầu tiên trong vùng (LEFT, TOP, RIGHT, BOTTOM)
        
        Trả về tuple (điểm bắt đầu ô, điểm kết thúc ô) hoặc (-1, -1) nếu không tìm thấy ô
        """
        if LEFT >= RIGHT:
            return (-1, -1)

        # Di chuyển sang phải khi cột vẫn là gutter
        # Tìm điểm bắt đầu ô
        x1 = LEFT
        while x1 < RIGHT and self.is_gutter_column(x1, TOP, BOTTOM):
            x1 += 1
        if x1 == RIGHT:
            return (-1, -1)

        # Chiều rộng tối thiểu của một ô
        min_frame_width = 150

        # Tìm điểm kết thúc ô
        x2 = x1 + min_frame_width
        if x2 > RIGHT:
            return (-1, -1)

        # Di chuyển sang phải khi vẫn đang trong ô (không phải là gutter)
        while x2 < RIGHT and not self.is_gutter_column(x2, TOP, BOTTOM):
            x2 += 1
        if x2 - x1 < min_frame_width:
            return (-1, -1)

        return (x1, x2)


    def is_gutter_row(self, y_cord, left, right):
        """ Kiểm tra xem dòng [left, right) ở vị trí y_cord cắt sang có phải là gutter không """
        gutter_color = 255
        non_gutter = [c for c in xrange(left, right) if gutter_color != self.mono.getpixel((c, y_cord))]
        return len(non_gutter) == 0


    def is_gutter_column(self, x_cord, top, bot):
        """ Kiểm tra xem cột [top, bot) ở vị trí x_cord trỏ xuống có phải là gutter không """
        gutter_color = 255
        non_gutter = [r for r in xrange(top, bot) if gutter_color != self.mono.getpixel((x_cord, r))]
        return len(non_gutter) == 0


    def refine_frames(self):
        # Một ô có thể trải trên 2 row nên cần chỉnh lại
        for (fl, ft, fr, fb) in self.frames:
            y1 = ft
            while True:
                y1, y2 = self.get_top_most_row(fl, y1, fr, fb)
                if y1 != -1:
                    self.fimgs.append((fl, y1, fr, y2))
                    # Di chuyển xuống dưới 5px (tăng tốc độ nhưng vẫn đảm bảo không vào row mới)
                    y1 = y2 + 5
                else:
                    # No more rows
                    break
        return
