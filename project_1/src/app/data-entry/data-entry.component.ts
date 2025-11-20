import { Component, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CharNode } from '../models/char-node';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})
export class DataEntryComponent implements OnChanges{

  testString = signal<string>('');
  targetString = signal<string>('');
  result = signal<number>(-1);

  ngOnChanges(changes: SimpleChanges): void {
    this.doUpdate();
  }

  doUpdate() {
    this.result.update(() => {
      var root = this.buildTree();
      return this.calculateResult(root);
    });
  }

  buildTree(): CharNode {
    var chars = this.testString().split('')
    var target = this.targetString().split('')

    var root = new CharNode(-1);
    var parents: CharNode[] = [ root ];

    chars.forEach((c) => {
      var positions: number[] = []

      // Search for each character in the target string
      target.forEach((t, i) => {
        if (c === t) {
          positions.push(i)
        }
      });

      // Add a node for each found character position within the target string.
      // The newly created nodes will become the new set of parents when adding the next level of nodes.
      parents = this.addChildNodes(positions, parents);
    });

    return root;
  }

  addChildNodes(positions: number[], parents: CharNode[]): CharNode[] {
    var newParents: CharNode[] = [];
    parents.forEach((parent) => {
      positions.forEach((p) => {
        var newNode = new CharNode(p);
        parent.addChildNode(newNode);
        newParents.push(newNode);
      });
    });

    return newParents;
  }

  calculateResult(node: CharNode): number {
    var result = 0;

    // Walk the nodes until we reach a leaf, then sum up the number of leaf nodes that are valid.
    if (node.children.length > 0) {
      node.children.forEach((n) => {
        result += this.calculateResult(n);
      });

      return result;
    } else {
      if (node.isValid()) {
        return 1;
      }

      return 0;
    }
  }
}
