import React from "react";
import Resources from "@/app/ui/Resources";
import {
  fetchAverageRatingOfGuide,
  fetchGuideFromID,
  fetchGuideFromRatingFromId,
  fetchRatingCountOfGuide,
  GetGuideBookings,
  GetGuideBookingsByID,
  GetGuideRatings,
  GetGuideResources,
  GetUser,
} from "@/app/lib/data";
import Ratingreview from "@/components/ui/ratingreview";
import { MdOutlineEdit } from "react-icons/md";
import Bookinginfo from "@/app/ui/BookInfo";
import RatingCards from "@/app/ui/RatingCards";
import { auth } from "@/auth";

async function Profile({ params }: { params: { guides: string } }) {
  const session = await auth();
  if (!session?.user) return <div>Please Sign in to continue </div>;
  const loggedInUserId = (await GetUser(session.user.email)).userid;

  const guideId = params.guides;
  const guideData = (await fetchGuideFromID(guideId))[0];
  const guideRatings = await GetGuideRatings(guideId);
  const MediaResources = await GetGuideResources(guideId);
  const bookings = await GetGuideBookingsByID(guideId);
  const approvedBookings = bookings.filter(
    (booking) => booking.status == 1 || booking.status == 0
  );

  const guideReviews = await GetGuideRatings(guideId);

  const avgRating = parseFloat(
    (await fetchAverageRatingOfGuide(guideId))[0].avg
  ).toFixed(1);
  const totalRatings = (await fetchRatingCountOfGuide(guideId))[0].count;
  return (
    <div className="z-0 w-full min-h-screen bg-gray-100">
      <div className="w-full relative space-y-4 py-5 px-4 lg:px-20 z-0">
        <div>
          {/* Image */}
          <img
            src={
              guideData.picture_url
                ? guideData.picture_url
                : "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
            }
            className="w-full h-72 object-cover rounded-xl relative"
            alt=""
          />
        </div>
        <div className="flex space-x-4 w-full">
          <div className="w-4/5 ">
            <div className="space-y-4 flex flex-col justify-start items-start">
              <h2 className="text-3xl font-semibold ">
                About Tour Guide {guideData.name}.
              </h2>
              <hr className="w-32 border border-red-700 h-1 bg-red-700 " />
              <p>{guideData.description}</p>
            </div>
            {/* Photos */}
            <div className="w-full bg-white shadow-lg">
              <div>
                <Resources
                  MediaResources={MediaResources}
                  guideId={guideId}
                  loggedInUserId={loggedInUserId}
                  guideData={guideData}
                />
              </div>
            </div>
            {/* Review */}
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold ">Ratings and Reviews</h2>
              <hr className="w-32 border border-red-700 h-1 bg-red-700 " />
              <Ratingreview avgRating={avgRating} totalRatings={totalRatings} />

              <div className="w-full h-screen">
                {guideReviews.map((rating) => {
                  return <RatingCards rating={rating} />;
                })}
              </div>
            </div>
          </div>

          <div className=" w-2/5 h-42 bg-white border-2 shadow-lg h-auto flex flex-col items-center rounded-xl pt-[24px]">
            <Bookinginfo
              guideData={guideData}
              avgRating={avgRating}
              totalRatings={totalRatings}
              approvedBookings={approvedBookings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
