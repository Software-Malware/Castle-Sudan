"use client";

import { useState } from 'react';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  country: string;
  company: string;
  job: string;
  favoriteColor: string;
  avatar: string;
  status: 'active' | 'inactive';
  points: number;
}

export default function AvatarTable() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Hart Hagerty',
      country: 'United States',
      company: 'Zemlak, Daniel and Leannon',
      job: 'Desktop Support Technician',
      favoriteColor: 'Purple',
      avatar: '/main.png',
      status: 'active',
      points: 95
    },
    {
      id: 2,
      name: 'Brice Swyre',
      country: 'China',
      company: 'Carroll Group',
      job: 'Tax Accountant',
      favoriteColor: 'Red',
      avatar: '/main.png',
      status: 'active',
      points: 88
    },
    {
      id: 3,
      name: 'Marjy Ferencz',
      country: 'Russia',
      company: 'Rowe-Schoen',
      job: 'Office Assistant I',
      favoriteColor: 'Crimson',
      avatar: '/main.png',
      status: 'inactive',
      points: 72
    },
    {
      id: 4,
      name: 'Yancy Tear',
      country: 'Brazil',
      company: 'Wyman-Ledner',
      job: 'Community Outreach Specialist',
      favoriteColor: 'Indigo',
      avatar: '/main.png',
      status: 'active',
      points: 91
    },
    {
      id: 5,
      name: 'John Doe',
      country: 'Canada',
      company: 'Tech Innovations',
      job: 'Software Developer',
      favoriteColor: 'Blue',
      avatar: '/main.png',
      status: 'active',
      points: 97
    },
    {
      id: 6,
      name: 'Jane Smith',
      country: 'Australia',
      company: 'Digital Solutions',
      job: 'UX Designer',
      favoriteColor: 'Green',
      avatar: '/main.png',
      status: 'inactive',
      points: 85
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-500';
  };

  const getPointsColor = (points: number) => {
    if (points >= 90) return 'text-green-600';
    if (points >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFavoriteColorBadge = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Purple': 'bg-purple-500',
      'Red': 'bg-red-500',
      'Crimson': 'bg-red-700',
      'Indigo': 'bg-indigo-500',
      'Blue': 'bg-blue-500',
      'Green': 'bg-green-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className='bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae]'>
    <div className="min-h-screen py-15 bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae]  px-4 sm:px-6 lg:px-8 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* First Card (Main Table) */}
        <div className="w-full md:w-7/12 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-3xl shadow-2xl overflow-hidden border-2 border-white/30 relative">
          {/* Double card effect */}
          <div className="absolute -inset-2 bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] rounded-3xl -z-10 opacity-70 blur-md"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#8b5a2b] rounded-full filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#8b5a2b] rounded-full filter blur-xl opacity-10"></div>
          
          {/* Header */}
          <div className="p-6 border-b border-[#8b5a2b]/30 bg-gradient-to-r from-[#e9d3ae] to-[#d4b98a] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b5a2b] to-[#6b4c2f]"></div>
            <h1 style={{ fontFamily: "Space Mono" }} className="text-2xl font-bold text-[#5c3e1f] flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#8b5a2b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Team Members
            </h1>
            <p style={{ fontFamily: "Space Mono" }} className="text-sm text-[#5c3e1f]/90 mt-1">Active contributors and their performance</p>
          </div>
          
          {/* Table */}
          <div className="p-4 md:p-6 overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr className="border-b border-[#8b5a2b]/30">
                  <th className="bg-transparent text-[#5c3e1f]">
                    <label>
                      <input type="checkbox" className="checkbox checkbox-xs bg-white border-[#8b5a2b]/30" />
                    </label>
                  </th>
                  <th style={{ fontFamily: "Space Mono" }} className="bg-transparent text-[#5c3e1f]">Name</th>
                  <th style={{ fontFamily: "Space Mono" }} className="bg-transparent text-[#5c3e1f] hidden md:table-cell">Job</th>
                  <th style={{ fontFamily: "Space Mono" }} className="bg-transparent text-[#5c3e1f] hidden lg:table-cell">Status</th>
                  <th style={{ fontFamily: "Space Mono" }} className="bg-transparent text-[#5c3e1f]">Points</th>
                  <th className="bg-transparent"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr 
                    key={user.id} 
                    className={`border-b border-[#8b5a2b]/20 hover:bg-[#e9d3ae]/50 cursor-pointer transition-colors duration-200 ${selectedUser?.id === user.id ? 'bg-[#e9d3ae]/70' : ''}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="bg-transparent">
                      <label>
                        <input type="checkbox" className="checkbox checkbox-xs bg-white border-[#8b5a2b]/30" />
                      </label>
                    </td>
                    <td className="bg-transparent">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10 border border-[#8b5a2b]/30">
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              width={40}
                              height={40}
                            />
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: "Space Mono" }} className="font-bold text-[#5c3e1f]">{user.name}</div>
                          <div style={{ fontFamily: "Space Mono" }} className="text-sm text-[#5c3e1f]/70">{user.country}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: "Space Mono" }} className="bg-transparent text-[#5c3e1f] hidden md:table-cell">
                      {user.job}
                      <br />
                      <span className="badge badge-sm bg-[#8b5a2b]/10 text-[#5c3e1f] border-[#8b5a2b]/20 mt-1">{user.company}</span>
                    </td>
                    <td className="bg-transparent hidden lg:table-cell">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(user.status)}`}></div>
                        <span style={{ fontFamily: "Space Mono" }} className="text-sm capitalize text-[#5c3e1f]">{user.status}</span>
                      </div>
                    </td>
                    <td className="bg-transparent">
                      <span style={{ fontFamily: "Space Mono" }} className={`font-bold ${getPointsColor(user.points)}`}>
                        {user.points}
                      </span>
                    </td>
                    <td className="bg-transparent">
                      <button style={{ fontFamily: "Space Mono" }} className="btn btn-ghost btn-xs text-[#5c3e1f] hover:text-[#8b5a2b] hover:bg-[#8b5a2b]/10">details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8b5a2b]/50 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8b5a2b]/50 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#8b5a2b]/50 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8b5a2b]/50 rounded-br-3xl"></div>
        </div>

        {/* Second Card (Details Panel) */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-[#8b5a2b] to-[#6b4c2f] rounded-3xl shadow-2xl overflow-hidden border-2 border-[#8b5a2b]/50 relative">
          {/* Double card effect */}
          <div className="absolute -inset-2 bg-gradient-to-br from-[#a67c52] to-[#8b5a2b] rounded-3xl -z-10 opacity-70 blur-md"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#e9d3ae] rounded-full filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#e9d3ae] rounded-full filter blur-xl opacity-10"></div>
          
          {/* Header */}
          <div className="p-6 border-b border-[#a67c52] bg-gradient-to-r from-[#8b5a2b] to-[#6b4c2f] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e9d3ae] to-[#d4b98a] opacity-50"></div>
            <h1 style={{ fontFamily: "Space Mono" }} className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#e9d3ae]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {selectedUser ? 'Member Details' : 'Select a Member'}
            </h1>
            <p style={{ fontFamily: "Space Mono" }} className="text-sm text-[#e9d3ae] mt-1">
              {selectedUser ? 'Detailed information and statistics' : 'Click on a team member to view details'}
            </p>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {selectedUser ? (
              <div className="text-white">
                <div className="flex flex-col items-center mb-6">
                  <div className="mask mask-squircle h-24 w-24 mb-4 border-4 border-[#e9d3ae]/30">
                    <Image
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      width={96}
                      height={96}
                      className="mask mask-squircle"
                    />
                  </div>
                  <h2 style={{ fontFamily: "Space Mono" }} className="text-2xl font-bold text-[#e9d3ae]">{selectedUser.name}</h2>
                  <p style={{ fontFamily: "Space Mono" }} className="text-[#e9d3ae]">{selectedUser.job}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#a67c52]/30 rounded-lg border border-[#a67c52]/50">
                    <span style={{ fontFamily: "Space Mono" }} className="text-[#e9d3ae]">Country</span>
                    <span style={{ fontFamily: "Space Mono" }} className="font-semibold">{selectedUser.country}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#a67c52]/30 rounded-lg border border-[#a67c52]/50">
                    <span style={{ fontFamily: "Space Mono" }} className="text-[#e9d3ae]">Company</span>
                    <span style={{ fontFamily: "Space Mono" }} className="font-semibold">{selectedUser.company}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#a67c52]/30 rounded-lg border border-[#a67c52]/50">
                    <span style={{ fontFamily: "Space Mono" }} className="text-[#e9d3ae]">Favorite Color</span>
                    <span className="badge badge-sm border-0 ${getFavoriteColorBadge(selectedUser.favoriteColor)}">
                      {selectedUser.favoriteColor}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#a67c52]/30 rounded-lg border border-[#a67c52]/50">
                    <span style={{ fontFamily: "Space Mono" }} className="text-[#e9d3ae]">Status</span>
                    <span style={{ fontFamily: "Space Mono" }} className="font-semibold capitalize">{selectedUser.status}</span>
                  </div>
                  
                  <div className="p-3 bg-[#a67c52]/30 rounded-lg border border-[#a67c52]/50">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ fontFamily: "Space Mono" }} className="text-[#e9d3ae]">Performance Points</span>
                      <span style={{ fontFamily: "Space Mono" }} className={`font-bold text-lg ${getPointsColor(selectedUser.points)}`}>
                        {selectedUser.points}/100
                      </span>
                    </div>
                    <progress 
                      className="progress w-full h-2 bg-[#a67c52]/50" 
                      value={selectedUser.points} 
                      max="100"
                      style={{ accentColor: '#e9d3ae' }}
                    ></progress>
                  </div>
                </div>
                
                <button style={{ fontFamily: "Space Mono" }} className="btn btn-block rounded-3xl mt-6 bg-[#e9d3ae] text-[#8b5a2b] border-none hover:bg-[#d4b98a]">
                  Contact {selectedUser.name.split(' ')[0]}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-[#e9d3ae]">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p style={{ fontFamily: "Space Mono" }} className="text-center">Select a team member from the list to view their details and performance metrics.</p>
              </div>
            )}
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#e9d3ae]/50 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e9d3ae]/50 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#e9d3ae]/50 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e9d3ae]/50 rounded-br-3xl"></div>
        </div>
      </div>
    </div>
        </div>
  );
}