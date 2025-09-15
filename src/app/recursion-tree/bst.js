function Node(val) {
	return { val: val, left: undefined, right: undefined };
}

export function BST() {
	var api = {
		root: undefined,
		insert: function (x) {
			api.root = insertX(x, api.root);
		},
	};
	return api;
}

function insertX(x, node) {
	if (node === undefined) {
		return Node(x);
	}
	if (node.val === x) return node;
	else if (node.val > x) node.left = insertX(x, node.left);
	else node.right = insertX(x, node.right);
	return node;
}
