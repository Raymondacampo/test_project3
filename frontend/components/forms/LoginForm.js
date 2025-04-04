'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '@/utils/api'; // Import apiClient
import GoogleButton from '../GoogleLogin';

export default function LoginForm() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      const { data } = await apiClient.post('/auth/login/', credentials);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      router.push('/profile');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="border-black/25 border py-8 bg-white rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex-col justify-center items-center gap-6 inline-flex sm:w-[418px] sm:px-8 xs:w-full xs:max-w-[400px] xs:px-4">
      <div className="self-stretch text-center text-[#293241] text-xl font-['Inter'] tracking-wide">Login to your account!</div>
      <GoogleButton />
      <div className="text-[#293241] text-xl font-medium">or</div>
      <div className="self-stretch flex-col justify-start items-start gap-11 flex">
        <div className="self-stretch flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch flex-col justify-start items-start gap-[5px] flex">
            <div className="self-stretch text-[#3d5a80] text-base font-normal font-['Inter'] tracking-wide">Email</div>
            <input
              type="text"
              name="email"
              placeholder="yourmail@example.com"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="text-black self-stretch px-4 py-3 focus:outline-none rounded-[5px] border border-black justify-start items-center gap-2.5 inline-flex"
            />
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-[5px] flex">
            <div className="self-stretch text-[#3d5a80] text-base font-normal font-['Inter'] tracking-wide">Password</div>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="text-black self-stretch focus:outline-none px-4 py-3 rounded-[5px] border border-black justify-start items-center gap-2.5 inline-flex"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
        <div className="self-stretch flex-col justify-center items-center gap-4 flex">
          <div className="self-stretch flex-col justify-center items-center gap-2.5 flex">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="self-stretch p-2.5 bg-[#ee6c4d] rounded-[10px] border border-[#ee6c4d] justify-center items-center gap-2.5 inline-flex"
            >
              <div className="text-white text-base font-['Inter'] tracking-wide">{loading ? 'Logging in...' : 'Login'}</div>
            </button>
            <a href="signup" className="self-stretch p-2.5 rounded-[10px] border border-[#ee6c4d] justify-center items-center gap-2.5 inline-flex">
              <div className="text-[#ee6c4d] text-base font-['Inter'] tracking-wide">Sign up</div>
            </a>
          </div>
          <div>
            <span className="text-[#293241] text-xs font-light font-['Inter'] tracking-wide">Are you a doctor?</span>
            <span className="text-[#4285f4] text-sm font-light font-['Inter'] tracking-wide"> </span>
            <a href="" className="text-[#ee6c4d] text-sm font-light font-['Inter'] tracking-wide">Sign up as a doctor</a>
          </div>
        </div>
      </div>
    </div>
  );
}