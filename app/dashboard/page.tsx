import { auth, signOut } from "@/auth";
import GuideCard from "@/components/ui/GuideCard";
import { fetchGuide, GetUser } from "../lib/data";
import SearchBox from "../ui/SearchBox";
import SearchedGuidesFromLocation from "../ui/SearchedGuidesFromLocation";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  const guideData = await fetchGuide();
  const withstars = guideData.filter((data) => data.stars != null);
  const withoutstars = guideData.filter((data) => data.stars == null);
  const guideDataWithoutStars = withstars.map((item) => {
    delete item.stars;
    return item;
  });
  const guideDataForLocation = guideData.map((item) => {
    delete item.stars;
    return item;
  });

  let b: any[] = [];
  const removeDuplicateObjects = guideDataWithoutStars.map((item) => {
    if (b.includes(item.userid)) {
      return;
    } else {
      b.push(item.userid);
      return item;
    }
  });
  let c: any[] = [];
  const removeDuplicateObjectsForLocation = guideDataForLocation.map((item) => {
    if (c.includes(item.userid)) {
      return;
    } else {
      c.push(item.userid);
      return item;
    }
  });

  const guideDataByRating = removeDuplicateObjects.filter(
    (data) => data != undefined
  );

  const guideDataWithoutRating = withoutstars.filter(
    (data) => data.stars == null
  );

  const session = await auth();
  const GetUserInfo = session ? await GetUser(session?.user?.email) : "";
  const guideDataFromLocation = GetUserInfo 
    ? removeDuplicateObjectsForLocation.filter((data) => data != undefined && data.address == GetUserInfo.address)
    : "";
    console.log(guideDataFromLocation)

  if (!query) {
    return (
      <div className="w-full h-screen px-20">
        <SearchBox />

        {guideDataByRating && <div className="flex flex-col justify-start item-center">
          <div className="p-4 -space-y-6">
            <h1 className="font-bold text-3xl mb-8">Popular tour guides</h1>
            <hr className="w-40 border border-red-700 h-1 bg-red-700 " />
          </div>
          <div className="w-full  px-4 py-8 rounded-xl mb-12  justify-start items-start flex space-x-8 ">
            {guideDataByRating.map((guide) => {
              return <GuideCard guideData={guide} />;
            })}
          </div>
          <div className="self-center">
            <a
              href={"/dashboard/guides"}
              className=" flex justify-center hover:bg-[#16A1EF] hover:border-[#16A1EF] hover:text-white border-2  border-gray-400 px-3 py-2 rounded-lg"
            >
              View All Guides
            </a>
          </div>
        </div>}

        {guideDataFromLocation && <div className="flex flex-col justify-start item-center">
          <div className="p-4 -space-y-6">
            <h1 className="font-bold text-3xl mb-8">Guides In your Area</h1>
            <hr className="w-40 border border-red-700 h-1 bg-red-700 " />
          </div>
          {guideDataFromLocation && (
            <div className="w-full  px-4 py-8 rounded-xl mb-12  justify-start items-start flex space-x-8 ">
              {guideDataFromLocation.map((guide) => {
                return <GuideCard guideData={guide} />;
              })}
            </div>
          )}
          <div className="self-center">
            <a
              href={"/dashboard/guides"}
              className=" flex justify-center hover:bg-[#16A1EF] hover:border-[#16A1EF] hover:text-white border-2  border-gray-400 px-3 py-2 rounded-lg"
            >
              View All Guides
            </a>
          </div>
        </div>}
        {guideDataWithoutRating && <div className="flex flex-col justify-start item-center pb-[64px]">
          <div className="p-4 -space-y-6">
            <h1 className="font-bold text-3xl mb-8">
              Be the First One To Rate Them
            </h1>
            <hr className="w-40 border border-red-700 h-1 bg-red-700 " />
          </div>
          <div className="w-full  px-4 py-8 rounded-xl mb-12  justify-start items-start flex space-x-8 ">
            {guideDataWithoutRating.map((guide) => {
              return <GuideCard guideData={guide} />;
            })}
          </div>
          <div className="self-center">
            <a
              href={"/dashboard/guides"}
              className=" flex justify-center hover:bg-[#16A1EF] hover:border-[#16A1EF] hover:text-white border-2  border-gray-400 px-3 py-2 rounded-lg"
            >
              View All Guides
            </a>
          </div>
        </div>}
      </div>
    );
  } else {
    return <SearchedGuidesFromLocation query={query} />;
  }
}
