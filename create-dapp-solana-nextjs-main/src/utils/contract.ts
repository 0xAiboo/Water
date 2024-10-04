import * as anchor from '@project-serum/anchor';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import idl from './crowdfunding.json';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

const programID = new PublicKey('74GuVpDJ9NPQjTMexRn39g3jHYmAtESXAsugpRjKimuY');
const network = clusterApiUrl('devnet');
const opts: any = {
  preflightCommitment: "processed"
};

export const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const a: any = window
  const provider = new anchor.AnchorProvider(
    connection,
    a.solana,
    opts,
  );
  return provider;
};

export const getProgram = () => {
  const provider = getProvider();
  // 导入 IDL 文件
  const program = new anchor.Program(idl as any, programID, provider);
  return program;
};
// export const createCampaign = async (activityName: string, activityDescription: string, targetAmount: number) => {
//   const wallet = useAnchorWallet();
//   if (!wallet) {
//     throw new Error('请连接钱包');
//   }

//   const connection = new Connection('https://api.devnet.solana.com');
//   const program = getProgram();
//   const provider = getProvider();

//   try {
//     // 生成活动账户的公钥
//     const [activityPda] = await PublicKey.findProgramAddress(
//       [Buffer.from('activity'), wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     // 创建活动
//     const tx = await program.methods.createCampaign(activityName, activityDescription, new anchor.BN(targetAmount))
//       .accounts({
//         activity: activityPda,
//         user: wallet.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .rpc();

//     console.log('活动创建成功，交易 ID:', tx);
//   } catch (error) {
//     console.error('创建活动失败:', error);
//     // 处理错误，例如显示给用户
//   }
// }
export const createCampaign = async (name: string, description: string, targetAmount: number) => {
  const program = getProgram();
  const provider = getProvider();
  const [campaign] = await PublicKey.findProgramAddress(
    [Buffer.from("campaign"), provider.wallet.publicKey.toBuffer()],
    program.programId
  );
  await program.methods.createCampaign(name, description, new anchor.BN(targetAmount))
    .accounts({
      campaign,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

  return campaign;
};

export const donate = async (campaign: PublicKey, amount: number) => {
  const program = getProgram();
  const provider = getProvider();

  await program.methods.donate(new anchor.BN(amount))
    .accounts({
      campaign,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
};

export const withdraw = async (campaign: PublicKey) => {
  const program = getProgram();
  const provider = getProvider();

  await program.methods.withdraw()
    .accounts({
      campaign,
      user: provider.wallet.publicKey,
    })
    .rpc();
};

export const fetchCampaigns = async () => {
  const program = getProgram();
  const campaigns = await program.account.campaign.all();
  return campaigns;
};