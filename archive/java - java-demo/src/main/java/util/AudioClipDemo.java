package util;

import java.applet.*;

public class AudioClipDemo extends Applet {

	private AudioClip audio;

	@Override
	public void init() {
		String path = "_data/nguoitanoi.mid";
		audio = getAudioClip(getCodeBase(), path);
		//ac.loop();
		audio.play();
	}

	@Override
	public void destroy() {
		audio.stop();
	}
}
