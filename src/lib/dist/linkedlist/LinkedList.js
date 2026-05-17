"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    data;
    next = null;
    constructor(data) {
        this.data = data;
    }
}
class LinkedList {
    head = null;
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    remove(data) {
        if (!this.head)
            return;
        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next && current.next.data !== data) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
        }
    }
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
    print() {
        let current = this.head;
        let result = "";
        while (current) {
            result += `${current.data} -> `;
            current = current.next;
        }
        result += "null";
        console.log(result);
    }
}
exports.LinkedList = LinkedList;
//# sourceMappingURL=LinkedList.js.map