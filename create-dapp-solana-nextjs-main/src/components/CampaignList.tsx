import React from 'react';

interface CampaignCardProps {
  campaign: any;
  onDonate: (campaign: any) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDonate }) => {
  const progress = (campaign.amountCollected / campaign.targetAmount) * 100;

  return (
    <div className="bg-gray-700 shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2 text-white">{campaign.name}</h2>
      <p className="text-gray-300 mb-4">{campaign.description}</p>
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-200 bg-indigo-600">
                进度
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-200">
                {progress.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
            ></div>
          </div>
        </div>
      </div>
      <p className="text-gray-300 mb-2">
        已筹集: {campaign.amountCollected} SOL / {campaign.targetAmount} SOL
      </p>
      <button
        onClick={() => onDonate(campaign)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        捐款
      </button>
    </div>
  );
};

interface CampaignListProps {
  campaigns: Campaign[];
  onDonate: (campaign: Campaign) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns, onDonate }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">当前众筹活动</h2>
      {campaigns.length === 0 ? (
        <p className="text-gray-300">目前还没有众筹活动,快来创建第一个吧!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} onDonate={onDonate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;