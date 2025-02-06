"use client"

import Image from "next/image";
import { useState } from "react";

function Item({item, toggle, change}) {
  const background = item.checked ? "bg-gray-400" : "";

  if (item.key !== Infinity) {
    return (
      <div className="flex items-center gap-1">
        <div className={`border-2 rounded-sm border-gray-400 ${background} w-3 h-3`}
          onClick={e => {toggle(item.key)}}/>
        <input type="text" placeholder="..." value={item.text} onChange={e => change(item.key, e.target.value)} />
      </div>
    )
  } else {
    return (
      <div className="flex items-center gap-1" onClick={toggle}>
        <svg className="h-3 w-3" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> 
          <path stroke="none" d="M0 0h24v24H0z"/> 
          <line x1="12" y1="5" x2="12" y2="19" /> 
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <div>{item.text}</div>
      </div>
    )
  }
}

function CheckList() {
  const [list,setList] = useState([])

  const toggle = key => setList(list.map(item => {
      if (item.key === key) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
  }))

  const change = (key,value) => setList(list.map(item => {
      if (item.key === key) {
        return { ...item, text: value};
      } else {
        return item;
      }
  }))

  const sorted = list.sort((a,b) => a.key - b.key)
  const formatItem = item => <Item item={item} key={item.key} toggle={toggle} change={change} />
  const itemsNonChecked = sorted
    .filter(item => !item.checked)
    .map(formatItem)
  const itemsChecked = sorted
    .filter(item =>  item.checked)
    .map(formatItem)

  const addNewItem = e => {
    console.log("added")
    setList(list.concat([{checked: false, text: "", key: list.length}]))
  }

  return (
    <div>
      <div>
        {itemsNonChecked} 
      </div>
      <Item item={{key: Infinity, checked: false, text: "..."}} toggle={addNewItem} />
      <div>
        {itemsChecked}
      </div>
    </div>
  )
}



function Note() {
  return (
    <div className="border-2 rounded-lg margin p-4">
      <input
        className="block mb-2 font-bold text-2xl"
        placeholder="Title"
      />
      <textarea
        className="block w-full"
        placeholder="body..."
      />
      <CheckList />
    </div>
  );
}

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Note />
    </div>
  );
}
