import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import Delimiter from "@editorjs/delimiter";
// import Table from "@editorjs/table";
import List from "@editorjs/list";
// @ts-ignore
import Quote from '@editorjs/quote';
//@ts-ignore
import Table from "@editorjs/table"
//@ts-ignore
import Delimiter from "@editorjs/delimiter"
// @ts-ignore
import ImageTool from "@editorjs/image";
//@ts-ignore
import CodeTool from '@editorjs/code';
import axios from "axios";
import "./../assets/Editor.css"
import EditorToolbar from "./CustomToolbar";

interface Props{
  data:{
    title:string, 
    content:any ,
    published?:boolean,
  },
  setData:any
}

const EditorComponent = ({ setData}:Props) => {
  const editorInstance = useRef<EditorJS | null>(null);

  const initializeEditor = async () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        quote:Quote,
        delimiter:Delimiter,
        table:Table,
        list:List,
        code:CodeTool,
        image: {
          //@ts-ignore
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                try {
                  const formData = new FormData();
                  formData.append("file", file);

                  const response = await axios.post(
                    `${import.meta.env.VITE_URL}files/upload-via-file`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );

                  if (response.data.success === 1) {
                    return {
                      success: 1,
                      file: {
                        url: response.data.imageUrl,
                      },
                    };
                  } else {
                    console.error("Upload failed:", response.data.message);
                    return {
                      success: 0,
                      message: response.data.message || "Failed to upload image.",
                    };
                  }
                } catch (error:any) {
                  console.error("File upload failed:", error);
                  return {
                    success: 0,
                    message: error.message || "File upload failed",
                  };
                }
              },
              async uploadByUrl(url: string) {
                try {
                  const response = await axios.post(
                    `${import.meta.env.VITE_URL}files/upload-via-url`,
                    { url },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (response.data.success === 1) {
                    return {
                      success: 1,
                      file: {
                        url: response.data.imageUrl,
                      },
                    };
                  } else {
                    console.error("Upload by URL failed:", response.data.message);
                    return {
                      success: 0,
                      message: response.data.message || "Failed to upload image by URL.",
                    };
                  }
                } catch (error:any) {
                  console.error("Upload by URL failed:", error);
                  return {
                    success: 0,
                    message: error.message || "Upload by URL failed",
                  };
                }
              },
            },
          },
          inlineToolbar: true,
        },
      },
      placeholder:"Start typing your story....",
      inlineToolbar: true,
      onReady: () => {
        editorInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        const content = await editor.save();
        setData((prev:any)=>({
          ...prev, 
          content:content
        }));
      },
    });
  };


  const handleToolSelect = (toolName:any, toolConfig={})=>{
    if (editorInstance.current){
      const block= {
        type:toolName, 
        data:toolConfig,
      }
      editorInstance.current.blocks.insert(block.type, block.data);
    }
  };

  useEffect(() => {
    if (editorInstance.current === null) {
      initializeEditor();
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="editor-container flex flex-col items-start w-full p-4 bg-neutral-950">
      <EditorToolbar onToolSelect={handleToolSelect} />
      <div id="editorjs" className="text-white w-full border rounded-lg"></div>
    </div>
  );
};

export default EditorComponent;
