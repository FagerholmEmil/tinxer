import React from 'react'

const PaperItem = ({ title, authors }: { title: string; authors: string }) => (
    <div className="bg-gray-200 p-4 mb-2 rounded-lg shadow-sm">
        <span className="text-lg font-medium">{title}</span>
        <span className="text-sm text-gray-600 block mt-1">{authors}</span>
        <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
            Read More
        </button>
    </div>
)

const Papers = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 w-[80vw]">
            <h1 className="text-3xl font-bold text-center mb-4">Liked Papers</h1>
            <div>
                <PaperItem title="Attention is all you need" authors="Vaswani et al." />
                <PaperItem title="The Annotated Transformer" authors="Rush et al." />
                <PaperItem title="The First Law of Complexodynamics" authors="Wolfram" />
                <PaperItem title="Pointer Networks" authors="Vinyals et al." />
                <PaperItem title="ImageNet Classification with Deep Convolutional Neural Networks" authors="Krizhevsky et al." />
                <PaperItem title="GPipe: Easy Scaling with Micro-Batch Pipeline Parallelism" authors="Huang et al." />
                <PaperItem title="Deep Residual Learning for Image Recognition" authors="He et al." />
                <PaperItem title="A Tutorial Introduction to the Minimum Description Length Principle" authors="Grünwald" />
                <PaperItem title="Scaling Laws for Neural Language Models" authors="Kaplan et al." />
            </div>
        </div>
    )
}

export default Papers