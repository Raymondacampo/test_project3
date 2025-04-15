import { useState, useEffect } from "react";
import { apiClient, getApiImgUrl } from "@/utils/api";
import { useRouter } from "next/router";

const Doctor = ({ doctor, onRemove }) => {
    const backendBaseUrl = getApiImgUrl();
  return (
    <div className="w-full bg-white rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-between items-center gap-8 flex flex-wrap border border-black/25 sm:px-4 xs:px-2 xs:py-4">
      <div className="justify-start items-center gap-4 flex">
        <img src={`${backendBaseUrl}${doctor.user.profile_picture}`} className="bg-[#d9d9d9] rounded-full sm:w-24 sm:h-24 xs:w-16 xs:h-16"></img>
        <div className="flex-col justify-center items-start gap-1 inline-flex">
          <div className="flex-col justify-start items-start gap-[3px] flex">
            <div className="self-stretch py-[5px] justify-center items-center gap-2.5 inline-flex">
              <div className="text-[#3d5a80] font-['Inter'] tracking-wide text-lg">
                Dr. {doctor.user.first_name} {doctor.user.last_name}
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
              {doctor.specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="text-[#3d5a80] text-xs font-normal font-['Inter'] tracking-wide"
                >
                  {specialty.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-center gap-2 inline-flex sm:w-auto xs:w-full">
          <a href={`/profile/${doctor.id}`} className="self-stretch px-2.5 py-1.5 rounded-[10px] border-2 border-[#ee6c4d] items-center gap-2.5 inline-flex justify-center">
            <div className="text-[#ee6c4d] font-['Inter'] tracking-wide font-bold text-sm justify-center items-center">
              View profile
            </div>
          </a>
        <button
          onClick={() => onRemove(doctor.id)}
          className="self-stretch px-2.5 py-1.5 bg-[#ee6c4d] rounded-[10px] border border-[#ee6c4d] justify-center items-center gap-2.5 inline-flex"
        >
          <div className="text-white font-['Inter'] tracking-wide text-sm">
            Remove
          </div>
        </button>
      </div>
    </div>
  );
};

export default function FavouriteDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const fetchFavoriteDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/auth/me/");
      setDoctors(response.data.favorite_doctors || []);
    } catch (err) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteDoctors();
  }, []);

  const handleRemove = async (doctorId) => {
    try {
      await apiClient.post(`/auth/toggle_favorite/${doctorId}/`);
      setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to remove doctor");
    }
  };

  if (loading) return <div className="text-[#293241] font-['Inter'] text-center">Loading...</div>;
  if (error) return <div className="text-red-500 font-['Inter'] text-center">Error: {error}</div>;

  return (
    <div className="w-full flex-col justify-center items-center gap-4 inline-flex my-8">
      <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-4 sm:px-4 xs:px-2">
        <div className="self-stretch w-full text-[#293241] text-2xl font-['Inter'] tracking-wide font-bold border-b mb-4">
          Favourite doctors
        </div>
        <div className="self-stretch w-full flex-col justify-start items-center gap-3 flex">
          {doctors.length === 0 ? (
            <div className="text-[#293241] font-['Inter'] text-center">
              No favorite doctors found.
            </div>
          ) : (
            doctors.map((doctor) => (
              <Doctor key={doctor.id} doctor={doctor} onRemove={handleRemove} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}