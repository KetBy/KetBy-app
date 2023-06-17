import DeutschJozsaThumbnail from "../../public/assets/textbook/deutsch-jozsa-algorithm-thumbnail.png";
import GroverThumbnail from "../../public/assets/textbook/grover-algorithm-thumbnail.png";

const articles = [
  {
    title: "The Deutsch-Jozsa quantum algorithm",
    path: "/textbook/the-deutsch-jozsa-algorithm",
    thumbnail: DeutschJozsaThumbnail.src,
    description: "From O(2^n) to O(1) using quantum speedup.",
    id: "dja",
  },
  {
    title: "Grover's quantum algorithm",
    path: "/textbook/grover-algorithm",
    thumbnail: GroverThumbnail.src,
    description: "From O(2^n) to O(1) using quantum speedup.",
    id: "ga",
  },
];

export const articlesMap = () => {
  let res = {};
  articles.map((article, index) => {
    res[article.id] = article;
  });
  return res;
};

export default articles;
