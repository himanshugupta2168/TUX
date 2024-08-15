import editorJsHtml from "editorjs-html";
import Footer from "./Footer";
import { useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


// Custom renderers for additional block types
interface TableRow {
  cells: string[];
}

interface TableBlock {
  data: {
    withHeadings: boolean;
    content: TableRow[];
  };
}

const customRenderers = {
  table: (block: TableBlock) => {
    const { withHeadings, content } = block.data;
    const rows = content
      .map((row, rowIndex: any) => {
        const cells = row
          .map((cell: any) => `<td class="border px-4 py-2">${cell}</td>`)
          .join("");
        return withHeadings && rowIndex === 0
          ? `<tr class="border border-gray-200"><th>${cells}</th></tr>`
          : `<tr class="border border-gray-200">${cells}</tr>`;
      })
      .join("");
    return `<table class="w-full border-collapse border border-gray-200 my-4">${rows}</table>`;
  },
  list: (block: any) => {
    // Determine the tag based on the list style
    const tag = block.data.style === "ordered" ? "ol" : "ul";

    // Create list items with conditional classes
    const items = block.data.items
      .map(
        (item) =>
          `<li class="${
            tag === "ul" ? "list-disc" : "list-decimal"
          }">${item}</li>`
      )
      .join("");

    // Return the list with the appropriate class
    return `<${tag} class="list-inside list-${block.data.style}">${items}</${tag}>`;
  },

  code: (block: any) => {
    const { code } = block.data;
    return `<pre class="bg-gray-700 p-4 rounded my-8"><code>${code}</code></pre>`;
  },
  // Add any other custom renderers as needed
};

// Initialize editorJsHtml with custom renderers
const editorJsParser = editorJsHtml(customRenderers);

interface fullBlog {
  id: string;
  title: string;
  content: any;
  publishedDate: string;
  author: string;
}

// main returned function

function FullBlog({ id, title, content, publishedDate, author }: fullBlog) {
  const monthMap = useMemo(() => {
    const months = new Map([
      [1, "January"],
      [2, "February"],
      [3, "March"],
      [4, "April"],
      [5, "May"],
      [6, "June"],
      [7, "July"],
      [8, "August"],
      [9, "September"],
      [10, "October"],
      [11, "November"],
      [12, "December"],
    ]);
    return months;
  }, []);
  const dateString = publishedDate?.split("T")[0];
  const date = dateString ? new Date(dateString) : null;
  const month =
    date && monthMap.get((date?.getMonth() + 1) % 12)?.substring(0, 3);
  const year = date?.getFullYear();
  const pDate = date?.getDate();
  let htmlString = "";
  try {
    const html = editorJsParser.parse(content);
    htmlString = html.join("");
  } catch (error) {
    console.error("Failed to parse content:", error);
    htmlString = "<p>Error loading content.</p>";
  }

  return (
    <div className="py-16 bg-neutral-950 text-white">
      <div className="min-h-screen max-w-3xl mx-auto p-6">
        <Link to={"/blogs"} className="flex gap-3 items-center hover:text-slate-400  max-w-[100px]">
        <FaArrowLeft />
          Go Back</Link>
        <img src="/EditorDemo.png" alt=""  className="w-full h-1/2 my-8"/>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex gap-4 items-center my-8">
          <div className="w-[40px] h-[40px] bg-slate-600 text-white rounded-full text-center text-[24px]">
            {author.substring(0, 1) || "Anonymous"}
          </div>
          <div>
            <p className="lg:text-[18px] font-semibold">{author}</p>
            <p className="text-sm text-gray-500">
              {month} {pDate}, {year}
            </p>
          </div>
        </div>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}

export default FullBlog;
