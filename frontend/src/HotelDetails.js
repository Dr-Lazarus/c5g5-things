import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { dateStringMaker } from "./dateStringMaker";
import BookPage from "./BookPage";
import RoomDetails from "./RoomDetails";
import Button from "@material-tailwind/react/components/Button";
//import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { Spinner } from "flowbite-react";

const HotelDetails = () => {
	const location = useLocation();
	const hotelData = location.state.data;
	const hotelId = location.state.hotelId;
	const destinationId = location.state.destinationId;
	const img =
		hotelData.image_details.prefix +
		hotelData.default_image_index +
		hotelData.image_details.suffix;
	const address = hotelData.address;
	const hotelName = hotelData.name;
	const description = hotelData.description;
	const amenities = Object.keys(hotelData.amenities).join(" · ");
	const star = hotelData.trustyou.score.kaligo_overall;
	const price = location.state.price;
	const total = location.state.total;

	const [roomData, setRoomData] = useState([]);
	const [searchCompleted, setSearchCompleted] = useState(false);

	useEffect(() => {
		const fetchHotelRoomPrices = async () => {
			console.log(location.state);
			let guests = new Array(location.state.numAdults)
				.fill(location.state.numRooms)
				.join("|");
			console.log(guests);
			const data = await axios.get("http://localhost:8000/roomprices", {
				params: {
					hotelid: hotelId,
					checkin: dateStringMaker(location.state.startDateObj, true),
					checkout: dateStringMaker(location.state.endDateObj, true),
					guests: guests,
				},
			});
			setRoomData(data.data.rooms);
			setSearchCompleted(data.data.completed);
		};
		fetchHotelRoomPrices();
	}, []);

	console.log(roomData);

	return (
		<>
			{/* <Gmaps /> */}
			<div
				data-testid="hotel-details-page"
				className="flex flex-col items-center bg-white rounded-lg shadow-md  m-6  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<img
					className="object-cover w-full rounded-t-lg md:h-96   md:rounded-none md:rounded-l-lg"
					src={img}
					alt="boo hoo"
				/>
				<div className="flex-1 flex-col justify-between p-4 leading-normal">
					<p className="mb-2 font-semibold tracking-tight text-gray-800 dark:text-white">
						{hotelName}
					</p>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						{address}
					</p>
					<p className="mb-3 font-light text-sm text-gray-700 dark:text-gray-400">
						_____________
					</p>
					<div
						className=""
						dangerouslySetInnerHTML={{
							__html: description,
						}}
					/>
					<br className="md:hidden" />
					<div className="flex flex-row justify-between  p-2">
						<div className="grid grid-cols-2 items-center">
							<AiFillStar className="scale-150" />
							<p className="font-bold text-xl">{star}</p>
						</div>
						<div className="flex flex-col text-end">
							<div className="text-end">
								<h2 className="text-2xl font-bold">
									{"$" + total}
								</h2>
								<p>{"$" + price}/Night</p>
							</div>
						</div>
					</div>
				</div>
				<AiOutlineHeart className="flex-none absolute right-0 mt-6 mr-10 self-start scale-150" />
			</div>
			{!searchCompleted && (
				<div className="grid place-items-center">
					<Spinner aria-label="Default status example" />
				</div>
			)}
			{roomData.map((room) => (
				<RoomDetails
					className="p-10 m-10"
					data={room}
					hotelId={hotelId}
					destinationId={destinationId}
					hotelName={hotelName}
					startDate={location.state.startDateObj}
					endDate={location.state.endDateObj}
					numDaysStay={location.state.numDaysStay}
					numAdults={location.state.numAdults}
					numRooms={location.state.numRooms}
				/>
			))}
		</>
	);
};

export default HotelDetails;
