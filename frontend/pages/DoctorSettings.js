import { useState } from "react";
import { useUser } from "@/hooks/User";
import SpecialtySearch from "@/components/account/SpecialtySearch";
import ClinicSearch from "@/components/account/ClinicSearch";
import { SpecializationMenu } from "@/components/account/SpecializationMenu";
import { ClinicMenu } from "@/components/account/ClinicMenu";
import { DoctorDocumentUpload } from "@/components/account/DoctorDocumentUpload";
import DocumentsSection from "@/components/account/DocumentsSection";
import DoctorAvailabilitySection from "@/components/account/DoctorAvailabilitySection";
import { apiClient } from "@/utils/api";
import EnsuranceSearch from "@/components/account/EnsuranceSearch";
import { EnsuranceMenu } from "@/components/account/EnsuranceMenu";
import { getApiImgUrl } from "@/utils/api";

const ProfessionalData = ({ data, onReload }) => {
  const backendBaseUrl = getApiImgUrl();
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(data.description || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200; // Max characters before truncation

  const handleSaveDescription = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await apiClient.put(
        'auth/me/',
        { description },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      onReload();
      setIsEditingDescription(false);
    } catch (error) {
      console.error('Failed to update description:', error);
      alert('Failed to save description. Please try again.');
    }
  };

    const renderDescription = () => {
      if (!data.description) {
        return <div className="text-gray-500 italic">No description provided.</div>;
      }
      if (data.description.length <= maxLength || isExpanded) {
        return <div className="text-black text-sm font-normal font-['Inter']">{data.description}</div>;
      }

    return (
      <div>
        <div className="text-black text-sm font-normal font-['Inter']">
          {data.description.substring(0, maxLength)}...
        </div>
        <button
          onClick={() => setIsExpanded(true)}
          className="text-[#ee6c4d] text-sm font-medium font-['Inter'] hover:underline"
        >
          See More
        </button>
      </div>
    );
  };

  return (
    <div className="w-full rounded-[10px] flex-col justify-start items-start gap-6 inline-flex">
      <div className="w-full flex items-center justify-between">
        <div className="self-stretch text-black font-normal font-['Inter'] sm:text-3xl xs:text-2xl">
          Professional data
        </div>
      </div>
      <div className="self-stretch py-4 rounded-[10px] flex-col justify-start items-start gap-6 flex sm:px-4 xs:px-0">
        <div className="self-stretch flex-col justify-between items-start gap-8 inline-flex">

          {/* Description Section */}
          <div className="w-full flex flex-col gap-2.5">
            <div className="w-full flex justify-between items-center">
              <div className="text-[#3d5a80] font-normal font-['Inter'] text-lg">
                Description
              </div>
              <button
                onClick={() => setIsEditingDescription(true)}
                className="text-[#ee6c4d] text-sm font-medium font-['Inter'] hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-col px-4 gap-4">
              {isEditingDescription ? (
                <div className="flex flex-col gap-4">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-black w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee6c4d]"
                    placeholder="Write about yourself..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDescription}
                      className="px-4 py-2 bg-[#ee6c4d] text-white rounded-md hover:bg-[#d65a3e]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingDescription(false);
                        setDescription(data.description || "");
                      }}
                      className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                renderDescription()
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <div className="w-full text-[#3d5a80] font-normal font-['Inter'] text-lg">
              Specialization
            </div>
            <div className="flex flex-col px-4 gap-4">
                <div className="flex gap-2.5 ">
                    {data.specializations.length > 0 &&
                    data.specializations.map((specialization) => (
                        <div
                        key={specialization.id}
                        className="w-auto pl-4 pr-2 py-2 bg-gray-200/80 rounded-sm justify-between items-center gap-8  flex"
                        >
                        <div className="text-black text-sm font-normal font-['Inter']">{specialization.name}</div>
                        <div>
                            <SpecializationMenu specialization={specialization} onDelete={onReload} />
                        </div>
                        </div>
                    ))}              
                </div>
                <SpecialtySearch onSpecialtyAdded={onReload} />
            </div>

          </div>
          <div className="w-full flex flex-col gap-2.5">
            <div className="w-full text-[#3d5a80] font-normal font-['Inter'] text-lg">Clinics</div>
            <div className="flex flex-col px-4 gap-4">
                <div className="flex gap-2.5">
                    {data.clinics.length > 0 &&
                    data.clinics.map((clinic) => (
                        <div
                        key={clinic.id}
                        className="w-auto pl-4 pr-2 py-2 bg-gray-200/80 rounded-sm justify-between items-center gap-8 flex"
                        >
                        <div className="text-black text-sm font-normal font-['Inter']">{clinic.name}</div>
                        <div>
                            <ClinicMenu clinic={clinic} onDelete={onReload} />
                        </div>
                        </div>
                    ))}                
                </div>
                <ClinicSearch onClinicAdded={onReload} />
            </div>


          </div>
          <div className="w-full flex flex-col gap-2.5">
            <div className="w-full text-[#3d5a80] font-normal font-['Inter'] text-lg">Ensurances</div>
            <div className="flex flex-col px-4 gap-4">
                <div className="flex gap-2.5">
                    {data.ensurances && data.ensurances.length > 0 && 
                    data.ensurances.map((ensurance) => (
                        <div
                        key={ensurance.id}
                        className="w-auto py-2 rounded-sm justify-between items-center gap-16 flex"
                        >
                        <div className="flex items-center gap-2">
                            {ensurance.logo && (
                            <img src={`${backendBaseUrl}${ensurance.logo}`} alt={`${ensurance.name} logo`} className="w-12 h-12 object-contain" />
                            )}
                            <div className="text-black text-sm font-normal font-['Inter']">{ensurance.name}</div>
                        </div>
                        <div>
                            <EnsuranceMenu ensurance={ensurance} onDelete={onReload} />
                        </div>
                        </div>
                    ))}
                </div>
                <EnsuranceSearch onEnsuranceAdded={onReload} />
            </div>
          </div>
          <div className="w-full flex-col flex gap-8 mt-6">
            <div className="self-stretch justify-between items-start gap-4 inline-flex">
              <div className="w-[125px] text-[#3d5a80] font-normal font-['Inter'] text-lg">
                Exequatur
              </div>
              <div className="text-black text-sm font-normal font-['Inter']">{data.exequatur}</div>
            </div>
            <div className="self-stretch justify-between items-start gap-4 inline-flex">
              <div className="w-[125px] text-[#3d5a80] font-normal font-['Inter'] text-lg">
                Experience
              </div>
              <div className="text-black text-sm font-normal font-['Inter']">{data.experience} Years</div>
            </div>
          </div>
        </div>
      </div>
    </div>    
  )};

