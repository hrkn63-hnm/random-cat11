import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";

interface CatCategory {
  id: number;
  name: string;
}

interface SearchCatImage {
  breeds: string[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const catImages: string[] = [
  "https://cdn2.thecatapi.com/images/bpc.jpg",
  "https://cdn2.thecatapi.com/images/eac.jpg",
  "https://cdn2.thecatapi.com/images/6qi.jpg",
];

interface IndexPageProps {
  initialCatImageUrl: string;
}

const randomCatImage = (): string => {
  const Index = Math.floor(Math.random() * catImages.length);
  return catImages[Index];
};

const fetchCatImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  return result[0];
};

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  };
  const noMeans=0;

  return (
    <div>
      <button onClick={handleClick}>今日のニャンコ</button>
      <div style={{ marginTop: 8 }}>
       <img src={catImageUrl} width={500} height="auto" />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
export default IndexPage;
