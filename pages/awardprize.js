import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useWriteContract, useSimulateContract } from 'wagmi';
import HighFiveABI from '@/contracts/abi/highfive.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function AwardPrize() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    contestId: '',
    winnerAddress: ''
  });

  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: HighFiveABI,
    functionName: 'awardPrize',
    args: formData.contestId && formData.winnerAddress ? [
      BigInt(formData.contestId),
      formData.winnerAddress
    ] : undefined,
  });

  const { writeContract, isPending, error } = useWriteContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: HighFiveABI,
        functionName: 'awardPrize',
        args: [
          BigInt(formData.contestId),
          formData.winnerAddress
        ]
      });

      alert('Prize awarded successfully!');
      router.push('/contest');
    } catch (error) {
      console.error('Error awarding prize:', error);
      alert('Failed to award prize. Please ensure the contest has ended and the winner is a valid participant.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClasses = "w-full bg-white border border-neutral-200 rounded-lg px-4 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors duration-300";
  const labelClasses = "block text-neutral-600 mb-2 text-[15px]";

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Admin Notice Banner */}
          <div className="mb-8 bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <svg 
                className="w-5 h-5 text-neutral-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <div className="text-sm text-neutral-600">
                <p><span className="font-medium">Admin Only:</span> Only contract owner can award prizes.</p>
                <p className="mt-1 text-xs">Note: Contest must be ended and winner must be a valid participant.</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-3xl font-medium text-black">Award Contest Prize</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClasses}>Contest ID</label>
                <input
                  type="number"
                  name="contestId"
                  value={formData.contestId}
                  onChange={handleChange}
                  placeholder="Enter contest ID"
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Winner Address</label>
                <input
                  type="text"
                  name="winnerAddress"
                  value={formData.winnerAddress}
                  onChange={handleChange}
                  placeholder="0x..."
                  className={inputClasses}
                  required
                  pattern="^0x[a-fA-F0-9]{40}$"
                  title="Please enter a valid Ethereum address"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isPending || simulateError}
                className="w-full bg-black text-white py-4 rounded-lg font-medium text-[15px] tracking-wide transition-all duration-300 mt-8 disabled:opacity-50"
              >
                {isPending ? 'Awarding Prize...' : 'Award Prize'}
              </motion.button>

              {(error || simulateError) && (
                <div className="text-red-600 text-center mt-4">
                  {error?.message || simulateError?.message}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
