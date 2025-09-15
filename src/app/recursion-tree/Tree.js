export function Tree(node = 0, children = [], label = "") {
	return {
		id: 0,
		node: node,
		label: label,
		width: node.length,
		children: children,
	};
}

export function DrawTree(tree, parent = undefined, depth = 0, number = 1) {
	var self = {
		x: -1,
		y: depth,
		tree: tree,
		children: [],
		parent: parent,
		thread: undefined,
		mod: 0,
		ancestor: null,
		change: 0,
		shift: 0,
		_lmost_sibling: undefined,
		number: number,
	};
	for (var i = 0; i < tree.children.length; i++) {
		var newTree = DrawTree(tree.children[i], self, depth + 1, i + 1);
		self.children.push(newTree);
	}
	self.ancestor = self;
	return self;
}

function left(obj) {
	if (obj.thread !== undefined) return obj.thread;
	if (obj.children.length !== 0) return obj.children[0];
	return undefined;
}

function right(obj) {
	if (obj.thread !== undefined) return obj.thread;
	if (obj.children.length !== 0) return obj.children[obj.children.length - 1];
	return undefined;
}

function lbrother(obj) {
	var n = undefined;
	if (obj.parent) {
		for (var i = 0; i < obj.parent.children.length; i++) {
			var node = obj.parent.children[i];
			if (node === obj) {
				return n;
			} else {
				n = node;
			}
		}
	}
	return n;
}

function get_lmost_sibling(obj) {
	if (!obj._lmost_sibling && obj.parent && obj !== obj.parent.children[0]) {
		obj._lmost_sibling = obj.parent.children[0];
	}
	return obj._lmost_sibling;
}

export function buchheim(tree) {
	var dt = firstwalk(DrawTree(tree));
	var min = second_walk(dt);
	if (min < 0) {
		third_walk(dt, -min);
	}
	return dt;
}

function third_walk(tree, n) {
	tree.x += n;
	for (var i = 0; i < tree.children.length; i++) {
		third_walk(tree.children[i], n);
	}
}

function firstwalk(v, distance) {
	if (distance === undefined) distance = 1;
	if (v.children.length === 0) {
		if (get_lmost_sibling(v)) {
			v.x = lbrother(v).x + distance;
		} else {
			v.x = 0;
		}
	} else {
		var default_ancestor = v.children[0];
		for (var i = 0; i < v.children.length; i++) {
			var w = v.children[i];
			firstwalk(w, distance);
			default_ancestor = apportion(w, default_ancestor, distance);
		}
		execute_shifts(v);
		var midpoint = (v.children[0].x + v.children[v.children.length - 1].x) / 2;
		var lb = lbrother(v);
		if (lb) {
			v.x = lb.x + distance;
			v.mod = v.x - midpoint;
		} else {
			v.x = midpoint;
		}
	}
	return v;
}

function apportion(v, default_ancestor, distance) {
	var w = lbrother(v);
	if (w !== undefined) {
		var vir = v,
			vor = v,
			vil = w,
			vol = get_lmost_sibling(v);
		var sir = v.mod,
			sor = v.mod,
			sil = vil.mod,
			sol = vol.mod;
		while (right(vil) && left(vir)) {
			vil = right(vil);
			vir = left(vir);
			vol = left(vol);
			vor = right(vor);
			vor.ancestor = v;
			var shift = vil.x + sil - (vir.x + sir) + distance;
			if (shift > 0) {
				move_subtree(ancestor(vil, v, default_ancestor), v, shift);
				sir = sir + shift;
				sor = sor + shift;
			}
			sil += vil.mod;
			sir += vir.mod;
			sol += vol.mod;
			sor += vor.mod;
		}
		if (right(vil) && !right(vor)) {
			vor.thread = right(vil);
			vor.mod += sil - sor;
		} else {
			if (left(vir) && !left(vol)) {
				vol.thread = left(vir);
				vol.mod += sir - sol;
			}
			default_ancestor = v;
		}
	}
	return default_ancestor;
}

function move_subtree(wl, wr, shift) {
	var subtrees = wr.number - wl.number;
	if (subtrees <= 0) return;
	wr.change -= shift / subtrees;
	wr.shift += shift;
	wl.change += shift / subtrees;
	wr.x += shift;
	wr.mod += shift;
}

function execute_shifts(v) {
	var shift = 0,
		change = 0;
	for (var i = v.children.length - 1; i >= 0; i--) {
		var w = v.children[i];
		w.x += shift;
		w.mod += shift;
		change += w.change;
		shift += w.shift + change;
	}
}

function ancestor(vil, v, default_ancestor) {
	if (v.parent) {
		for (var i = 0; i < v.parent.children.length; i++) {
			if (v.parent.children[i] === vil.ancestor) {
				return vil.ancestor;
			}
		}
	}
	return default_ancestor;
}

function second_walk(v, m, depth, min) {
	if (m === undefined) m = 0;
	if (depth === undefined) depth = 0;
	v.x += m;
	v.y = depth;
	if (min === undefined || v.x < min) min = v.x;
	for (var i = 0; i < v.children.length; i++) {
		min = second_walk(v.children[i], m + v.mod, depth + 1, min);
	}
	return min;
}

export function dfs(tree) {
	if (tree.tree.node === "B") return;
	console.log(tree.tree.node, tree.x, tree.y);
	for (var i = 0; i < tree.children.length; i++) {
		dfs(tree.children[i]);
	}
}
