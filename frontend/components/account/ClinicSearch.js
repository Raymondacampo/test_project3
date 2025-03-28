// components/ClinicSearch.js
import { useState } from 'react';
import axios from 'axios';

export default function ClinicSearch({ onClinicAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available clinics when search bar opens
  const fetchClinics = async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem("access_token");
      const { data } = await axios.get('http://localhost:8000/api/auth/available_clinics/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setClinics(data);
    } catch (err) {
      setError('Failed to load clinics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a clinic
  const handleAddClinic = async (clinicId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await axios.post(
        'http://localhost:8000/api/auth/add_clinic/',
        { clinic_id: clinicId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setIsOpen(false); // Close the search bar
      setSearchTerm(''); // Reset search
      onClinicAdded(); // Trigger reload in parent component
    } catch (err) {
      setError('Failed to add clinic');
      console.error(err);
    }
  };

  // Filter clinics based on search term
  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            fetchClinics();
          }}
          className="text-white text-sm font-normal font-['Inter'] bg-[#3d5a80] px-2.5 py-2 rounded-md"
        >
          Add +
        </button>
      ) : (
        <div className="w-full flex-col gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clinics..."
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4285f4] focus:border-[#4285f4] text-sm"
          />
          {loading && <div className="text-sm text-gray-500">Loading...</div>}
          {error && <div className="text-sm text-red-500">{error}</div>}
          {!loading && !error && filteredClinics.length > 0 && (
            <ul className="max-h-[150px] overflow-y-auto border border-gray-300 rounded-md bg-white">
              {filteredClinics.map((clinic) => (
                <li
                  key={clinic.id}
                  onClick={() => handleAddClinic(clinic.id)}
                  className="px-3 py-2 text-sm font-normal font-['Inter'] text-black hover:bg-[#98c1d1]/25 cursor-pointer"
                >
                  {clinic.name}
                </li>
              ))}
            </ul>
          )}
          {!loading && !error && filteredClinics.length === 0 && (
            <div className="text-sm text-gray-500">No available clinics found</div>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 text-white bg-red-700 text-sm font-normal font-['Inter'] px-2.5 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}