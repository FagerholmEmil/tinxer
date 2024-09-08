"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Article {
  title: string;
  authors: string[];
  summary: string;
  pdfLink: string;
}

const ArxivFetcher: React.FC = () => {
  const [topic, setTopic] = useState("physics");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArxivData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/arxiv-proxy?topic=${topic}`);
        const data = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        const entries = xmlDoc.getElementsByTagName("entry");
        const parsedArticles: Article[] = Array.from(entries).map((entry) => ({
          title: entry.getElementsByTagName("title")[0].textContent || "",
          authors: Array.from(entry.getElementsByTagName("author")).map(
            (author) =>
              author.getElementsByTagName("name")[0].textContent || "",
          ),
          summary: entry.getElementsByTagName("summary")[0].textContent || "",
          pdfLink:
            entry.getElementsByTagName("link")[1].getAttribute("href") || "",
        }));

        setArticles(parsedArticles);
      } catch (error) {
        console.error("Error fetching arXiv data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArxivData();
  }, [topic]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">arXiv Articles: {topic}</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <li key={index} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600">
                Authors: {article.authors.join(", ")}
              </p>
              <p className="mt-2">{article.summary.substring(0, 200)}...</p>
              <a
                href={article.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArxivFetcher;
