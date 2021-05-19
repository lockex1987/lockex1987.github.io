from datetime import datetime
import common_util as cu

print(cu.string_to_date('05/05/2018'))
print(cu.format_date(datetime(2011, 1, 3, 0, 0)))
print(cu.format_date(datetime.now()))