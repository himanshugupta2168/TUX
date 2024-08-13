import React from "react";

interface EditorToolbarProps {
  onToolSelect: (toolName: string, toolConfig?: any) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onToolSelect }) => {
  return (
    <div className="hidden md:flex space-x-2 mb-4">
      <button
        className="btn-tool text-white"
        onClick={() => onToolSelect("header", { level: 2 })}
      >
        Header
      </button>
      <button className="btn-tool text-white" onClick={() => onToolSelect("list")}>
        List
      </button>
      <button className="btn-tool text-white" onClick={() => onToolSelect("quote")}>
        Quote
      </button>
      <button className="btn-tool text-white" onClick={() => onToolSelect("delimiter")}>
        Delimiter
      </button>
      <button className="btn-tool text-white" onClick={() => onToolSelect("table")}>
        Table
      </button>
      <button className="btn-tool text-white" onClick={() => onToolSelect("image")}>
        Image
      </button>
      <button className="btn-tool text-white" onClick={() => onToolSelect("code")}>
        Code
      </button>
    </div>
  );
};

export default EditorToolbar;
