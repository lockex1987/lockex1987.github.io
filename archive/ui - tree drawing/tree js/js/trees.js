// FUNCTIONAL SUBROUTINES
function identity(x) {
    return x;
}

function cons(x, coll_2) {
    return [x].concat(coll_2);
}

function is_empty(coll) {
    return coll == null || coll.length == 0;
}

function zip(coll_1, coll_2) {
    // Convert two lists into a list of pairs.
    // The result will be as long as the shorter list.
    if (is_empty(coll_1) || is_empty(coll_2)) {
        return [];
    }
    return cons( [coll_1[0], coll_2[0]], zip(coll_1.slice(1), coll_2.slice(1)));  
}

function unzip(pairs) {
    // Convert a list of pairs into two lists of equal length.
    // Returns an array containing both lists.
    if (is_empty(pairs)) {
        return [[],[]];
    }
    var two_lists = unzip(pairs.slice(1));
    return [ cons(pairs[0][0], two_lists[0]), cons(pairs[0][1], two_lists[1])];
}

function reverse(coll) {
    var tmp = coll.slice(0);
    return is_empty(coll) ? [] : cons(tmp.pop(), reverse(tmp));
}

// TREE DATA TYPES
function Tree(label, offset, children) {
    this.parent;
    this.label = label || "";
    this.children = children || [];


    this.child_offset = offset || 0; // relative distance from parent
    this.extents = []; // absolute left/right bounds for each level of this tree

    this.add = function(subtree) {
	    // Append subtree and return it.
	    subtree.parent = this;
	    this.children.push(subtree);
	    return subtree;
    };

    this.up = function() {
	    // Return this trees's parent (or itself, if it's root).
	    return this.parent || this;
    }
    this.push = function(label) {
	    // Create a subtree with the given label, append it, and return it.
	    var t = new Tree(label);
	    return this.add(t);
    }
}

function tree_move(tree, displacement) {
    var ret =  $.extend({}, tree); // shallow copy
    ret.child_offset += displacement;
    return ret;
}


function extents_move(extents, displacement) {
    return extents.map(function(ext) {
	return [ext[0] + displacement,
		ext[1] + displacement];
    });
}

function extents_merge(exts_1, exts_2) {
    // Create a new list of extents from the left bounds of the first
    // list and the right bounds of the second list. If the lists are
    // of different length, the remainder of the longer list will be
    // appended verbatim.
    if (exts_1.length == 0 || exts_2.length == 0) {
	    return exts_1.concat(exts_2);
    } else {
	    return cons([exts_1[0][0], exts_2[0][1]],
		   extents_merge(
		       exts_1.slice(1),
		       exts_2.slice(1)));
    }
}

function extents_merge_list(extents_list) {
   return extents_list.reduce(extents_merge, []);
}

function extents_fit(exts_1, exts_2) {
    // Return the minimum horizontal displacement between the two
    // extents necessary to ensure that they do not overlap when
    // exts_1 is placed to the left of exts_2.

    if (exts_1.length > 0 && exts_2.length > 0) {
	    return Math.max(
	        extents_fit(exts_1.slice(1),
			        exts_2.slice(1)),
	                exts_1[0][1] - exts_2[0][0] + 1 // right edges of exts_1, left edges of exts_2
	        );
    }
    else {
	    return 0;
    }
}

function extents_fit_list_left(extents_list) {
    return (function fn(accumulated, elist) {
	if (elist.length == 0) {
	    return [];
	} else {
	    var exts = elist[0];
	    var x = extents_fit(accumulated, exts);
	    return cons(x,
			fn(
			    extents_merge(accumulated, 
					  extents_move(exts,x)),
			    elist.slice(1)
			));
	}
    })([], extents_list);
}

function extents_fit_list_right(extents_list) {
    var flip_elist = function(elist) {
        return elist.map(function(x){return [-x[1],-x[0]]});
    }
    var negate = function(x) {
        return -x;
    };
    return reverse(extents_fit_list_left(reverse(extents_list.map(flip_elist))).map(negate));
}

function extents_fit_list_symmetric(extents_list) {
    var A = extents_fit_list_left(extents_list);
    var B = extents_fit_list_right(extents_list);

    return zip(A,B).map(function(x){return (x[0]+x[1])/2});
}

