import React from 'react'

const LeaderboardItem = ({ title, votes, rank }: { title: string; votes: number; rank: number }) => (
    <div className="bg-white p-4 mb-3 flex items-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <span className="text-2xl font-bold text-gray-400 mr-4">{rank}</span>
        <div className="flex-grow">
            <span className="text-lg font-medium text-gray-800">{title}</span>
        </div>
        <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600 mr-2">{votes}k</span>
            <div className="flex flex-col">
                <button className="text-gray-400 hover:text-blue-500 transition-colors duration-200">▲</button>
                <button className="text-gray-400 hover:text-red-500 transition-colors duration-200">▼</button>
            </div>
        </div>
    </div>
)

const Leaderboard = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 w-[90vw]">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Leaderboard</h1>
            <div className="flex justify-center space-x-3 mb-8">
                <button className="bg-red-400 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-red-700 transition-colors duration-300">AI</button>
                <button className="bg-white text-gray-700 px-6 py-2 rounded-full font-medium shadow-md hover:bg-gray-100 transition-colors duration-300">Physics</button>
                <button className="bg-white text-gray-700 px-6 py-2 rounded-full font-medium shadow-md hover:bg-gray-100 transition-colors duration-300">Math</button>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
                <LeaderboardItem title="Attention is all you need" votes={10} rank={1} />
                <LeaderboardItem title="The Annotated Transformer" votes={8} rank={2} />
                <LeaderboardItem title="The First Law of Complexodynamics" votes={6} rank={3} />
                <LeaderboardItem title="Pointer Networks" votes={10} rank={4} />
                <LeaderboardItem title="ImageNet Classification with Deep Convolutional Neural Networks" votes={4} rank={5} />
                <LeaderboardItem title="GPipe: Easy Scaling with Micro-Batch Pipeline Parallelism" votes={2} rank={6} />
                <LeaderboardItem title="ImageNet Classification with Deep Convolutional Neural Networks" votes={2} rank={7} />
                <LeaderboardItem title="Deep Residual Learning for Image Recognition" votes={2} rank={8} />
                <LeaderboardItem title="A Tutorial Introduction to the Minimum Description Length Principle" votes={1} rank={9} />
                <LeaderboardItem title="Scaling Laws for Neural Language Models" votes={1} rank={10} />
            </div>
        </div>
    )
}

export default Leaderboard