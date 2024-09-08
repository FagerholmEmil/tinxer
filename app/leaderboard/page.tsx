import React from 'react'

const LeaderboardItem = ({ title, votes }: { title: string; votes: number }) => (
    <div className="bg-gray-200 p-4 mb-2 flex justify-between items-center rounded-lg shadow-sm">
        <span className="text-lg font-medium">{title}</span>
        <div className="flex flex-col items-center">
            <button className="text-xs hover:text-blue-500">▲</button>
            <span className="text-lg font-bold my-0.5">{votes}k</span>
            <button className="text-xs hover:text-red-500">▼</button>
        </div>
    </div>
)

const Leaderboard = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 w-[80vw]">
            <h1 className="text-3xl font-bold text-center mb-4">Leaderboard</h1>
            <div className="flex justify-center space-x-2 mb-4">
                <button className="bg-black text-white px-4 py-2 rounded">AI</button>
                <button className="bg-white border border-gray-300 px-4 py-2 rounded">Physics</button>
                <button className="bg-white border border-gray-300 px-4 py-2 rounded">Math</button>
            </div>
            <div>
                <LeaderboardItem title="Attention is all you need" votes={10} />
                <LeaderboardItem title="The Annotated Transformer" votes={10} />
                <LeaderboardItem title="The First Law of Complexodynamics" votes={10} />
                <LeaderboardItem title="Pointer Networks" votes={10} />
                <LeaderboardItem title="ImageNet Classification with Deep Convolutional Neural Networks" votes={10} />
                <LeaderboardItem title="GPipe: Easy Scaling with Micro-Batch Pipeline Parallelism" votes={10} />
                <LeaderboardItem title="ImageNet Classification with Deep Convolutional Neural Networks" votes={10} />
                <LeaderboardItem title="Deep Residual Learning for Image Recognition" votes={10} />
                <LeaderboardItem title="A Tutorial Introduction to the Minimum Description Length Principle" votes={10} />
                <LeaderboardItem title="Scaling Laws for Neural Language Models" votes={10} />
            </div>
        </div>
    )
}

export default Leaderboard