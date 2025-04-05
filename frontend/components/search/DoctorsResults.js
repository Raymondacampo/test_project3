// DoctorsResults.js
import { useState, useEffect } from "react";
import { publicApiClient } from "@/utils/api";
import Pagination from "../Pagination";

const Doctor = ({ doctor }) => {
  const specialties = doctor.specialties.map(s => s.name).join(", ");
  const clinics = doctor.clinics.map(c => c.name).join(", ");
  const takingDates = doctor.taking_dates;
  const inPerson = doctor.clinics.length > 0;
  const averageRating = doctor.average_rating || 0;
  const reviewCount = doctor.review_count || 0;
  const hasAvailability = doctor.has_availability;

  return (
    <div className="w-full px-2 pb-2 rounded-lg border border-black/25 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex-col justify-start items-center gap-4 flex md:gap-2.5 md:min-w-2xl">
      <div className="self-stretch p-2 justify-start items-center gap-4 inline-flex relative sm:flex-row xs:flex-col">
        <div className="w-[100px] h-[100px] bg-[#d9d9d9] rounded-full"></div>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex
        xs:w-[95%]">
          <div className="self-stretch flex-col justify-start items-start gap-[3px] flex">
            <div className="self-stretch py-[5px] border-b border-[#293241]/0 justify-between items-start inline-flex overflow-hidden">
              <div className="text-[#293241] text-lg font-medium tracking-wide sm:text-xl">
                Dr. {doctor.user.first_name} {doctor.user.last_name}
              </div>
              <div className="items-end gap-2 flex py-1 sm:relative xs:absolute xs:top-0 xs:right-0">
                <div className="h-auto justify-center items-center gap-1 flex">
                  <svg width="17" height="16" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.4999 11.24L3.8699 13.432C3.76324 13.4846 3.66424 13.506 3.5729 13.496C3.48224 13.4853 3.3939 13.454 3.3079 13.402C3.22124 13.3486 3.1559 13.2733 3.1119 13.176C3.0679 13.0786 3.0639 12.9723 3.0999 12.857L4.0659 8.74695L0.870902 5.97695C0.780902 5.90362 0.721569 5.81595 0.692902 5.71395C0.664236 5.61195 0.670569 5.51429 0.711903 5.42095C0.753236 5.32762 0.808236 5.25095 0.876902 5.19095C0.946236 5.13295 1.03957 5.09362 1.1569 5.07295L5.3729 4.70495L7.0169 0.812953C7.06224 0.702953 7.12757 0.62362 7.2129 0.574953C7.29824 0.526286 7.3939 0.501953 7.4999 0.501953C7.6059 0.501953 7.7019 0.526286 7.7879 0.574953C7.8739 0.62362 7.9389 0.702953 7.9829 0.812953L9.6269 4.70495L13.8419 5.07295C13.9599 5.09295 14.0536 5.13262 14.1229 5.19195C14.1922 5.25062 14.2476 5.32695 14.2889 5.42095C14.3296 5.51429 14.3356 5.61195 14.3069 5.71395C14.2782 5.81595 14.2189 5.90362 14.1289 5.97695L10.9339 8.74695L11.8999 12.857C11.9372 12.971 11.9336 13.077 11.8889 13.175C11.8442 13.273 11.7786 13.3483 11.6919 13.401C11.6066 13.4543 11.5182 13.486 11.4269 13.496C11.3362 13.506 11.2376 13.4846 11.1309 13.432L7.4999 11.24Z" fill="#293241"/>
                  </svg>
                  <p className="text-[#3d5a80] text-xs items-end font-light">{averageRating}</p>
                </div>
                <div className="h-[17px] justify-start items-center gap-2.5 flex">
                  <div data-svg-wrapper>
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33 0.669922C2.44683 0.669922 1.59983 1.02076 0.975335 1.64526C0.350839 2.26975 0 3.11675 0 3.99992C0 4.88309 0.350839 5.73009 0.975335 6.35459C1.59983 6.97908 2.44683 7.32992 3.33 7.32992C5.17815 7.32992 6.66 5.84807 6.66 3.99992C6.66 3.11675 6.30916 2.26975 5.68466 1.64526C5.06017 1.02076 4.21317 0.669922 3.33 0.669922Z" fill="#3D5A80"/>
                    </svg>
                  </div>
                  <div className="text-[#3d5a80] text-xs font-light tracking-wide whitespace-nowrap">{reviewCount} reviews</div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
              <div className="text-[#293241] text-xs tracking-wide">{specialties.toUpperCase()}</div>
            </div>
          </div>
          <div className="self-stretch h-auto flex-col justify-start items-start gap-1 flex">
            {hasAvailability && (
              <div className="justify-center items-center gap-[9px] inline-flex">
                <div data-svg-wrapper>
                  <svg width="13" height="14" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 15.5C8.48491 15.5 9.46018 15.306 10.3701 14.9291C11.2801 14.5522 12.1069 13.9997 12.8033 13.3033C13.4997 12.6069 14.0522 11.7801 14.4291 10.8701C14.806 9.96018 15 8.98491 15 8C15 7.01509 14.806 6.03982 14.4291 5.12987C14.0522 4.21993 13.4997 3.39314 12.8033 2.6967C12.1069 2.00026 11.2801 1.44781 10.3701 1.0709C9.46018 0.693993 8.48491 0.5 7.5 0.5C5.51088 0.5 3.60322 1.29018 2.1967 2.6967C0.790176 4.10322 0 6.01088 0 8C0 9.98912 0.790176 11.8968 2.1967 13.3033C3.60322 14.7098 5.51088 15.5 7.5 15.5ZM7.30667 11.0333L11.4733 6.03333L10.1933 4.96667L6.61 9.26583L4.75583 7.41083L3.5775 8.58917L6.0775 11.0892L6.7225 11.7342L7.30667 11.0333Z" fill="#3D5A80"/>
                  </svg>
                </div>
                <div className="w-[97px] h-[18px] text-[#3d5a80] text-xs font-normal tracking-wide">Doctify dates</div>
              </div>
            )}
            {inPerson && (
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div data-svg-wrapper className="relative">
                  <svg width="12" height="15" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.23498 8.5C9.2062 8.5 10.8042 6.82107 10.8042 4.75C10.8042 2.67893 9.2062 1 7.23498 1C5.26376 1 3.66577 2.67893 3.66577 4.75C3.66577 6.82107 5.26376 8.5 7.23498 8.5Z" fill="#3D5A80" stroke="#3D5A80"/>
                    <path d="M10.8042 10H11.0555C11.5774 10.0002 12.0812 10.2005 12.4724 10.5635C12.8636 10.9264 13.1152 11.4269 13.1799 11.971L13.459 14.314C13.4841 14.5251 13.4662 14.7393 13.4064 14.9426C13.3467 15.1458 13.2465 15.3334 13.1125 15.4928C12.9785 15.6523 12.8137 15.78 12.6292 15.8674C12.4446 15.9549 12.2445 16 12.042 16H2.42799C2.22554 16 2.02538 15.9549 1.84082 15.8674C1.65626 15.78 1.49151 15.6523 1.3575 15.4928C1.22349 15.3334 1.1233 15.1458 1.06356 14.9426C1.00382 14.7393 0.985914 14.5251 1.01102 14.314L1.28942 11.971C1.35416 11.4267 1.60595 10.9259 1.99743 10.563C2.38891 10.2 2.89312 9.99979 3.41524 10H3.66579" fill="#3D5A80"/>
                    <path d="M10.8042 10H11.0555C11.5774 10.0002 12.0812 10.2005 12.4724 10.5635C12.8636 10.9264 13.1152 11.4269 13.1799 11.971L13.459 14.314C13.4841 14.5251 13.4662 14.7393 13.4064 14.9426C13.3467 15.1458 13.2465 15.3334 13.1125 15.4928C12.9785 15.6523 12.8137 15.78 12.6292 15.8674C12.4446 15.9549 12.2445 16 12.042 16H2.42799C2.22554 16 2.02538 15.9549 1.84082 15.8674C1.65626 15.78 1.49151 15.6523 1.3575 15.4928C1.22349 15.3334 1.1233 15.1458 1.06356 14.9426C1.00382 14.7393 0.985914 14.5251 1.01102 14.314L1.28942 11.971C1.35416 11.4267 1.60595 10.9259 1.99743 10.563C2.38891 10.2 2.89312 9.99979 3.41524 10H3.66579" stroke="#3D5A80" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-[68px] h-[19px] text-[#3d5a80] text-xs font-normal tracking-wide">In person</div>
              </div>
            )}
            <div className="self-stretch justify-start items-center gap-3 inline-flex">
              <div data-svg-wrapper className="relative">
                <svg width="11" height="15" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 16C9.55556 11.9615 12 8.5 12 6.19231C12 4.81522 11.4205 3.49454 10.3891 2.52079C9.35764 1.54705 7.95869 1 6.5 1C5.04131 1 3.64236 1.54705 2.61091 2.52079C1.57946 3.49454 1 4.81522 1 6.19231C1 8.5 3.44444 11.9615 6.5 16Z" fill="#3D5A80" stroke="#3D5A80"/>
                  <path d="M8.94443 6.19246C8.94443 6.8045 8.68689 7.39147 8.22847 7.82424C7.77005 8.25702 7.14829 8.50015 6.49999 8.50015C5.85168 8.50015 5.22993 8.25702 4.7715 7.82424C4.31308 7.39147 4.05554 6.8045 4.05554 6.19246C4.05554 5.58042 4.31308 4.99345 4.7715 4.56067C5.22993 4.1279 5.85168 3.88477 6.49999 3.88477C7.14829 3.88477 7.77005 4.1279 8.22847 4.56067C8.68689 4.99345 8.94443 5.58042 8.94443 6.19246Z" fill="white" stroke="#3D5A80"/>
                </svg>
              </div>
              <div className="grow shrink basis-0 text-[#3d5a80] text-xs font-normal tracking-wide">{clinics}</div>
            </div>
          </div>
        </div>
      </div>
      <button className="p-2 pl-3 pr-3 bg-[#ee6c4d] rounded-[10px] border border-[#ee6c4d] justify-center items-center gap-2.5 inline-flex sm:w-auto xs:w-full xs:max-w-sm">
        <div className="text-white text-sm tracking-wide">View profile</div>
      </button>
    </div>
  );
};

const Filters = ({ sortBy, setSortBy, onFiltersToggle }) => {
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    if (value === "distance") {
      console.log("distance");
    }
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="justify-start items-center gap-[5px] inline-flex">
        <div className="h-auto text-black text-md font-medium tracking-wide sm:flex xs:hidden">Sort</div>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="text-black border border-gray-300 p-1 rounded-md text-xs tracking-wide bg-transparent focus:outline-none"
          >
            <option value="relevance">By relevance</option>
            <option value="distance">Distance</option>
            <option value="expertise">By expertise</option>
          </select>
      </div>

      <button
        onClick={onFiltersToggle}
        className="px-3 py-1.5 bg-[#293241] rounded-[5px] border border-[#293241] text-white text-sm tracking-wide xl:hidden flex items-center gap-2"
      >
          Filters
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-.447.832l-4 2.5A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
      </button>


    </div>
  );
};


