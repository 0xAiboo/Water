import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-6">欢迎来到 Solana 众筹平台</h1>
      <p className="text-xl text-gray-300 mb-8">在这里,您可以创建自己的众筹活动或支持他人的项目</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">创建活动</h2>
          <p className="text-gray-300 mb-4">有一个好点子?创建您自己的众筹活动并获得支持!</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            开始创建
          </button>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">浏览活动</h2>
          <p className="text-gray-300 mb-4">查看并支持社区中的其他众筹项目</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            浏览活动
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;