# Xóa thư mục cũ nếu có
rm -rdf filtered

# Giải nén ra thư mục mới
tar xvf filtered.tar

# Xóa các file JS được dịch lần trước
# rm -rdf /var/www/html/sso/public/js/*

# Copy các file
cp -r filtered/* /var/www/html/sso

# Copy file .env (chỉ cần thực hiện một lần)
# File ẩn, dùng lệnh cp sẽ không copy được file
# cp filtered/.env /var/www/html/sso
