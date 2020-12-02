var Category = (function() {
	
	const CATEGORIES = [
		{ id: 2, name: "Thức ăn", icon: "fa-utensils", color: "#1abc9c" },
		{ id: 3, name: "Xăng", icon: "fa-gas-pump", color: "#3498db" },
		{ id: 4, name: "Điện thoại", icon: "fa-phone", color: "#9b59b6" },
		{ id: 5, name: "Ăn vặt", icon: "fa-shopping-cart", color: "#f1c40f" },
		{ id: 6, name: "Đi chơi", icon: "fa-plane", color: "#e67e22" },
		{ id: 7, name: "Liên hoan", icon: "fa-cocktail", color: "#e74c3c" },
		{ id: 8, name: "Xe máy", icon: "fa-motorcycle", color: "#4b4b4b" },
		{ id: 9, name: "Gas", icon: "fa-fire", color: "#2980b9" },
		{ id: 10, name: "Điện", icon: "fa-bolt", color: "#3ae374" },
		{ id: 11, name: "Nước", icon: "fa-tint", color: "#25CCF7" },
		{ id: 12, name: "Trang phục", icon: "fa-tshirt", color: "#B33771" },
		{ id: 1, name: "Khác", icon: "fa-asterisk", color: "#7d5fff" }
	];

	const MAP_ACTIONS = {
		'đi chợ': 2,
		'mua rau': 2,
		'mua thịt': 2,
		'đổ xăng': 3,
		'nạp điện thoại': 4,
		'ăn vặt': 5,
		'ăn kem': 5,
		'đi chơi': 6,
		'đi xem phim': 6,
		'liên hoan': 7,
		'sửa xe': 8,
		'thay dầu': 8,
		'đổi bình gas': 9,
		'đóng tiền điện': 10,
		'đóng tiền nước': 11,
		'mua áo': 12,
		'mua quần': 12,
		'mua váy': 12
	};
	
	function getCategory(action) {
		if (MAP_ACTIONS[action]) {
			return MAP_ACTIONS[action];
		}
		
		// Khác
		return 1;
	}
	
	function bindForm() {
		var html = `
			${CATEGORIES.map(c => `
				<div class="category">
					<div>
						<i class="fas ${c.icon} cat" style="color: ${c.color}"></i>
					</div>
					<div class="cat-name">
						${c.name}
					</div>
					<div>
						<input type="number" class="money-number" id="amount_${c.id}"/>
					</div>
					<div>
						<i class="fas fa-times clear" title="Xóa" onclick="clearInput(${c.id})"></i>
					</div>
				</div>
			`).join('')}
			`;
		
		document.querySelector("#categories").innerHTML = html;
	}
	
	return {
		getCategory,
		bindForm
	};
})();