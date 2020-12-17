class ImageSpliter {
    /**
     * Tách ảnh thành các panel nhỏ.
     * @param {String} imageUrl Đường dẫn ảnh
     * @param {Function} callback Hàm callback sau khi tách xong, có tham số là mảng các ảnh tách được.
     */
    split(imageUrl, callback) {
        this.img = new Image();

        // Có thể bị lỗi:
        //     Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.
        // Thêm cái này nếu ảnh ở server khác
        // Ngoài ra, server cũng phải hỗ trợ CORS
        // hoặc cài extension CORS Unblock
        this.img.crossOrigin = 'Anonymous';

        this.img.addEventListener('load', () => {
            this.data = this.getImageData(this.img);
            const rows = this.getAllRows(0, 0, this.img.width - 1, this.img.height - 1);

            if (rows.length < 2) {
                // Ảnh nguyên gốc
                callback([this.img]);
            } else {
                const grid = [];
                rows.forEach(arr => {
                    const [left, top, right, bottom] = arr;
                    let panels = this.getAllPanelsOfRow(left, top, right, bottom);
                    if (panels.length < 2) {
                        // Left trim và right trim
                        let trimmedLeft = left;
                        while (trimmedLeft < right && this.isGutterColumn(trimmedLeft, top, bottom)) {
                            trimmedLeft++;
                        }
                        if (trimmedLeft > left) {
                            trimmedLeft--;
                        }
                        let trimmedRight = right;
                        while (trimmedRight > left && this.isGutterColumn(trimmedRight, top, bottom)) {
                            trimmedRight--;
                        }
                        if (trimmedRight < right) {
                            trimmedRight++;
                        }

                        panels = [
                            [trimmedLeft, top, trimmedRight, bottom]
                        ];
                    }
                    grid.push(panels);
                });

                const images = this.cropImages(grid);
                callback(images);
            }
        });

        this.img.src = imageUrl;
    }

    /**
     * Tách ảnh theo ma trận tọa độ.
     * @param {Array} grid Ma trận grid các tọa độ
     */
    cropImages(grid) {
        const images = [];
        grid.forEach(frames => {
            frames.forEach(arr => {
                const [left, top, right, bottom] = arr;
                images.push(this.cropSingleImage(left, top, right, bottom));
            });
        });
        return images;
    }

    getImageData(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return imageData.data;
    }

    /**
     * Chia ảnh thành các hàng.
     */
    getAllRows(left, top, right, bottom) {
        const rows = [];
        let y = top;
        while (true) {
            let [y1, y2] = this.getTopMostRow(left, y, right, bottom);
            if (y1 != -1) {
                rows.push([left, y1, right, y2]);
                y = y2 + 5;
            } else {
                break;
            }
        }
        return rows;
    }

    /**
     * Chia từng hàng thành các panel.
     */
    getAllPanelsOfRow(left, top, right, bottom) {
        const panels = [];
        let x = left;
        while (true) {
            const [x1, x2] = this.getLeftMostPanel(x, top, right, bottom);
            if (x1 == -1) {
                break;
            }
            panels.push([x1, top, x2, bottom]);
            x = x2 + 5;
        }
        return panels;
    }

    /**
     * Trả về hàng đầu tiên (từ trên xuống).
     * Trả về mảng, phần tử thứ nhất là chỉ số dòng trên, phần tử thứ hai là chỉ số dòng dưới.
     */
    getTopMostRow(left, top, right, bottom) {
        if (top >= bottom) {
            return [-1, -1];
        }

        // Tìm dòng trên
        let y1 = top;
        while (y1 < bottom && this.isGutterRow(y1, left, right)) {
            y1++;
        }
        if (y1 == bottom) {
            return [-1, -1];
        }

        // Tìm dòng dưới
        let y2 = y1 + 5;
        while (y2 < bottom && !this.isGutterRow(y2, left, right)) {
            y2++;
        }
        const minFrameHeight = 100;
        if (y2 - y1 < minFrameHeight) {
            return [-1, -1];
        }

        return [y1, y2];
    }

    /**
     * Trả về panel đầu tiên từ trái sang.
     */
    getLeftMostPanel(left, top, right, bottom) {
        // Tìm cột bên trái
        let x1 = left;
        while (x1 < right && this.isGutterColumn(x1, top, bottom)) {
            x1++;
        }
        if (x1 >= right) {
            return [-1, -1];
        }

        // Tìm cột bên phải    
        let x2 = x1 + 5;
        if (x2 > right) {
            return [-1, -1];
        }
        while (x2 < right && !this.isGutterColumn(x2, top, bottom)) {
            x2++;
        }
        const minFrameWidth = 150;
        if (x2 - x1 < minFrameWidth) {
            return [-1, -1];
        }

        return [x1, x2];
    }

    /**
     * Dòng có phải là dòng trắng hay không.
     */
    isGutterRow(row, left, right) {
        for (let col = left; col <= right; col++) {
            if (!this.isWhitePixel(col, row)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Cột có phải là cột trắng hay không.
     */
    isGutterColumn(col, top, bottom) {
        for (let row = top; row <= bottom; row++) {
            if (!this.isWhitePixel(col, row)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Cắt ra một ảnh nhỏ theo các tọa độ.
     * @param {Integer} left 
     * @param {Integer} top 
     * @param {Integer} right 
     * @param {Integer} bottom 
     */
    cropSingleImage(left, top, right, bottom) {
        const panelWidth = right - left;
        const panelHeight = bottom - top;

        const canvas = document.createElement('canvas');
        canvas.width = panelWidth;
        canvas.height = panelHeight;

        const context = canvas.getContext('2d');
        context.drawImage(
            this.img,
            left,
            top,
            panelWidth,
            panelHeight,
            0,
            0,
            panelWidth,
            panelHeight
        );

        const croppedImage = new Image();
        croppedImage.src = canvas.toDataURL('image/png');
        return croppedImage;
    }

    /**
     * Thuật toán quyết định màu trắng.
     * @param {Integer} red 
     * @param {Integer} green 
     * @param {Integer} blue 
     */
    isWhiteColor(red, green, blue) {
        const threshold = 210;
        return red >= threshold &&
                green >= threshold &&
                blue >= threshold;
    }

    /**
     * Điểm ở tạo độ này có phải là màu trắng hay không.
     * @param {Integer} col 
     * @param {Integer} row 
     */
    isWhitePixel(col, row) {
        const i = (row * this.img.width + col) * 4;

        const red = this.data[i];
        const green = this.data[i + 1];
        const blue = this.data[i + 2];
        const alpha = this.data[i + 3];

        return this.isWhiteColor(red, green, blue);
    }
}

export default ImageSpliter;
