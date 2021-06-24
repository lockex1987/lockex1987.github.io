PHP_PATH=/d/rename
ROOT_FOLDER=/d/new/comani

# php rename x program/comani/
php $PHP_PATH rc $ROOT_FOLDER
php $PHP_PATH lc $ROOT_FOLDER
for f in $ROOT_FOLDER/*; do php $PHP_PATH pr "$f" "z"; done
for f in $ROOT_FOLDER/*; do php $PHP_PATH sf "$f"; done
php $PHP_PATH z $ROOT_FOLDER
php $PHP_PATH et $ROOT_FOLDER zip cbz
