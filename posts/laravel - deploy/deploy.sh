# Bước 1: Xóa các file, folder cũ và tạo mới
rm -rdf filtered
rm -f filtered.tar
mkdir filtered

# Bước 2: Chạy npm nếu cần
rm -rdf public/js/*
npm run prod
# npm run dev

# Bước 3: Copy các thư mục
cp -r app filtered
cp -r config filtered
cp -r resources filtered
cp -r routes filtered

# cp -r public filtered
# Copy thư mục public trong trường hợp có file upload (cần bỏ qua)
cd public
mkdir ../filtered/public
cp -r `ls -A | grep -v "storage"` ../filtered/public
cd ..

# Các thư mục sau chỉ cần upcode một lần
# cp -r bootstrap filtered
# cp -r storage filtered
# cp -r vendor filtered

# Các file sau chỉ cần upcode một lần
# cp .env filtered
# cp artisan filtered
# cp server.php filtered

# Bước 4: Nén và đẩy file lên server
tar cvf filtered.tar filtered
scp filtered.tar huyennv9@192.168.101.20:/home/huyennv9
ssh huyennv9@192.168.101.20 'bash -s' < remote_deploy.sh

# Bước 5: Có thể xóa luôn các file ở đây
# rm -rdf filtered
# rm -f filtered.tar
