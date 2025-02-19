import React from "react";
import { GetGuideBookings, GetTouristBookings, GetUser } from "../lib/data";
import { auth } from "@/auth";
import Bookings from "@/app/ui/mybooking";
import Guidebooking from "@/app/ui/guidebookingview"

const page = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return <div>Please Sign In to Continue in this Page!</div>;
  }
  const userType = (await GetUser(userEmail)).typeid;
  const userid = (await GetUser(userEmail)).userid;
  const touristBookings = await GetTouristBookings(userEmail);
  const guideBookings = await GetGuideBookings(userEmail);

  if (userType == "cc27c14a-0acf-4f4a-a6c9-d45682c144c9") {
    return (
      <div className=" flex flex-col gap-4 mb-[64px] ">
        <div className="py-4 -space-y-6 px-20">
          <h1 className="font-bold text-3xl mb-8">My Bookings</h1>
          <hr className="w-24 border border-red-700 h-1 bg-red-700 " />
          
        </div>
        {guideBookings.map((booking) => {
          console.log(booking);
          return <Bookings booking={booking} type="Tourist" />;
        })}
      </div>
    );
  } else if (userType == "cc27c14a-0acf-4f4a-a6c9-d45682c144b9" || !userType) {
    return (
      <div className=" flex flex-col gap-4 mb-[64px] ">
        <div className="py-4 -space-y-6 px-20">
          <h1 className="font-bold text-3xl mb-8">My Bookings</h1>
          <hr className="w-24 border border-red-700 h-1 bg-red-700 " />
        </div>
        {touristBookings.map((booking) => {
          return <Guidebooking booking={booking} type="Guide" />;
        })}
      </div>
    );
  }
};

export default page;
