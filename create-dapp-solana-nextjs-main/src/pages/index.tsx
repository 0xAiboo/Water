import React from 'react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import Menu from 'components/Menu';
import CampaignListPage from './CampaignListPage';
import CreateCampaignPage from './CreateCampaignPage';
import HomePage from './HomePage';
import MyCampaignsPage from './MyCampaignsPage';

require('@solana/wallet-adapter-react-ui/styles.css');

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState('home');
  const wallets = [new PhantomWalletAdapter()];

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'browse':
        return <CampaignListPage />;
      case 'create':
        return <CreateCampaignPage />;
      case 'my-campaigns':
        return <MyCampaignsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    // <WalletProvider wallets={wallets} autoConnect>
    //   <WalletModalProvider>
        <div className="min-h-screen bg-gray-800">
          <Menu onNavigate={setCurrentPage} />
          <div className="container mx-auto px-4 py-8">
            {renderContent()}
          </div>
        </div>
    //   </WalletModalProvider>
    // </WalletProvider>
  );
};

export default App;