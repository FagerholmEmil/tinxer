import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import CustomPDFViewer from "./CustomPDFViewer";

import Link from "next/link";
import { saveLikedPdf } from "@/app/utils/pdfUtils";
import { Paper } from "./Paper";
import { useUser } from "@/app/login/useUser";
import { runAI } from "./ai";
import { useSettingsContext } from "./providers";

const parseXMLPapers = (xml: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");

  const entries = xmlDoc.getElementsByTagName("entry");
  const parsedPapers: Paper[] = Array.from(entries).map((entry) => ({
    name: entry.getElementsByTagName("title")[0].textContent || "",
    summary: entry.getElementsByTagName("summary")[0].textContent || "",
    pdfUrl:
      entry.querySelector('link[title="pdf"]')?.getAttribute("href") || "",
  }));

  return parsedPapers;
};

const usePapers = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const { topic } = useSettingsContext();

  useEffect(() => {
    runAI(
      "Given the following topics, respond only with a combined search query that fits with this. Nothing else. just the search query. Max 280 characters. ",
      topic.join("\n"),
    )
      .then((res) => res?.trim())
      .then((t) =>
        fetch(
          `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(t || "Machine learning")}&start=0&max_results=20`,
        ),
      )
      .then((response) => response.text())
      .then((data) => parseXMLPapers(data))
      .then((papers) => setPapers(papers));
  }, []);

  return papers;
};

const TinderCards: React.FC = () => {
  const papers = usePapers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ci = (papers.length ?? 1) - 1 - currentIndex;

  const user = useUser();

  const likePaper = (paper: Paper) => {
    saveLikedPdf(paper, user!.id);
  };

  const onSwipe = (direction: string) => {
    setCurrentIndex((prev) => prev + 1);
    if (direction === "right") {
      likePaper(papers[ci]);
      return;
    }
    console.log("You swiped: " + direction);
    // open the pdf in new tab
  };

  const onCardLeftScreen = (name: string) => {
    console.log(name + " left the screen");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[300px] h-[80vh] mt-10">
        {papers.map((paper) => (
          <TinderCard
            key={paper.name}
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen(paper.name)}
            preventSwipe={["up", "down"]}
            className="select-none absolute w-full h-full bg-white flex flex-col  items-center"
          >
            <h1 className="p-4 pt-2 pb-2 font-bold">{paper.name}</h1>
            <p className="px-4 text-xs">{paper.summary}</p>
            <div className="w-full rounded-[20px] bg-white overflow-hidden">
              <div className="flex items-start justify-center overflow-y-auto h-full">
                <CustomPDFViewer pdfUrls={[paper.pdfUrl]} />
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 flex space-x-4 flex-row items-center justify-center">
        {papers[ci] && (
          <Link
            href={papers[ci]?.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-red-400 rounded-full p-3 shadow-lg text-nowrap text-white">
              Read More
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TinderCards;
