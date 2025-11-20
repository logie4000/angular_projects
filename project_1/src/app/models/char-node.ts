export class CharNode {
    pos: number = -1;
    parent: CharNode | undefined;
    children: CharNode[] = [];

    constructor(pos: number) {
        this.pos = pos;
    }

    setParent(parent: CharNode) {
        this.parent = parent;
    }

    addChildNode(node: CharNode) {
        node.setParent(this);
        this.children.push(node);
    }

    isValid(): boolean {
        var p = this.parent;

        if (p === undefined) {
            // We reached the root of the tree, so we're valid all the way down.
            return true;
        } else if (p.pos < this.pos) {
            // This node is valid, so check the parent node all the way up to the root of the tree.
            return p.isValid();
        } else {
            return false;
        }
    }
}