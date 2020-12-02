Câu gốc:
	ffmpeg -y \
	-loop 1 -i "1.jpeg" \
	-loop 1 -i "2.jpeg" \
	-loop 1 -i "3.jpeg" \
	-filter_complex " \
	[0:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba,split=2[stream0out1][stream0out2]; \
	[1:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba,split=2[stream1out1][stream1out2]; \
	[2:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba,split=2[stream2out1][stream2out2]; \
	[stream0out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,125)[stream0overlaid]; \
	[stream0out2]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=1,select=lte(n\,25)[stream0ending]; \
	[stream1out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,125)[stream1overlaid]; \
	[stream1out2]split=2[stream1out2starting][stream1out2ending]; \
	[stream1out2starting]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=1,select=lte(n\,25)[stream1starting]; \
	[stream1out2ending]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=1,select=lte(n\,25)[stream1ending]; \
	[stream2out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,125)[stream2overlaid]; \
	[stream2out2]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=1,select=lte(n\,25)[stream2starting]; \
	[stream1starting][stream0ending]blend=all_expr='if((lte(mod(Y,(720/10)),(720/10)*T/1)),A,B)':shortest=1[stream0blended]; \
	[stream2starting][stream1ending]blend=all_expr='if((lte(mod(Y,(720/10)),(720/10)*T/1)),A,B)':shortest=1[stream1blended]; \
	[stream0overlaid][stream0blended][stream1overlaid][stream1blended][stream2overlaid]concat=n=5:v=1:a=0,format=yuv420p[video]" \
	-map [video]  -c:v libx264 -r 25 -c:a aac -preset ultrafast "out-1.mp4"  2>&1


Một ảnh
	ffmpeg -y -loop 1 -i nat.jpeg.thumb.jpg -c:v libx264 -t 30 -pix_fmt yuv420p out-single.mp4


Bỏ hiệu ứng:
	ffmpeg -y \
	-loop 1 -i "1.jpeg" \
	-loop 1 -i "2.jpeg" \
	-loop 1 -i "3.jpeg" \
	-filter_complex " \
	[0:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba[stream0out1]; \
	[1:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba[stream1out1]; \
	[2:v]setpts=PTS-STARTPTS,scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,setsar=sar=1/1,format=rgba[stream2out1]; \
	[stream0out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,125)[stream0overlaid]; \
	[stream1out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,125)[stream1overlaid]; \
	[stream2out1]pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000,trim=duration=5,select=lte(n\,125)[stream2overlaid]; \
	[stream0overlaid][stream1overlaid][stream2overlaid]concat=n=3:v=1:a=0,format=yuv420p[video]" \
	-map [video] -c:v libx264 -r 25 -c:a aac -preset ultrafast "out-no-transition.mp4"  2>&1
	
	Speed tầm 1.6

Bỏ filter complex chỗ scale, crop
	ffmpeg -y \
	-loop 1 -i "1.jpeg.thumb.jpg" \
	-loop 1 -i "2.jpeg.thumb.jpg" \
	-loop 1 -i "3.jpeg.thumb.jpg" \
	-filter_complex " \
	[0:v]trim=duration=5[stream0overlaid]; \
	[1:v]trim=duration=5[stream1overlaid]; \
	[2:v]trim=duration=5[stream2overlaid]; \
	[stream0overlaid][stream1overlaid][stream2overlaid]concat=n=3:v=1:a=0,format=yuv420p[video]" \
	-map [video] -c:v libx264 -r 25 -c:a aac -preset ultrafast "out-no-scale-crop.mp4" 2>&1

	Rất nhanh, speed tầm 8


Sinh file thumb có scale, crop rồi
	ffmpeg -y -i "nat.jpeg" -vf "scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720" \
	"nat.jpeg.thumb.jpg"

	ffmpeg -y -i "nat.jpeg" -vf "scale=w='if(gte(iw/ih,1280/720),-1,1280)':h='if(gte(iw/ih,1280/720),720,-1)',crop=1280:720,pad=width=1280:height=720:x=(1280-iw)/2:y=(720-ih)/2:color=#00000000" \
	"nat.jpeg.thumb.jpg"

