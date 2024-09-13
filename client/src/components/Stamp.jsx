import React from "react";

export default function Stamp({ stamp }) {
  return (
    <div className="flex flex-col w-52 m-2">
      <div
        className="h-52 bg-contain bg-no-repeat rounded-t-lg"
        style={{ backgroundImage: "url(" + stamp.crop[0].url + ")" }}
      ></div>
      <div className="bg-gray-200 rounded-b-lg p-2">
        <span className="text-xl flex">{stamp.title}</span>
        <span className="flex">Issued by {stamp.author.name} Circle</span>
        <div className="flex justify-center">
          <button className="p-2 bg-blue-200 w-full rounded-full hover:-translate-y-2 duration-200 transition ease-in-out">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
