"use client";

import {
  Stack,
  Queue,
  LinkedList,
  BinarySearchTree
} from "../lib/dist";

import { useState, useRef } from "react";

type TreeNodeType = {
  data: number;
  left: TreeNodeType | null;
  right: TreeNodeType | null;
};

function TreeNode({
  node
}: {
  node: TreeNodeType | null;
}) {

  if (!node) return null;

  return (

    <div className="flex flex-col items-center">

      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "9999px",
          background: "linear-gradient(to right,#2563eb,#1d4ed8)",
          color: "white",
          fontSize: "32px",
          fontWeight: "900",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "5px solid #1e3a8a",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
        }}
      >
        {node.data}
      </div>

      {(node.left || node.right) && (

        <div className="flex items-start justify-center gap-16 mt-8">

          <TreeNode node={node.left} />

          <TreeNode node={node.right} />

        </div>

      )}

    </div>

  );
}

const stack = new Stack<number>();
const queue = new Queue<number>();
const linkedList = new LinkedList<number>();

export default function Home() {

  const [, forceUpdate] = useState(0);
  const bstRef = useRef(
    new BinarySearchTree<number>()
  );

  const [items, setItems] = useState<number[]>([]);

  const [treeRoot, setTreeRoot] =
    useState<TreeNodeType | null>(null);

  const [value, setValue] = useState("");

  const [mode, setMode] = useState<
    "stack" | "queue" | "linkedlist" | "bst"
  >("stack");

  const refreshStructure = () => {

    if (mode === "stack") {

      const temp: number[] = [];
      const backup: number[] = [];

      while (!stack.isEmpty()) {
        const item = stack.pop()!;
        temp.push(item);
        backup.push(item);
      }

      for (let i = backup.length - 1; i >= 0; i--) {
        stack.push(backup[i]);
      }

      setItems(temp.reverse());

    } else if (mode === "queue") {

      const temp: number[] = [];
      const backup: number[] = [];

      while (!queue.isEmpty()) {
        const item = queue.dequeue()!;
        temp.push(item);
        backup.push(item);
      }

      for (const item of backup) {
        queue.enqueue(item);
      }

      setItems(temp);

    } else if (mode === "linkedlist") {

      setItems(linkedList.toArray());

    } else {

      setTreeRoot(
  structuredClone(
    bstRef.current.getRoot()
  ) as TreeNodeType
);

forceUpdate(prev => prev + 1);
    }
  };

  const handlePush = () => {

    if (!value) return;

    if (mode === "stack") {

      stack.push(Number(value));

    } else if (mode === "queue") {

      queue.enqueue(Number(value));

    } else if (mode === "linkedlist") {

      linkedList.append(Number(value));

    } else {

      bstRef.current.insert(Number(value));

    }

    setValue("");

    refreshStructure();
  };

  const handlePop = () => {

    if (mode === "stack") {

      stack.pop();

    } else if (mode === "queue") {

      queue.dequeue();

    } else if (mode === "linkedlist") {

      const arr = linkedList.toArray();

      if (arr.length > 0) {
        linkedList.remove(arr[arr.length - 1]);
      }

    } else {

      bstRef.current =
        new BinarySearchTree<number>();

      setTreeRoot(null);

    }

    refreshStructure();
  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-8">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT PANEL */}

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h1 className="text-5xl font-bold text-slate-800 mb-4">

            {mode === "stack"
              ? "AlgoForge"
              : mode === "queue"
              ? "AlgoForge"
              : mode === "linkedlist"
              ? "AlgoForge"
              : "AlgoForge"}

          </h1>

          <p className="text-slate-500 text-lg mb-10">
            Learn DSA operations visually in real time.
          </p>

          {/* MODE SWITCH */}

          <div className="grid grid-cols-2 gap-4 mb-6">

            <button
              onClick={() => {
                setItems([]);
                setTreeRoot(null);
                setMode("stack");
              }}
              className={`py-3 rounded-2xl font-bold transition ${
                mode === "stack"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              Stack
            </button>

            <button
              onClick={() => {
                setItems([]);
                setTreeRoot(null);
                setMode("queue");
              }}
              className={`py-3 rounded-2xl font-bold transition ${
                mode === "queue"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              Queue
            </button>

            <button
              onClick={() => {
                setItems([]);
                setTreeRoot(null);
                setMode("linkedlist");
              }}
              className={`py-3 rounded-2xl font-bold transition ${
                mode === "linkedlist"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              Linked List
            </button>

            <button
              onClick={() => {
                setItems([]);
                setTreeRoot(null);
                setMode("bst");
              }}
              className={`py-3 rounded-2xl font-bold transition ${
                mode === "bst"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              BST
            </button>

          </div>

          {/* INPUT */}

          <div className="space-y-6">

            <input
              type="number"
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              placeholder="Enter a number"
              className="w-full px-6 py-5 text-xl rounded-2xl border-2 border-slate-300 outline-none focus:border-blue-500"
            />

            <div className="flex gap-5">

              <button
                onClick={handlePush}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold shadow-lg transition"
              >

                {mode === "stack"
                  ? "PUSH"
                  : mode === "queue"
                  ? "ENQUEUE"
                  : mode === "linkedlist"
                  ? "APPEND"
                  : "INSERT"}

              </button>

              <button
                onClick={handlePop}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-5 rounded-2xl text-xl font-bold shadow-lg transition"
              >

                {mode === "stack"
                  ? "POP"
                  : mode === "queue"
                  ? "DEQUEUE"
                  : mode === "linkedlist"
                  ? "REMOVE"
                  : "CLEAR"}

              </button>

            </div>

          </div>

          {/* INFO */}

          <div className="mt-12 bg-slate-100 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-3">

              {mode === "stack"
                ? "Stack Principle"
                : mode === "queue"
                ? "Queue Principle"
                : mode === "linkedlist"
                ? "Linked List Structure"
                : "Binary Search Tree"}

            </h2>

            <p className="text-slate-600 text-lg leading-8">

              {mode === "stack" ? (
                <>
                  Stack follows:
                  <br />
                  <strong>LIFO → Last In First Out</strong>
                </>
              ) : mode === "queue" ? (
                <>
                  Queue follows:
                  <br />
                  <strong>FIFO → First In First Out</strong>
                </>
              ) : mode === "linkedlist" ? (
                <>
                  Linked List stores data using
                  connected nodes.
                </>
              ) : (
                <>
                  BST organizes nodes in sorted order
                  using left and right child nodes.
                </>
              )}

            </p>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">

          <h2 className="text-4xl font-bold text-slate-800 mb-8">

            {mode === "stack"
              ? "Stack Structure"
              : mode === "queue"
              ? "Queue Structure"
              : mode === "linkedlist"
              ? "Linked List"
              : "Binary Search Tree"}

          </h2>

          <div className="text-slate-500 text-lg mb-4 font-semibold">

            {mode === "stack"
              ? "TOP"
              : mode === "queue"
              ? "FRONT"
              : mode === "linkedlist"
              ? "HEAD"
              : "ROOT"}

          </div>

          <div className="w-full min-h-[550px] border-[6px] border-slate-300 rounded-3xl bg-white p-5 flex items-center justify-center overflow-auto">

            {items.length === 0 && !treeRoot ? (

              <div className="text-slate-400 text-2xl font-semibold">
                Empty Structure
              </div>

            ) : mode === "linkedlist" ? (

              <div className="flex flex-wrap items-center justify-center gap-3">

                {items.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center"
                  >

                    <div className="w-24 h-20 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-2xl font-bold flex items-center justify-center shadow-xl">
                      {item}
                    </div>

                    {index !== items.length - 1 && (
                      <div className="text-4xl mx-3 text-slate-600">
                        →
                      </div>
                    )}

                  </div>

                ))}

                <div className="text-2xl font-bold text-slate-500 ml-3">
                  null
                </div>

              </div>

            ) : mode === "bst" ? (

              <div className="w-full flex justify-center overflow-auto p-10">

                <TreeNode node={treeRoot} />

              </div>

            ) : (

              <div className="w-80 flex flex-col-reverse items-center gap-4">

                {items.map((item, index) => (

                  <div
                    key={index}
                    className="w-full h-20 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-3xl font-bold flex items-center justify-center shadow-xl transition-all duration-300"
                  >
                    {item}
                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </main>

  );
}
<p className="text-gray-500 text-sm mt-10 text-center">
  Built with Next.js + TypeScript + AlgoForge.js
</p>