import React from 'react';
import { createCampaign } from '../utils/contract';
import CampaignForm from '../components/CampaignForm';

const CreateCampaignPage: React.FC = () => {
  const handleCreateCampaign = async (campaign: { name: string; description: string; targetAmount: number }) => {
    try {
      await createCampaign(campaign.name, campaign.description, campaign.targetAmount);
      alert("众筹活动创建成功!");
      // 可以在这里添加导航逻辑,例如跳转到活动列表页面
    } catch (error) {
      console.error("创建活动失败:", error);
      alert("创建活动失败,请检查控制台获取详细信息。");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">创建新的众筹活动</h1>
      <CampaignForm onSubmit={handleCreateCampaign} />
    </div>
  );
};

export default CreateCampaignPage;