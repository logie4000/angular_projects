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
            return true;
        } else if (p.pos < this.pos) {
            return p.isValid();
        } else {
            return false;
        }
    }
}