export default function DoctorsResults({ specialty, location, ensurance, sex, takes_dates, experienceValue, onFiltersToggle,onCountChange }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");


  useEffect(() => {
      const fetchDoctors = async () => {
          setLoading(true);
          try {
              const params = new URLSearchParams({
                  ...(specialty && { specialty }),
                  ...(location && { location }),
                  ...(ensurance && { ensurance }),
                  ...(sex && { sex }),
                  ...(takes_dates && { takes_dates }),
                  ...(experienceValue !== "any" && {experience_min: experienceValue}),
                  page: currentPage,
              });
              const response = await publicApiClient.get(`/doctors/search/?${params.toString()}`);
              const data = response.data;
              
              let results = data.results;

              if (sortBy === "relevance") {
                results.sort((a, b) => b.average_rating - a.average_rating);
              } else if (sortBy === "expertise") {
                results.sort((a, b) => b.experience - a.experience);
              }
              console.log(data)
              onCountChange(data.count);
              setDoctors(data.results);
              setTotalPages(Math.ceil(data.count / 10));
              // console.log(Math.ceil(data.count / 10))
          } catch (error) {
              console.error("Error fetching doctors:", error);
          } finally {
              setLoading(false);
          }
      };
      if(specialty){
          fetchDoctors(); 
      }
  }, [specialty, location, ensurance, sex, takes_dates, experienceValue, currentPage, sortBy]);

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  return (
      <div className="flex-col justify-start items-center gap-4 inline-flex w-full xl:max-w-2xl lg:max-w-3xl md:max-w-2xl sm:max-w-xl">
          <Filters sortBy={sortBy} setSortBy={setSortBy} onFiltersToggle={onFiltersToggle}/>
          {loading ? (
              <p>Loading doctors...</p>
          ) : doctors.length > 0 ? (
              doctors.map((doctor) => <Doctor key={doctor.id} doctor={doctor} />)
          ) : (
              <div className="w-full h-80 flex justify-center items-center ">
                <div className="flex flex-col justify-center items-center gap-1">
                  <div className="text-[#060648] text-2xl font-semibold">No doctors found</div>
                  <p className="text-[#060648]">Try adjusting your search criteria.</p>
                  <img src="/images/dclogo.png" alt="No results" className="h-[75px] w-[75px] mt-4"/>
                </div>
              </div>
          )}
          {totalPages > 0 && (
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
              />
          )}
      </div>
  );
}