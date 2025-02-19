import { fetchGuide } from "@/app/lib/data";
import SearchBox from "@/app/ui/SearchBox";
import SearchedGuidesFromLocation from "@/app/ui/SearchedGuidesFromLocation";
import GuideCard from "@/components/ui/GuideCard";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";

  const guideData = await fetchGuide();

  if (!query) {
    return (
      <div className="w-full h-screen px-20">
        <SearchBox />

        <div className="flex flex-col justify-start item-center">
          <div className="p-4 -space-y-6">
            <h1 className="font-bold text-3xl mb-8">All Guides</h1>
            <hr className="w-40 border border-red-700 h-1 bg-red-700 " />
          </div>

          <div className="w-full  px-4 py-8 rounded-xl mb-12  justify-start items-start flex space-x-8 ">
            {guideData.map((guide) => {
              return <GuideCard guideData={guide} />;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <SearchedGuidesFromLocation query={query} />;
  }
};

export default page;
