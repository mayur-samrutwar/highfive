import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function CreateContest() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    entryFee: '',
    totalPrize: '',
    nftCount: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here - would be API call in real app
    alert('Contest created successfully!');
    router.push('/contest');
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

              <div>
                <label className={labelClasses}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
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
                  <label className={labelClasses}>Total Prize ($)</label>
                  <input
                    type="number"
                    name="totalPrize"
                    value={formData.totalPrize}
                    onChange={handleChange}
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

                <div className="md:col-span-2">
                  <label className={labelClasses}>Budget per Player ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
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
                className="w-full bg-black text-white py-4 rounded-lg font-medium text-[15px] tracking-wide transition-all duration-300 mt-8"
              >
                Create Contest
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
