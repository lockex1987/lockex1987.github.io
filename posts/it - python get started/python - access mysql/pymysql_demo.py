# -*- coding: utf-8 -*-
import pymysql
from datetime import datetime
import random
import base64


DATETIME_PATTERN = '%d/%m/%Y %H:%M:%S'


def demo_insert(cursor, con):
	# Tạo dữ liệu
	data = []
	for i in range(1000):
		data.append(('huyennv-' + str(i) + "-" + str(random.randint(1, 1000)), datetime.strptime('28/07/2017 14:59:10', DATETIME_PATTERN)))

	# Lưu dữ liệu vào CSDL
	sql = " insert into pymysql_demo(full_name, access_time) values (%s, %s) "
	#insert_row_by_row(cursor, data, sql)
	insert_batch(cursor, data, sql)
	con.commit()


def insert_row_by_row(cursor, data, sql):
	for e in data:
		cursor.execute(sql, e)


def insert_batch(cursor, data, sql):
	cursor.executemany(sql, data)


def demo_select(cursor, con):
	# Select nhiều bản ghi
	#sql = " select * from pymysql_demo "
	sql = " select id, full_name, access_time from pymysql_demo "
	cursor.execute(sql)
	data = []
	for row in cursor:
		#print(row)
		print(str(row["id"]) + ": " + row["full_name"] + ", " + datetime.strftime(row["access_time"], DATETIME_PATTERN))
		id = row["id"]
		data.append((1, id))

    # Select 1 bản ghi
	sql = " select * from pymysql_demo where id = %s "
	cursor.execute(sql, (9))
	row = cursor.fetchone()
	if row != None:
		print(row["full_name"])

    # Cập nhật nhiều bản ghi
	# Có những trường hợp bạn phải select 1 số bản ghi,
	# xử lý gì đó trên từng bản ghi,
	# sau đó thì cập nhật lại
	sql = " update pymysql_demo set status = %s where id = %s "
	cursor.executemany(sql, data)
	con.commit()


def main():
	con = pymysql.connect(
			host = 'localhost',
			user = 'root',
			password = '', # base64.b64decode('b2p6azEyNkhBRUQ5M0tMTEFwemVqcw==').decode()
			db = 'test',
			charset = 'utf8', # utf8mb4
			cursorclass = pymysql.cursors.DictCursor)
	try:
		with con.cursor() as cursor:
			#demo_insert(cursor, con)
			demo_select(cursor, con)
	finally:
		con.close()


main()
