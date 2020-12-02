# -*- coding: utf-8 -*-
'''
Định dạng HTML
Tiếng Việt
Có đính kèm
(Ảnh Inline)
'''
import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEBase import MIMEBase
from email import encoders
import time

fromaddr = "lockex1987@gmail.com"
toaddr = "safenet.vn@gmail.com"
password = "Không được lộ password"
body = "This is a test mail"
subject = "Send mail with Python " + str(time.time())
host = 'smtp.gmail.com'
port = 465
#port = 587

def send_email():
    msg = MIMEMultipart()
    msg['to'] = toaddr
    msg['from'] = fromaddr
    msg['subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    ''''
    filename = "NAME OF THE FILE WITH ITS EXTENSION"
    attachment = open("PATH OF THE FILE", "rb")
    part = MIMEBase('application', 'octet-stream')
    part.set_payload((attachment).read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', "attachment; filename= %s" % filename)
    msg.attach(part)
    '''

    server = smtplib.SMTP_SSL(host, port)
    #server = smtplib.SMTP(host, port)
    #server.starttls()
    server.login(fromaddr, password)
    server.sendmail(fromaddr, toaddr, msg.as_string())
    server.quit()

start_time = time.time()
send_email()
print("Execute time: %s seconds" % (time.time() - start_time))

