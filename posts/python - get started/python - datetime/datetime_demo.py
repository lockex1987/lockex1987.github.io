'''
Datetime was not easy!
https://arrow.readthedocs.io/en/latest/
https://o7planning.org/vi/11443/huong-dan-su-dung-date-time-trong-python
'''

import datetime
import time
import calendar

start_ticks = time.time()

now = datetime.datetime.now()
#today = now.date()
today = datetime.date.today()
moment = now.time()
yesterday = today - datetime.timedelta(1)
#one_month_later = today + datetime.timedelta(months = 1)
one_month_later = today.replace(month=today.month + 1)
delta = today - yesterday

#my_date = datetime.date(1984, 6, 24)
my_date = datetime.date(day=24, year=1984, month=6)

#my_time = datetime.time()
#my_time = datetime.time(1, 2)  # first argument hour, second minute
my_time = datetime.time(hour=3, minute=4)


my_datetime = datetime.datetime(1984, 6, 24, 18, 30)
#my_datetime = datetime.datetime(year=1984, month=6, day=24)  # time is set to 0:00
#my_datetime = datetime.datetime(year=1984, month=6, day=24, hour=18, minute=30)
another_datetime = my_datetime.replace(year=2015, month=1)

print("--------------------")
birthday_text = "11/05/1987"
date_patterns = [
    "%m/%d/%y",
    "%m/%d/%Y",
    "%d/%m/%Y",
    "%m-%d-%y",
    "%d-%m-%Y",
    "%B %d, %Y",
    "%b %d, %Y"
]
birthday_date = None
for pattern in date_patterns:
    try:
        print(pattern)
        birthday_date = datetime.datetime.strptime(birthday_text, pattern)
        break
    except:
        pass

birthday_format = birthday_date.strftime('%Y/%m/%d')
print(birthday_date)
print(birthday_format)

print(type(now), ": ", now)
print(now.year, now.month, now.day, now.hour, now.minute, now.second)
print(type(today), ": ", today)
print(type(moment), ": ", moment)
print(type(yesterday), ": ", yesterday)
print(type(one_month_later), ": ", one_month_later)
print(type(delta), ": ", delta)
print(delta.days, "days,", delta.seconds, "seconds,", delta.total_seconds(), " seconds in total")
print(type(my_date), ": ", my_date)
print(type(my_time), ": ", my_time)
print(type(my_datetime), ": ", my_datetime)
print(type(another_datetime), ": ", another_datetime)

localtime_struct = time.localtime(time.time())
localtime = time.asctime(time.localtime(time.time()))

print(localtime_struct)
print(localtime)

cal_1 = calendar.month(2018, 5)
print(cal_1)
#calendar.prcal(2018)

'''
week_list = print(calendar.monthcalendar(2018, 5))
print(type(week_list))
for week in week_list:
    print(week)
    for day in week:
        #print(day, "")
        pass
'''

end_ticks = time.time()
print("Execution time: ", (end_ticks - start_ticks), "seconds")
