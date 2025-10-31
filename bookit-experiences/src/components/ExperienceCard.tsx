import React from 'react';
import { Link } from 'react-router-dom';

export default function ExperienceCard({ experience }: { experience: any }) {
  return (
    <div className="bg-white rounded-lg  border overflow-hidden flex flex-col  shadow-md               // <-- Always visible medium shadow
    transition-transform transition-shadow duration-200
    hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
    cursor-pointer">
      <img src={experience.image_url || '/images/placeholder.jpg'} alt={experience.name} className="h-40 w-full object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex flex-row items-center justify-between">
        <div className="text-base font-semibold">{experience.name}</div>
        {experience.location && (
          <div className="text-[10px] inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{experience.location}</div>
        )}
        </div>
        <div className="text-xs text-gray-600 mt-2">Curated small-group experience. Certified guide.
          <br />Safety first with gear included.
        </div>
        <div className="flex justify-between items-center mt-auto pt-3">
          <span className="text-sm">From <span className="font-semibold">₹{experience.price}</span></span>
          <Link to={`/details/${experience.id}`} className="bg-primary hover:bg-primary-hover text-black text-xs font-medium px-3 py-2 rounded">View Details</Link>
        </div>
      </div>
    </div>
  );
}


