import React, { useEffect, useState } from 'react';
import { fetchCampaigns, donate } from '../utils/contract';
import CampaignList from '../components/CampaignList';

const CampaignListPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const fetchedCampaigns = await fetchCampaigns();
        setCampaigns(fetchedCampaigns.map(c => ({
          id: c.publicKey.toBase58(),
          name: c.account.name,
          description: c.account.description,
          targetAmount: c.account.targetAmount.toNumber(),
          amountCollected: c.account.amountCollected.toNumber()
        })));
      } catch (error) {
        console.error("加载活动失败:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const handleDonate = async (campaign: Campaign) => {
    const amount = prompt(`请输入要捐赠的 SOL 数量给 "${campaign.name}":`, "0.1");
    if (amount) {
      try {
        await donate(new PublicKey(campaign.id), parseFloat(amount));
        // 重新加载活动列表以更新数据
        const updatedCampaigns = await fetchCampaigns();
        setCampaigns(updatedCampaigns.map(c => ({
          id: c.publicKey.toBase58(),
          name: c.account.name,
          description: c.account.description,
          targetAmount: c.account.targetAmount.toNumber(),
          amountCollected: c.account.amountCollected.toNumber()
        })));
      } catch (error) {
        console.error("捐款失败:", error);
        alert("捐款失败,请检查控制台获取详细信息。");
      }
    }
  };

  if (loading) {
    return <div className="text-white text-center">加载中...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">众筹活动列表</h1>
      <CampaignList campaigns={campaigns} onDonate={handleDonate} />
    </div>
  );
};

export default CampaignListPage;