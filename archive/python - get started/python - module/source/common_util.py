from datetime import datetime

DATE_PATTERN = '%d/%m/%Y'

'''
Notes:
    strptime = "string parse time"
    strftime = "string format time"
'''
def string_to_date(date_str):
    return datetime.strptime(date_str, DATE_PATTERN)

def format_date(date_obj):
    return datetime.strftime(date_obj, DATE_PATTERN)