import {
  fetchAverageRatingOfGuide,
  fetchGuideFromID,
  fetchRatingCountOfGuide,
  GetGuideBookingsByID,
} from "@/app/lib/data";
import BookGuideForm from "@/app/ui/BookGuideForm";
import Calendar from "@/app/ui/calendar";
import { auth } from "@/auth";
import Ratingreview from "@/components/ui/ratingreview";
import React from "react";

const page = async ({ params }: { params: { guides: string } }) => {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return <div>Please Sign In to Continue in this Page!</div>;
  }
  const guideid = params.guides;
  const guideData = (await fetchGuideFromID(guideid))[0];
  const bookings = await GetGuideBookingsByID(guideid);
  const approvedBookings = bookings.filter(
    (booking) => booking.status == 1 ||  booking.status == 0
  );
  const avgRating = parseFloat(
    (await fetchAverageRatingOfGuide(guideid))[0].avg
  ).toFixed(1);
  const totalRatings = (await fetchRatingCountOfGuide(guideid))[0].count;
  return (
    <div className=" flex px-20 gap-4">
      <BookGuideForm guideData={guideData} />
      <div className="flex flex-col mb-4 gap-20 bg-white p-6 rounded-lg shadow-md">
        <h1 className="font-bold text-center text-lg">
          Guide's Availibility Calendar
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center mb-4">
            <img
              src={
                guideData.picture_url
                  ? guideData.picture_url
                  : "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
              }
              className="w-[48px] h-[48px] object-cover rounded-xl relative mr-[16px]"
              alt=""
            />
            <div>
              <h2 className="text-lg font-semibold">{guideData.name}</h2>
              <div className="flex items-center">
                <Ratingreview
                  avgRating={avgRating}
                  totalRatings={totalRatings}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
          <Calendar approvedBookings={approvedBookings} />
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default page;
