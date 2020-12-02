/*
	Bresenham algorihm: drawing line, circle, ellipse

	Wojciech Mula
	4.02.2007
	public domain
*/

function draw_line(ctx, x0, y0, x1, y1) {
	var dx = x1 - x0;
	var dy = y1 - y0;

	var inc_x = (dx >= 0) ? +1 : -1;
	var inc_y = (dy >= 0) ? +1 : -1;

	dx = (dx < 0) ? -dx : dx;
	dy = (dy < 0) ? -dy : dy;

	if (dx >= dy) {
		var d = 2 * dy - dx;
		var delta_A = 2 * dy;
		var delta_B = 2 * dy - 2 * dx;

		var x = 0;
		var y = 0;
		for (i = 0; i <= dx; i++) {
			put_pixel(ctx, x + x0, y + y0, "black");
			if (d > 0) {
				d += delta_B;
				x += inc_x;
				y += inc_y;
			} else {
				d += delta_A;
				x += inc_x;
			}
		}
	} else {
		var d = 2 * dx - dy;
		var delta_A = 2 * dx;
		var delta_B = 2 * dx - 2 * dy;

		var x = 0;
		var y = 0;
		for (i = 0; i <= dy; i++) {
			put_pixel(ctx, x + x0, y + y0, "black");
			if (d > 0) {
				d += delta_B;
				x += inc_x;
				y += inc_y;
			} else {
				d += delta_A;
				y += inc_y;
			}
		}
	}
}

function ellipse_points(ctx, x0, y0, x, y, color) {
	put_pixel(ctx, x0 + x, y0 + y, color);
	put_pixel(ctx, x0 - x, y0 + y, color);
	put_pixel(ctx, x0 + x, y0 - y, color);
	put_pixel(ctx, x0 - x, y0 - y, color);
}

function draw_circle(ctx, x0, y0, r) {
	var d = 5 - 4 * r;

	var x = 0;
	var y = r;

	var deltaA = (-2 * r + 5) * 4;
	var deltaB = 3 * 4;

	while (x <= y) {
		ellipse_points(ctx, x0, y0, x, y, "black");
		ellipse_points(ctx, x0, y0, y, x, "black");

		if (d > 0) {
			d += deltaA;

			y -= 1;
			x += 1

			deltaA += 4*4;
			deltaB += 2*2;
		} else {
			d += deltaB;

			x += 1;

			deltaA += 2*4;
			deltaB += 2*4;
		}
	}
}

function rasterize(ctx, x0, y0, a, b, hw, color) {
	var a2 = a * a;
	var b2 = b * b;

	var d  = 4 * b2 - 4 * b * a2 + a2;
	var delta_A = 4 * 3 * b2;
	var delta_B = 4 * (3 * b2 - 2 * b * a2 + 2 * a2);
	
	var limit   = (a2 * a2) / (a2 + b2);

	var x = 0;
	var y = b;
	while (true) {
		if (hw)
			ellipse_points(ctx, x0, y0, x, y, color);
		else
			ellipse_points(ctx, x0, y0, y, x, color);

		if (x * x >= limit)
			break;

		if (d > 0) {
			d       += delta_B;
			delta_A += 4 * 2 * b2;
			delta_B += 4 * (2 * b2 + 2 * a2);
			
			x += 1;
			y -= 1;
		} else {
			d       += delta_A;
			delta_A += 4 * 2 * b2;
			delta_B += 4 * 2 * b2;

			x += 1;
		}
	}
}


function draw_ellipse(ctx, x0, y0, a, b) {
	rasterize(ctx, x0, y0, a, b, true, "red");
	rasterize(ctx, x0, y0, b, a, false, "blue");
}
