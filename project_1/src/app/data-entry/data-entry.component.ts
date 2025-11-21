import { Component, computed, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CharNode } from '../models/char-node';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})
export class DataEntryComponent {

  testString = signal<string>('');
  targetString = signal<string>('');
  
  root = computed<CharNode>(() => {
    return this.buildTree();
  })
  result = computed<number>(() =>
  {
    if (this.testString() === '' || this.targetString() === '') {
      return 0;
    }

    return this.calculateResult(this.root());
  });

  /* Build a tree of all of the different possible character location combinations. Valid combinations will be a path from parent node 
     through each child node with each node's position value being greater than the parent's.

    Example:
      Test string: ABC
      Target string: ABCBABC

      A: [0, 4]
      B: [1, 3, 5]
      C: [2, 6]

      Root:                X
      A:           0               4
                /  |  \        /   |   \
      B:      1    3    5     1    3    5
             / \  / \  / \   / \  / \  / \  
      C:     2 6  2 6  2 6   2 6  2 6  2 6
  IsValid:   T T  F T  F T   F F  F F  F T  => 5    */
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
