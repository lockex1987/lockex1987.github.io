
ffmpeg
	https://completejavascript.com/huong-dan-tim-hieu-ffmpeg-co-ban/
	https://wiki.anhduong.us/category/ffmpeg/
	https://lockex1987.github.io/posts/it%20-%20create%20slide%20show%20from%20images%20with%20ffmpeg/
	https://trac.ffmpeg.org/wiki
	https://www.cleancss.com/explain-command/ffmpeg/6448
	https://medium.com/abraia/basic-video-editing-for-social-media-with-ffmpeg-commands-1e873801659
	
	
	Cơ bản
		ffmpeg [input-options] -i [input-file] [output-options] [output-stream-uri]
		-i: input file
		
	Lấy thông tin của file
		ffmpeg -i data-files/video1.mp4 -hide_banner
		-hide_banner để không hiển thị thông tin của ffmpeg
		
	Concatenate nhiều file audio với nhau:
		ffmpeg -y \
		-i "data-files/audio1.mp3" \
		-i "data-files/audio2.mp3" \
		-filter_complex "[0:0][1:0]concat=n=2:v=0:a=1[audio]" \
		-map [audio] \
		"_output/concat.mp3" \
		2>&1
		
	Concatenate nhiều file video với nhau
		ffmpeg -y \
		-i "data-files/video1.mp4" \
		-i "data-files/video2.mp4" \
		-filter_complex "[0:v:0][0:a:0][1:v:0][1:a:0]concat=n=2:v=1:a=1[outv][outa]" \
		-map "[outv]" -map "[outa]" \
		"_output/concat.mp4"

	
	Tách video thành nhiều ảnh
		ffmpeg -i data-files/video2.mp4      -f image2 _output/image-%4d.png
		ffmpeg -i data-files/video2.mp4 -r 1 -f image2 _output/image-%4d.png

		Trong đó
		-i data-files/video2.mp4 là file đầu vào
		-r 1 chỉ định frame rate (số frame mỗi giây). Trong trường hợp này chúng ta muốn lấy 1 ảnh mỗi giây. Giá trị mặc định là 25.
		-f image2 chỉ định format của đầu ra là ảnh
		
		_output/image-%4d.png chỉ định định dạng tên các file ảnh đầu ra (image-0001.png, image-0002.png,...) trong thư mục _output.

	Concatenate nhiều ảnh thành video
		https://lockex1987.github.io/posts/it%20-%20create%20slide%20show%20from%20images%20with%20ffmpeg/
		
		
		ffmpeg -y              -i _output/image-%4d.png _output/concat.mp4
		ffmpeg -y -f concat -i list.txt    -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" _output/concat.mp4
		ffmpeg -y -i data-files/img%3d.jpg -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" _output/concat.mp4
		ffmpeg -y -loop 1 -i data-files/img001.jpg -t 15 -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" _output/concat.mp4
		
		Phải thêm tùy chọn -loop 1 cho ảnh input vì nếu không ảnh chỉ xuất hiện ở một frame (một giây video thường có 25 frame)
			https://ffmpeg.org/ffmpeg-formats.html#image2-1
		
		Thêm tùy chọn -y (ffmpeg -y) nếu muốn ghi đè file output mà không cần hỏi

		Nếu bị lỗi kích thước không chia hết cho 2 (height not divisible by 2) thì thêm tùy chọn:
			-vf "pad=ceil(iw/2)*2:ceil(ih/2)*2"

		Bạn có thể chỉ định scale kích thước như sau:

			ffmpeg -y \
				-loop 1 -t 5 -i data-files/img001.jpg \
				-loop 1 -t 5 -i data-files/img002.jpg \
				-loop 1 -t 5 -i data-files/img003.jpg \
				-loop 1 -t 5 -i data-files/img004.jpg \
				-filter_complex " \
					[0]scale=1280:720,setsar=1[im0]; \
					[1]scale=1280:720,setsar=1[im1]; \
					[2]scale=1280:720,setsar=1[im2]; \
					[3]scale=1280:720,setsar=1[im3]; \
					[im0][im1][im2][im3]concat=n=4:v=1:a=0" \
				_output/concat.mp4
			
			ffmpeg -y \
				-loop 1 -t 5 -i data-files/img001.jpg \
				-loop 1 -t 5 -i data-files/img002.jpg \
				-loop 1 -t 5 -i data-files/img003.jpg \
				-loop 1 -t 5 -i data-files/img004.jpg \
				-filter_complex " \
					[0:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba[im0]; \
					[1:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba[im1]; \
					[2:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba[im2]; \
					[3:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba[im3]; \
					[im0][im1][im2][im3]concat=n=4:v=1:a=0,format=yuv420p[video]" \
				-map [video] \
				_output/concat.mp4
				

	Concatenate tổng hợp (ảnh, video, audio)
		https://trac.ffmpeg.org/wiki/Concatenate#differentcodec

		ffmpeg -y \
			-loop 1 -framerate 24 -t 5 -i "data-files/img001.jpg" \
			-i "data-files/video2.mp4" \
			-filter_complex "[0]scale=1280:720,setsar=1[im];[1]scale=1280:720,setsar=1[vid];[im][vid]concat=n=2:v=1:a=0" \
			"_output/concat.mp4"

		ffmpeg -y \
			-loop 1 -i "data-files/img001.jpg" \
			-loop 1 -i "data-files/img002.jpg" \
			-loop 1 -i "data-files/img003.jpg" \
			-i "data-files/video2.mp4" \
			-i "data-files/audio1.mp3" \
			-filter_complex " \
				[0:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba,split=2[stream1out1][stream1out2]; \
				[1:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba,split=2[stream2out1][stream2out2]; \
				[2:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba,split=2[stream3out1][stream3out2]; \
				[3:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1[video1]; \

				[stream1out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,150)[stream1overlaid]; \
				[stream1out2]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=1,select=lte(n\,30)[stream1ending]; \

				[stream2out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,150)[stream2overlaid]; \
				[stream2out2]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=1,select=lte(n\,30),split=2[stream2starting][stream2ending]; \

				[stream3out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,150)[stream3overlaid]; \
				[stream3out2]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=1,select=lte(n\,30)[stream3starting]; \

				[stream2starting][stream1ending]blend=all_expr='if((lte(mod(Y,(720/10)),(720/10)*T/1)),A,B)':shortest=1[stream2blended]; \
				[stream3starting][stream2ending]blend=all_expr='if((lte(mod(Y,(720/10)),(720/10)*T/1)),A,B)':shortest=1[stream3blended]; \

				[stream1overlaid][stream2blended][stream2overlaid][stream3blended][stream3overlaid][video1]concat=n=6:v=1:a=0,format=yuv420p[video]" \

			-map [video] \
			-filter_complex "[4:0]concat=n=1:v=0:a=1[audio]" \
			-map [audio] \
			-vsync 2 -async 1 -rc-lookahead 0 -g 0 -profile:v main -level 42 -c:v libx264 -r 30 -c:a aac \
			"_output/concat.mp4" \
			2>&1

	Lấy screenshot, thumbnail
		ffmpeg -y -i "data-files/video2.mp4" -ss 00:00:05 -vf scale=500:-1 -vframes 1 "_output/thumbnail.jpg"


	Convert a video into mp3 format
		ffmpeg -i data-files/video1.mp4 -vn -ar 44100 -ac 2 -ab 192 -f mp3 _output/audio.mp3
		
		-vn để tắt video record ở file đầu ra (video none), chỉ còn lại âm thanh
		-ar để thiết lập tần số âm thanh (audio sampling rate) của tập tin đầu ra. Các giá trị comman được sử dụng là 22050, 44100, 48000 Hz.
		-ac để đặt số kênh âm thanh (audio channel).
		-ab để chỉ ra audio bitrate âm thanh (192, 320).
		-f để định dạng tập tin đầu ra.
			
	Tắt âm thanh của video
		ffmpeg -i data-files/video2.mp4 -an _output/muted_video.mp4
		-an để tắt âm thanh video, vẫn giữ hình ảnh


	Convert video thành ảnh động gif
		ffmpeg -i video1.mp4 output_animated.gif
		
		https://www.ostechnix.com/create-animated-gif-ubuntu-16-04/
		https://phamvanlam.com/ffmpeg-tutorial-chuyen-video-thanh-anh-dong-gif/
	
	
	Mix a video and audio together
		ffmpeg -i audio.mp3 -i video.avi video_audio_mix.mpg
	
	
	Increase/Reduce Video Playback Speed
		To increase video play back speed, run this command. The -vf option sets the video filters that helps to adjust the speed.

		ffmpeg -i video1.mp4 -vf "setpts=0.5*PTS" output_highspeed.mp4

		You can also reduce video speed as follows:

		ffmpeg -i video1.mp4 -vf "setpts=4.0*PTS" output_lowerspeed.mp4
		
	Thêm phụ đề
		ffmpeg -i data-files/video1.mp4 -i subtitle.srt  -map 0 -map 1 -c copy -c:v libx264 -crf 23 -preset veryfast _output/hardsub.mp4
		
		
	Chuyển đổi video thường sang dạng streaming (ts)
		ffmpeg -y -i video1.mp4 -r 25 -g 25 -c:a libfdk_aac -b:a 128k -c:v libx264 -preset veryfast -b:v 1600k -maxrate 1600k -bufsize 800k -s 640x360 -c:a libfdk_aac -vbsf h264_mp4toannexb -flags -global_header -f ssegment -segment_list output_playlist.m3u8 -segment_list_flags +live-cache -segment_time 5 output-%04d.ts
		
		ffmpeg -i video1.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls output_playlist.m3u8
		
		video1.mp4: Video có định dạng thông thường có thể như AVI, MPG, MKV,...
		output_playlist.m3u8: Playlist chứa thông tin các file stream
		output-%04d: File stream có dạng output-0001.ts, output-000n.ts
		
		https://kipalog.com/posts/Chong-download-file-video-tren-web-co-ban-bang-HLS--ket-hop-voi-Laravel
		
	Tạo preview (image, clip) từ một video dài
		https://www.binpress.com/generate-video-previews-ffmpeg/
		https://www.npmjs.com/package/ffmpeg-generate-video-preview?activeTab=readme
		https://www.alberton.info/video_preview_as_animated_gif_with_ffmpeg_and_spl.html

	Thêm watermark
		ffmpeg -i in.mp4 -framerate 25 -loop 1 -i logo.png -filter_complex "[1:v] fade=out:st=30:d=1:alpha=1 [ov]; [0:v][ov] overlay=10:10 [v]" -map "[v]" -map 0:a -c:v libx264 -c:a copy -shortest out.mp4
		filter_complex : hiệu ứng của video và audio, [1:v] lấy input logo.png (1 index của logo trong câu lệnh, v: video vd [0:a] thì trong đó 0 là indext và a là audio tức audio của video); fade=out:st=30:d=1:alpha=1 di chuyển trong 30px 1s có alpha di chuyển bằng 1, overlay vị trí hiển thị của logo.
		
		
		Adding poster image to audio files
		You can add the poster images to your files, so that the images will be displayed while playing the audio files. This could be useful to host audio files in Video hosting or sharing websites.

		ffmpeg -loop 1 -i inputimage.jpg -i inputaudio.mp3 -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest output.mp4
		
	Chuyển đổi độ phân giải của video
		ffmpeg -i input.mp4 -filter:v scale=1280:720 -c:a copy output.mp4

		ffmpeg -i input.mp4 -s 640x480 -c:a copy output.mp4
		
		-s : chuyển đổi kích thước video
		
		1080 qua 720
		ffmpeg -i input.mp4 -vf scale=-1:720 output.mp4
		-vf : video, filter
		Scale : scale filter, thay đổi kích thước

	Copy clip
		ffmpeg -i input.mp4 -ss 13:38 -t 02:00 -c copy output.mp4
		-ss : skip đến phút thứ 13 giây 38
		-t : duration, process input trong 2 phút
		-c copy :codec. copy
