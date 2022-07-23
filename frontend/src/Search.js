import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { BsFillPeopleFill } from "react-icons/bs";
import { GrBaby } from "react-icons/gr";
import { DateRange } from "react-date-range";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import Select from "react-select";

const Search = () => {
	const navigate = useNavigate();
	const [inputAdults, setInputAdults] = useState(1);
	const [inputChildren, setInputChildren] = useState(0);
	const [inputRooms, setInputRooms] = useState(1);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [showDates, setShowDates] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [destinationObj, setdestinationObj] = useState({
		term: "Singapore, Singapore",
		uid: "RsBU",
		lat: 1.2800945,
		lng: 103.8509491,
		type: "city",
	});

	// get dates from date range picker
	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: "selection",
	};

	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	// get destination
	const destinations = require("./destinations.json");

	return (
		<div className=" flex flex-col md:flex-row backdrop-blue-3xl bg-white/50 p-2 space-x-10 justify-center ">
			<div className=" flex flex-row bg-white rounded-full border-2 p-2 h-12 w-[330px] focus-within:border-blue-500">
				<Select
					className="flex-1"
					options={destinations.slice(0, 1000)}
					getOptionLabel={(option) => option.term}
					getOptionValue={(option) => option.uid}
					placeholder="Location..."
					defaultValue={{
						term: "Singapore, Singapore",
						uid: "RsBU",
						lat: 1.2800945,
						lng: 103.8509491,
						type: "city",
					}}
					value={destinationObj}
					onChange={(e) => setdestinationObj(e)}
				/>
			</div>
			<div className="flex flex-col relative justify-between z-12 w-[330px]">
				{showDates && (
					<DateRange
						ranges={[selectionRange]}
						onChange={handleSelect}
						minDate={new Date()}
					/>
				)}

				<Button
					className="w-full"
					onClick={() => setShowDates(!showDates)}
					variant="outlined"
				>
					{showDates ? "hide" : "Select Dates"}
				</Button>
			</div>
			<div className="flex flex-col text-lg justify-between z-10 w-[330px]">
				{showDetails && (
					<div className=" pb-4 flex flex-col gap-y-2">
						<div className="flex flex-row justify-between gap-x-6 p-2 rounded bg-white border-2 border-blue-500">
							<div className="flex gap-x-2 items-center">
								<BsFillPeopleFill />
								<p>Number of Adults: </p>
							</div>
							<input
								className="w-16 right-4 outline-none"
								value={inputAdults}
								onInput={(e) => setInputAdults(e.target.value)}
								min={1}
								max={5}
								defaultValue={2}
								type="number"
							/>
						</div>
						<div className="flex flex-row justify-between gap-x-6 p-2 rounded bg-white border-2 border-blue-500 ">
							<div className="flex gap-x-2 items-center">
								<FaBed className="scale-125" />
								<p>Number of Rooms: </p>
							</div>
							<input
								className="w-16 right-4 outline-none"
								value={inputRooms}
								onInput={(e) => setInputRooms(e.target.value)}
								min={1}
								max={3}
								defaultValue={1}
								type="number"
							/>
						</div>

						<div className="flex flex-row justify-between gap-x-6 p-2 rounded bg-white border-2 border-blue-500">
							<div className="flex gap-x-2 items-center">
								<GrBaby className="scale-125" />
								<p>Number of Children: </p>
							</div>
							<input
								className="w-16 right-4 outline-none"
								value={inputChildren}
								onInput={(e) =>
									setInputChildren(e.target.value)
								}
								min={0}
								max={3}
								defaultValue={0}
								type="number"
							/>
						</div>
					</div>
				)}

				<Button
					className="w-full duration-300 hover:bg-white"
					onClick={() => setShowDetails(!showDetails)}
					variant="outlined"
				>
					{showDetails ? "hide" : "Travellers"}
				</Button>
			</div>
			<div className="">
				<Button
					onClick={() => {
						let destinationId = destinationObj.uid;
						let startDateString = startDate.toDateString();
						let endDateString = endDate.toDateString();
						navigate(
							`/search/${destinationId}/${startDateString}/${endDateString}/${inputAdults}/${inputRooms}`,
							{
								state: {
									destinationObj: destinationObj,
									start: startDate,
									end: endDate,
									inputAdults: inputAdults,
									inputChildren: inputChildren,
									inputRooms: inputRooms,
								},
							}
						);
					}}
				>
					<AiOutlineSearch className="flex-none right-2 mt-1 scale-125" />
				</Button>
			</div>
		</div>
	);
};

export default Search;