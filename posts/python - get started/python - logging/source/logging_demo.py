# -*- coding: utf-8 -*-
import logging
import logging.handlers
import logging.config
import my_lib
import time


# Environment: 'dev' or 'prod'
env = 'prod'

def setup_logging_simple():
    logging.basicConfig(level=logging.INFO)
    logging.basicConfig(level=logging.DEBUG, filename='runtime.log')

def setup_logging_by_code():
    formatter = logging.Formatter('[%(asctime)s] %(levelname)s --- %(filename)s.%(funcName)s():%(lineno)d: %(message)s',
        datefmt='%Y/%d/%m %H:%M:%S')

    if env == 'prod':
        info_handler = logging.handlers.TimedRotatingFileHandler('logs/info.log', encoding='utf8', backupCount=4, when='M')
        error_handler = logging.handlers.RotatingFileHandler('logs/error.log', encoding='utf8', backupCount=3, maxBytes=100000)
        info_handler.setLevel(logging.INFO)
        error_handler.setLevel(logging.ERROR)
        handlers = [
            info_handler,
            error_handler
        ]
        level = logging.INFO
    else:
        handlers = [
            logging.StreamHandler()
        ]
        level = logging.DEBUG

    root_logger = logging.getLogger()
    root_logger.setLevel(level)
    for h in handlers:
        h.setFormatter(formatter)
        root_logger.addHandler(h)

def setup_logging_by_dict_config():
    config = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'standard': {
                'format': '[%(asctime)s] %(levelname)s --- %(filename)s.%(funcName)s():%(lineno)d: %(message)s',
                'datefmt': "%Y-%m-%d %H:%M:%S"
            }
        },
        'handlers': {
            'console': {
                'level': 'DEBUG',
                'formatter': 'standard',
                'class': 'logging.StreamHandler'
            },
            'info_handler': {
                'level': 'INFO',
                'formatter': 'standard',
                'class': 'logging.handlers.TimedRotatingFileHandler',
                'filename': 'logs/info.log',
                'encoding': 'utf8',
                'backupCount': 30,
                'when': 'midnight'
            },
            'error_handler': {
                'level': 'ERROR',
                'formatter': 'standard',
                'class': 'logging.handlers.RotatingFileHandler',
                'filename': 'logs/error.log',
                'encoding': 'utf8',
                'backupCount': 3,
                'maxBytes': 100000
            }
        }
    }
    if env == 'prod':
        config['loggers'] = {
            '': {
                'handlers': ['info_handler', 'error_handler'],
                'level': 'INFO'
            }
        }
    else:
        config['loggers'] = {
            '': {
                'handlers': ['console'],
                'level': 'DEBUG'
            }
        }
    logging.config.dictConfig(config)

def demo_logging():
    logging.debug('Demo logging')
    logging.info('This is log content')
    logging.warning('Watch out!')
    logging.error('Error occurred')
    logging.critical('System failed')
    logging.critical('Lỗi tiếng Việt')

    try:
        n = 1 / 0
    except:
        logging.exception('Failed')

    my_lib.do_something()

def infinite_loop():
    while True:
        logging.info('Testing')
        time.sleep(1.5)

def main():
    #setup_logging_simple()
    setup_logging_by_code()
    #setup_logging_by_dict_config()

    demo_logging()
    infinite_loop()

if __name__ == '__main__':
    main()