const Scheduling = ({ user, onReload }) => {
  const [takesVirtual, setTakesVirtual] = useState(user.takes_virtual || false);
  const [takesInPerson, setTakesInPerson] = useState(user.takes_in_person || false);

  const handleToggleVirtual = async () => {
    const newValue = !takesVirtual;
    setTakesVirtual(newValue);
    try {
      const accessToken = localStorage.getItem('access_token');
      await apiClient.put(
        'auth/me/',
        { takes_virtual: newValue },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      onReload();
    } catch (error) {
      console.error('Failed to update takes_virtual:', error);
      setTakesVirtual(!newValue); // Revert on failure
    }
  };

  const handleToggleInPerson = async () => {
    const newValue = !takesInPerson;
    setTakesInPerson(newValue);
    try {
      const accessToken = localStorage.getItem('access_token');
      await apiClient.put(
        'auth/me/',
        { takes_in_person: newValue },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      onReload();
    } catch (error) {
      console.error('Failed to update takes_in_person:', error);
      setTakesInPerson(!newValue); // Revert on failure
    }
  };

  return (
    <div className="w-full rounded-[10px] flex-col justify-start items-start gap-6 inline-flex">
      <div className="w-full flex items-center justify-between">
        <div className="self-stretch text-black font-normal font-['Inter'] sm:text-2xl xs:text-xl">Availability</div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch rounded-[10px] flex-col justify-start items-start gap-6 flex sm:px-4 xs:px-0">
          <div className="self-stretch items-center gap-4 inline-flex">
            <div className="w-[125px] text-[#3d5a80] font-normal font-['Inter'] sm:text-lg xs:text-base">Virtual</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={takesVirtual}
                onChange={handleToggleVirtual}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ee6c4d]"></div>
            </label>
          </div>
          <div className="self-stretch items-center gap-4 inline-flex">
            <div className="w-[125px] text-[#3d5a80] font-normal font-['Inter'] sm:text-lg xs:text-base">In Person</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={takesInPerson}
                onChange={handleToggleInPerson}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ee6c4d]"></div>
            </label>
          </div>
          <div className="text-[#3d5a80] text-xs font-normal font-['Inter']">
            Set your availability preferences. Disabling will deactivate related availabilities.
          </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <DoctorAvailabilitySection user={user} onReload={onReload} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default function Settings() {
  const { user, loading, reload } = useUser(); // Use the hook

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Error loading user data.</div>;

  return (
    <div className="w-full justify-center items-start gap-2.5 inline-flex mt-2">
      <div className="py-4 rounded-[20px] justify-center items-start gap-4 inline-flex sm:px-0 sm:w-auto xs:w-full">
        <div className="w-full self-stretch py-8 bg-white  justify-center items-start gap-12 flex flex-wrap shadow-[0px_4px_6px_2px_rgba(0,0,0,0.15)] 
        lg:px-20 
        md:px-10 
        sm:px-20 sm:rounded-[20px] sm:max-w-[900px] 
        xs:px-4">
            <ProfessionalData data={user} onReload={reload} />
            {/* <Scheduling user={user} onReload={reload} /> */}
            <div className="w-full">
            <DocumentsSection data={user} onReload={reload} />
            <DoctorDocumentUpload onUpload={reload} />
            </div>
        </div>
      </div>
    </div>
  );
}