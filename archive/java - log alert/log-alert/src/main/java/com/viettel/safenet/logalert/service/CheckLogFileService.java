package com.viettel.safenet.logalert.service;

import com.viettel.safenet.logalert.util.CommonUtils;
import com.viettel.safenet.logalert.util.DatetimeUtil;
import com.viettel.safenet.logalert.util.FileConfig;
import com.viettel.safenet.logalert.util.SmsSender;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import lombok.extern.slf4j.Slf4j;

/**
 * Kiểm tra file log lỗi.
 *
 * @author huyennv9
 */
@Slf4j
public class CheckLogFileService {

	// Map giữa đường dẫn file và thời điểm cuối cùng thay đổi file
	// Vì đối tượng CheckLogFile được tạo mới mỗi lần thực hiện job theo lịch
	// nên phải để đối tượng fileMap là static
	private static Map<String, Long> fileMap;

	private void initFileMap() {
		fileMap = new HashMap<>();
		String config = FileConfig.getConfig("checkLogFile.filePaths");
        if (config != null && !config.isEmpty()) {
            String[] a = config.split(",");
            for (String filePath : a) {
                filePath = filePath.trim();
                File file = new File(filePath);
                Long lastTimeStamp;
                if (file.exists()) {
                    lastTimeStamp = file.lastModified();
                    Date date = new Date(lastTimeStamp);
                    log.info("Init time (" + filePath + "): " + DatetimeUtil.convertDateToStandardFormat(date));				
                } else {
                    lastTimeStamp = 0L;
                    log.error("File doesn't exist: " + filePath);
                }

                fileMap.put(filePath, lastTimeStamp);
            }
        }
	}

	public void checkFile() {
		if (fileMap == null) {
			initFileMap();
		}

		Set<String> keySet = fileMap.keySet();
		for (String filePath : keySet) {
			File file = new File(filePath);
			if (!file.exists()) {
				log.error("File doesn't exist: " + filePath);
			} else {
				Long timeStamp = file.lastModified();
				Long lastTimeStamp = fileMap.get(filePath);
				if (!lastTimeStamp.equals(timeStamp)) {
					// Cập nhật thời điểm sửa file mới nhất
					lastTimeStamp = timeStamp;
					fileMap.put(filePath, lastTimeStamp);

					// Xử lý gửi cảnh báo
					processModifiedFile(file, filePath, lastTimeStamp);
				}
			}
		}
	}

	private void processModifiedFile(File file, String filePath, Long lastTimeStamp) {
		Date date = new Date(lastTimeStamp);
		log.info("Last modified: " + DatetimeUtil.convertDateToStandardFormat(date));
		String lastLine = CommonUtils.getLastLine(file);
		if (lastLine != null) {
			String msg = "File " + filePath + " thay doi. " + lastLine;
			log.info(msg);
			SmsSender.sendSms(msg);
		}
	}
}
