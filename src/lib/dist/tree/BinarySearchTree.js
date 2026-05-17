"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTree = void 0;
class TreeNode {
    data;
    left = null;
    right = null;
    constructor(data) {
        this.data = data;
    }
}
class BinarySearchTree {
    root = null;
    insert(data) {
        const newNode = new TreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        this.insertNode(this.root, newNode);
    }
    insertNode(current, newNode) {
        if (newNode.data < current.data) {
            if (!current.left) {
                current.left = newNode;
            }
            else {
                this.insertNode(current.left, newNode);
            }
        }
        else {
            if (!current.right) {
                current.right = newNode;
            }
            else {
                this.insertNode(current.right, newNode);
            }
        }
    }
    inorderTraversal(node = this.root, result = []) {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node.data);
            this.inorderTraversal(node.right, result);
        }
        return result;
    }
    getRoot() {
        return this.root;
    }
}
exports.BinarySearchTree = BinarySearchTree;
//# sourceMappingURL=BinarySearchTree.js.map