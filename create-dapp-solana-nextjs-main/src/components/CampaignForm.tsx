import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface CampaignFormProps {
  onSubmit: (campaign: { name: string; description: string; targetAmount: number }) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const { connected } = useWallet();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!connected) {
      alert('请先连接钱包');
      return;
    }
    onSubmit({ name, description, targetAmount: parseFloat(targetAmount) });
    setName('');
    setDescription('');
    setTargetAmount('');
  };

  return (
    <div className="bg-gray-700 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">创建新的众筹活动</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            活动名称
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            描述
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-300">
            目标金额 (SOL)
          </label>
          <input
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            min="0"
            step="0.1"
            className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          disabled={!connected}
        >
          {connected ? '创建众筹活动' : '请先连接钱包'}
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;