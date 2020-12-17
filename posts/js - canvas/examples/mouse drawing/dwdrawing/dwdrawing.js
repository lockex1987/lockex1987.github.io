(function( $, undefined ) {
	$.widget( "mobile.dwdrawing", $.mobile.widget, {
		options:{
			color:'#077ff0',
			pen:'path',
			context:null
		},
		
		_create: function(){
			/*tạo một vài biến sẽ dùng tới sau*/
			var self = this,
			canvas = this.element,
			o = this.options;
			
			/*lấy về context*/
			this.options.context = canvas[0].getContext('2d');
			
			/*thiết lập một số thuộc tính*/
			this.options.context.lineJoin = 'round';
			this.options.context.lineWidth = 5;
			this.options.context.strokeStyle = o.color;
			
			this._changeColorListener();
			this._changePenListener();
			this._onDrawListener();
		},
		
		_onDrawListener:function(){
			var self = this;
			
			/*sự kiện nhấn chuột (chạm ngón tay) vào canvas*/
			$(this.element).bind('vmousedown',function(e){
				self.x1 = e.pageX - this.offsetLeft;
				self.y1 = e.pageY - this.offsetTop;
			});
			
			/*sự kiện rời chuột (rời ngón tay) lên khỏi canvas*/
			$(this.element).bind('vmouseup',function(e){
				if(self.x1!=undefined){
					self.x2 = e.pageX - this.offsetLeft;
					self.y2 = e.pageY - this.offsetTop;
					self._onDraw();
					self.x1 = undefined;
					self.y1 = undefined;
					self.rx = undefined;
					self.crx = undefined;
				}
			});
			
			/*sự kiện di chuột (ngón tay) trên canvas*/
			$(this.element).bind('vmousemove',function(e){
				if(self.x1!=undefined){
					self.x2 = e.pageX - this.offsetLeft;
					self.y2 = e.pageY - this.offsetTop;
					self._onDraw();
					self.x1 = self.x2;
					self.y1 = self.y2;
				}
			});
		},
		
		/*thực hiện vẽ hình*/
		_onDraw:function(){
			switch(this.options.pen){
			case 'path':
				this._drawPath();
				break;
			case 'rect':
				this._drawRect();
				break;
			case 'cycle':
				this._drawElip();
			}
		},
		
		/*vẽ đoạn thẳng từ (x1,y1) tới (x2,y2)*/
		_drawPath:function(){
			this.options.context.beginPath();
			this.options.context.moveTo(this.x1,this.y1);
			this.options.context.lineTo(this.x2,this.y2);
			this.options.context.closePath();
			this.options.context.stroke();
		},
		
		/*vẽ hình chữ nhật từ (x1,y1) tới (x2,y2)*/
		_drawRect:function(){
			/*điểm đầu tiên của hình*/
			if(this.rx==undefined){
				this.rx = this.x1;
				this.ry = this.y1;
			}else{
				this.options.context.fillStyle = this.options.color;
				
				if(this.crx!=undefined) 
					this.options.context.clearRect(this.rx, this.ry, this.crx-this.rx, this.cry-this.ry);
				
				this.options.context.fillRect(this.rx, this.ry, this.x2-this.rx, this.y2-this.ry);
				this.crx = this.x2;
				this.cry = this.y2;
			}
		},
		
		_drawElip:function(){
			/*điểm đầu tiên của hình*/
			if(this.rx==undefined){
				this.rx = this.x1;
				this.ry = this.y1;
			}else{
				this.options.context.fillStyle = this.options.color;
				
				if(this.crx!=undefined) 
					this.options.context.clearRect(this.rx, this.ry, this.crx-this.rx, this.cry-this.ry);
				
				this.options.context.beginPath();
				this.options.context.moveTo((this.x2-this.rx)/2+this.rx,this.ry); // A1
		
				//vẽ cung tròn thứ nhất
				this.options.context.bezierCurveTo(
				  this.x2,this.ry, 	// C1
				  this.x2,this.y2, 	// C2
				  (this.x2-this.rx)/2+this.rx,this.y2); 	// A2
		
				//vẽ cung tròn thứ hai
				this.options.context.bezierCurveTo(
				  this.rx,this.y2, 	// C3
				  this.rx,this.ry, 	// C4
				  (this.x2-this.rx)/2+this.rx,this.ry); 	// A1
		
				this.options.context.closePath();
				this.options.context.fill();	
		
				
				this.crx = this.x2;
				this.cry = this.y2;
			}
		},
		
		/*nghe ngóng việc bấm chọn màu mới*/
		_changeColorListener:function(){
			/*bắt sự kiện bấm vào một cây bút (thẻ li)*/
			var self = this;
			$("#"+this.options.colorsId+" li" )
			.bind('vclick',function(e){
				/*Việc 1. hiệu ứng làm mờ bút màu hiện tại*/
				$("#"+self.options.colorsId+" li.active" )
				.animate({opacity:0.4,width:40},150)
				.removeClass('active');
				
				/*Việc 2. hiệu ứng hiện rõ bút màu mới click*/
				$(this).animate({opacity:0.9,width:60},
					200,
					"linear",
					function(){
						/*Việc 3. thiết lập màu mới chọn vào options*/
						self.options.color = "#"+$(this).attr('class').substring(1);
						$(this).addClass('active');
						
						/*thiết lập lại màu cho context*/
						self.options.context.strokeStyle = self.options.color;
					});
				});
		},//kết thúc _changeColorListener
		
		/*nghe ngóng việc bấm chọn kiểu vẽ*/
		_changePenListener:function(){
			/*bắt sự kiện bấm vào một kiểu (thẻ li)*/
			var self = this;
			$("#"+this.options.pensId+" li" )
			.bind('vclick',function(e){
				/*Việc 1. hiệu ứng làm mờ kiểu hiện tại*/
				$("#"+self.options.pensId+" li.active" )
				.animate({opacity:0.4,width:40},150)
				.removeClass('active');
				
				/*Việc 2. hiệu ứng hiện rõ kiểu mới click*/
				$(this).animate({opacity:0.9,width:60},
					200,
					"linear",
					function(){
						/*Việc 3. thiết lập kiểu mới chọn vào options*/
						self.options.pen = $(this).attr('class');
						$(this).addClass('active');
					});
				});
		}//kết thúc _changePenListener
	});
	
	/*tự động khởi tạo mỗi khi trang được tạo xong*/
	$( document ).bind( "pagecreate", function( e ) {
		$(":jqmData(role='dwdrawing')", e.target)
		.dwdrawing({pensId:'pens',colorsId:'colors'});
	});
})( jQuery );