Dùng ảnh thumbnail, có hiệu ứng
	ffmpeg -y \
	-loop 1 -i "1.jpeg.thumb.jpg" \
	-loop 1 -i "2.jpeg.thumb.jpg" \
	-loop 1 -i "3.jpeg.thumb.jpg" \
	-filter_complex " \
	[0:v]split=2[stream0out1][stream0out2]; \
	[1:v]split=3[stream1out1][stream1out2starting][stream1out2ending]; \
	[2:v]split=2[stream2out1][stream2out2]; \
	[stream0out1]trim=duration=5[stream0overlaid]; \
	[stream1out1]trim=duration=5[stream1overlaid]; \
	[stream2out1]trim=duration=5[stream2overlaid]; \
	[stream0out2]trim=duration=1[stream0ending]; \
	[stream1out2starting]trim=duration=1[stream1starting]; \
	[stream1out2ending]trim=duration=1[stream1ending]; \
	[stream2out2]trim=duration=1[stream2starting]; \
	[stream1starting][stream0ending]blend=all_expr='if((lte(mod(Y,(720/10)),(720/10)*T/1)),A,B)':shortest=1[stream0blended]; \
	[stream2starting][stream1ending]blend=all_expr='if((lte(mod(Y,(720/10)),(720/10)*T/1)),A,B)':shortest=1[stream1blended]; \
	[stream0overlaid][stream0blended][stream1overlaid][stream1blended][stream2overlaid]concat=n=5:v=1:a=0,format=yuv420p[video]" \
	-map [video]  -c:v libx264 -r 25 -c:a aac -preset ultrafast "out-thumb-has-transition.mp4" 2>&1
	
	Speed tầm 3

Không hiệu ứng
	ffmpeg -y \
	-loop 1 -i "1.jpeg.thumb.jpg" \
	-loop 1 -i "2.jpeg.thumb.jpg" \
	-loop 1 -i "3.jpeg.thumb.jpg" \
	-filter_complex " \
	[0:v]split=2[stream0out1][stream0out2]; \
	[1:v]split=3[stream1out1][stream1out2starting][stream1out2ending]; \
	[2:v]split=2[stream2out1][stream2out2]; \
	[stream0out1]trim=duration=5[stream0overlaid]; \
	[stream1out1]trim=duration=5[stream1overlaid]; \
	[stream2out1]trim=duration=5[stream2overlaid]; \
	[stream0out2]trim=duration=1[stream0ending]; \
	[stream1out2starting]trim=duration=1[stream1starting]; \
	[stream1out2ending]trim=duration=1[stream1ending]; \
	[stream2out2]trim=duration=1[stream2starting]; \
	[stream0overlaid][stream0ending][stream1starting][stream1overlaid][stream1ending][stream2starting][stream2overlaid]concat=n=7:v=1:a=0,format=yuv420p[video]" \
	-map [video]  -c:v libx264 -r 25 -c:a aac -preset ultrafast "out-thumb-no-transition.mp4" 2>&1
	
	Speed tầm 8

Dùng file input danh sách
	ffmpeg -f concat -i input.txt -vsync vfr -pix_fmt yuv420p output-from-files.mp4

	Speed là 32, nhưng mỗi ảnh chỉ xuất hiện ở 1 frame, buộc phải có tham số loop

Tách hiệu ứng ra riêng file
	ffmpeg -y \
	-loop 1 -i "1.jpeg.thumb.jpg" \
	-loop 1 -i "2.jpeg.thumb.jpg" \
	-filter_complex " \
	[0:v]trim=duration=1[stream0ending]; \
	[1:v]trim=duration=1[stream1starting]; \
	[stream1starting][stream0ending]blend=all_expr='if((lte(mod(Y,(720/10)),(720/10)*T/1)),A,B)':shortest=1[stream0blended]; \
	[stream0blended]format=yuv420p[video]" \
	-map [video]  -c:v libx264 -r 25 -c:a aac -preset ultrafast "bend0.mp4"  2>&1 ; \
	ffmpeg -y \
	-loop 1 -i "2.jpeg.thumb.jpg" \
	-loop 1 -i "3.jpeg.thumb.jpg" \
	-filter_complex " \
	[0:v]trim=duration=1[stream0ending]; \
	[1:v]trim=duration=1[stream1starting]; \
	[stream1starting][stream0ending]blend=all_expr='if((lte(mod(Y,(720/10)),(720/10)*T/1)),A,B)':shortest=1[stream0blended]; \
	[stream0blended]format=yuv420p[video]" \
	-map [video]  -c:v libx264 -r 25 -c:a aac -preset ultrafast "bend1.mp4"  2>&1 ; \
	ffmpeg -y \
	-loop 1 -i "1.jpeg.thumb.jpg" \
	-i "bend0.mp4" \
	-loop 1 -i "2.jpeg.thumb.jpg" \
	-i "bend1.mp4" \
	-loop 1 -i "3.jpeg.thumb.jpg" \
	-filter_complex " \
	[0:v]trim=duration=5[stream0overlaid]; \
	[2:v]trim=duration=5[stream2overlaid]; \
	[4:v]trim=duration=5[stream4overlaid]; \
	[stream0overlaid][1:v][stream2overlaid][3:v][stream4overlaid]concat=n=5:v=1:a=0,format=yuv420p[video]" \
	-map [video]  -c:v libx264 -r 25 -c:a aac -preset ultrafast "out-2.mp4"  2>&1

