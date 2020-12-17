package common.util;

import java.io.IOException;

//import common.util.Downloader;

public class TextToSpeech {

	public static void downloadAudioFile(String word, String path) throws IOException {
		// TODO: Chuyen ham nay vao cttd-networking
		System.setProperty("jsse.enableSNIExtension", "false");
		String url = "https://api.naturalreaders.com/v2/tts/?r=16&s=1&t=" + word;
		//Downloader.downloadFile(url, path);
	}
	
	public static void main(String[] args)  throws IOException {
		String word = "study";
		String path = "/data/new/study.mp3";
		downloadAudioFile(word, path);
	}
}