function arrange(tree) {
    return (function fn(tree) {
	var subdata = unzip(tree.children.map(fn));
	var subtrees = subdata[0];
	var subextent_list = subdata[1];

	var positions = extents_fit_list_symmetric(subdata[1]);
	
	var subtrees_positioned = zip(subtrees,positions).map(function(x) {
	    return tree_move(x[0], x[1]);
	});
	var subextent_list_positioned = zip(subextent_list, positions).map(function(x){
	    return extents_move(x[0], x[1]);
	});

	var result_extents = cons([0, 0], extents_merge_list(subextent_list_positioned));

	var result_tree = new Tree(tree.label, 0);
	result_tree.extents = result_extents;
	for(var i in subtrees_positioned) {
	    result_tree.add(subtrees_positioned[i]);
	}

	return [result_tree, result_extents];
    })(tree)[0];
}

function build_inorder(arr, tree) {
    //console.log(arr[0], arr.length, tree);
    if (arr.length == 0) {
        return tree || null;
    }
    var x = arr[0];
    if (!x) {
        return build_inorder(arr.slice(1), tree.up());
    } else {
        return build_inorder(arr.slice(1), tree ? tree.push(x) : new Tree(x));
    }
}

function print_tree(T) {
    var s = [T.label];
    for(var i in T.children) {
	s.push(print_tree(T.children[i]));
    }
    return s.join(" ");
}

function svg_new(width, height) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    return svg;
}

function draw_tree($svg, tree, xoff, yoff, xscale, yscale) {
    var x0 = xoff + tree.child_offset * xscale;
    var y0 = yoff;

    $svg.text(x0, y0, tree.label,{"text-anchor":"middle"});

    if(tree.children.length > 0) {// dxh: was y0+6
	$svg.line(x0, y0 + 6 + 18, x0, y0+yscale/2 - 6,{stroke:"#ccc"});
	$svg.line(x0 + xscale * tree.children[0].child_offset, 
		  y0+yscale/2 - 6, 
		  x0 + xscale * tree.children[tree.children.length-1].child_offset, 
		  y0+yscale/2 - 6,
		  {stroke:"#ccc"});
	
    }
    if(tree.parent) {
	$svg.line(x0, y0 - 3 * 6, x0, y0-yscale/2 - 6,{stroke:"#ccc"});
    }

    for(var i in tree.children) {
	draw_tree($svg, tree.children[i], x0, y0 + yscale,
		  xscale,yscale);
    }
}


/// SAMPLE TREES
$("body").ready(function() {
    var tree1 = build_inorder(["A","B","C","D",null,"E","F","G",null,"H",
			 "I",null, "J", null, "K", null, "L", null, null, "M", null,
			 "N","O",null,null, null, null, null, "P", "Q", null, "R", null,
			null, null, "S", "T", "U", null, "V", null, "W", 
			 "X", "Y", null, null, "Z", 
			 "a", null, "b", null, "c", null, "d", null, 
			 null, null, null, "e", "f", "g", null, null, "h", null,
			"i", "j", "k", null, "l", null, "m", null, "n", null,
			null, null, null, null,
			"o", "p", "q", "r", null, "s", null, "t", null, "u", null,
			null, "v", "w", null, "x", "y", null, "z", null, null,
			"0", null, "1", null, null, "2", null, null, null]);
    
    var tree2 = build_inorder(["A","B",null,"C", null, "D", null, "E", null]);

    var tree3 = build_inorder(["A","B",null,"C", null, "D", "E", null, "F", null, null, "G", null]);


    var tree4 = build_inorder(["A","B","C","D","E",null,"F",null,null,"G","H",
				     null,null,null,"I","J","K",null,null,null,null,
				    "L","M","N","O",null,null,null,null]);


    var tree5 = build_inorder(["A", "B", null, "C", "c", null, "c", null, "c", null, "c", null, "c",null, null, "D"
				  , "d", null, "d", null, "d", null, "d", null, "d", null, null, "E", null, "F", null, "G", null , null]);


    var ww = 1200;
    var hh = 1200 / 3;

    var svg = svg_new(ww, hh);
    $(svg).appendTo("#container");
    var $svg = $(svg).svg().svg("get");

    draw_tree($svg, arrange(tree2), ww / 2, 48, 48, 48 + 32); // dxh: was 48
});
