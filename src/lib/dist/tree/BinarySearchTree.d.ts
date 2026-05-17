declare class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    constructor(data: T);
}
export declare class BinarySearchTree<T> {
    private root;
    insert(data: T): void;
    private insertNode;
    inorderTraversal(node?: TreeNode<T> | null, result?: T[]): T[];
    getRoot(): TreeNode<T> | null;
}
export {};
//# sourceMappingURL=BinarySearchTree.d.ts.map