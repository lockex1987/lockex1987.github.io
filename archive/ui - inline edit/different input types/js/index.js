$(".editable").on("click", function() {
	if ($(this).closest("li").find("form").length == 0) {
		var type = $(this).attr("data-type") || "text";
		var name = $(this).attr("data-name");
		var form = "<form>";
		if (type =="textarea") {
			form = '<div class="form-group"><textarea class="form-control" name="' + name + '"></textarea>';
		} else if (type =="select") {
			var options = $(this).attr("data-options").split(",");
			var optelems = "";
			for (var i = 0; i < options.length; i++) {
				optelems += "<option>" + options[i] + "</option>";
			}
			form = '<div class="input-group"><select class="form-control" name="' + name + '">' + optelems + '</select>';
		} else {
			form = '<div class="input-group"><input type="' + type + '" class="form-control" name="' + name + '">';
		}
		
		form += `
					<div class="input-group-append">
						<button type="button" class="btn btn-secondary cancel">
							<i class="material-icons">clear</i>
						</button>
						<button type="button" class="btn btn-success ok">
							<i class="material-icons">done</i>
						</button>
					</div>
				</div> <!-- Kết thúc của .form-group hoặc .input-group -->
			</form>`;
		
		form = $(form);
		
		// Nhấn nút hủy
		form.find("button.cancel").on('click', function() {
			$(this).closest("li").find("a").show();
			$(this).closest("form").hide();
		});

		// Nhấn nút lưu
		form.find("button.ok").on("click", function() {
			var value = $(this).closest("form").find("input,select,textarea").first().val();
			
			//Ajax POST
			
			value = value == "" ? "[empty]" : value;
			$(this).closest("li").find("a").text(value).show();
			$(this).closest("form").hide();
		});
		form.insertAfter(this);
	}

	$(this).closest("ul").find("form").hide();
	$(this).closest("ul").find("a").show();
	$(this).closest("li").find("form").show();
	$(this).closest("li").find("input,select,textarea").first().val($(this).text()).focus();
	$(this).hide();
});