// import React from "react";
// import {

//   GetGuideBookings,
//   GetTouristBookings,
//   GetUser,
// } from "../lib/data";
// import { auth } from "@/auth";
// import Bookings from "@/app/ui/guidebookingview";

// const page = async () => {
//   const touristBookings = await GetTouristBookings();
//   const guideBookings = await GetGuideBookings();

//   const session = await auth();
//   const userEmail = session?.user?.email;
//   const userType = (await GetUser(userEmail)).typeid;
//   const userid = (await GetUser(userEmail)).userid;

//   if (userType == "cc27c14a-0acf-4f4a-a6c9-d45682c144c9") {
//     return (
//       <div className=" flex flex-col gap-4 mb-[64px] ">
//         <div className="py-4 -space-y-6 px-20">
//           <h1 className="font-bold text-3xl mb-8">My Bookings</h1>
//           <hr className="w-24 border border-red-700 h-1 bg-red-700 " />
//         </div>
//         {guideBookings.map((booking) => {
//           console.log(booking);
//           return <Bookings booking={booking} type="Tourist" />;
//         })}
//       </div>
//     );
//   } else if (userType == "cc27c14a-0acf-4f4a-a6c9-d45682c144b9" || !userType) {
//     return (
//       <div className=" flex flex-col gap-4 mb-[64px] ">
//         <div className="py-4 -space-y-6 px-20">
//           <h1 className="font-bold text-3xl mb-8">My Bookings</h1>
//           <hr className="w-24 border border-red-700 h-1 bg-red-700 " />
//         </div>
//         {touristBookings.map((booking) => {
//           return <Bookings booking={booking} type="Tourist" />;
//         })}
//       </div>
//     );
//   }
// };

// export default page;
import React from "react";
import { GetGuideBookings, GetTouristBookings, GetUser } from "../lib/data";
import { auth } from "@/auth";
import Bookings from "@/app/ui/guidebookingview";

const page = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return <div>No user session found.</div>;
  }

  const user = await GetUser(userEmail);
  if (!user) {
    return <div>User not found.</div>;
  }

  const userType = user.typeid;
  const userid = user.userid;

  const touristBookings = await GetTouristBookings(userEmail);
  const guideBookings = await GetGuideBookings(userEmail);

  return (
    <div className="flex flex-col gap-4 mb-[64px]">
      <div className="py-4 -space-y-6 px-20">
        <h1 className="font-bold text-3xl mb-8">My Bookings</h1>
        <hr className="w-24 border border-red-700 h-1 bg-red-700" />
      </div>

      {userType === "cc27c14a-0acf-4f4a-a6c9-d45682c144c9"
        ? guideBookings?.map((booking) => (
            <Bookings key={booking.id} booking={booking} type="Tourist" />
          ))
        : touristBookings?.map((booking) => (
            <Bookings key={booking.id} booking={booking} type="Tourist" />
          ))}
    </div>
  );
};

export default page;
