import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useWriteContract, useSimulateContract } from 'wagmi';
import { parseEther } from 'viem';

const CONTRACT_ADDRESS = '0xa51084ce30E70F88b9E2C2e5fFF175B94cA909C9';
const CONTRACT_ABI = [
  {
    name: 'createContest',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'deadline', type: 'uint256' },
      { name: 'entryFee', type: 'uint256' },
      { name: 'nftCount', type: 'uint256' }
    ],
    outputs: []
  }
];

export default function CreateContest() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    entryFee: '',
    nftCount: ''
  });

  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'createContest',
    args: formData.title && formData.deadline ? [
      formData.title,
      BigInt(Math.floor(new Date(formData.deadline).getTime() / 1000)),
      parseEther(formData.entryFee || '0'),
      BigInt(formData.nftCount || '0')
    ] : undefined,
  });

  const { writeContract, isPending, error } = useWriteContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const deadlineDate = new Date(formData.deadline);
      const deadlineTimestamp = Math.floor(deadlineDate.getTime() / 1000);
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createContest',
        args: [
          formData.title,
          BigInt(deadlineTimestamp),
          parseEther(formData.entryFee),
          BigInt(formData.nftCount)
        ]
      });

      router.push('/contest');
    } catch (error) {
      console.error('Error creating contest:', error);
      alert('Failed to create contest. Please try again.');
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-3xl font-medium text-black">Create New Contest</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClasses}>Contest Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Deadline</label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>Entry Fee (ETH)</label>
                  <input
                    type="number"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleChange}
                    step="0.01"
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>Number of NFTs</label>
                  <input
                    type="number"
                    name="nftCount"
                    value={formData.nftCount}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isPending || simulateError}
                className="w-full bg-black text-white py-4 rounded-lg font-medium text-[15px] tracking-wide transition-all duration-300 mt-8 disabled:opacity-50"
              >
                {isPending ? 'Creating Contest...' : 'Create Contest'}
              </motion.button>

              {error && (
                <div className="text-red-600 text-center">
                  {error.message}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
