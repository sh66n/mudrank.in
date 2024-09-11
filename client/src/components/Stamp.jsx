import React from "react";

export default function Stamp({ stamp }) {
  return (
    <div>
      <div className="w-52 h-52 bg-[url('https://res-console.cloudinary.com/dkhlgn6zs/thumbnails/v1/image/upload/v1725902733/Y2xkLXNhbXBsZS01/drilldown')] bg-cover bg-no-repeat rounded-t-lg"></div>
      <div className="bg-gray-200 w-52 rounded-b-lg">
        Issued by {stamp.author} Circle
        <button>Buy</button>
      </div>
    </div>
  );
}
