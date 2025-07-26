import React, { useState, useRef } from "react";
import { FaBold, FaItalic, FaList } from "react-icons/fa";

// Dropdown item component
const DropdownItem = ({ label, shortcut }) => (
  <li className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <span>{label}</span>
    {shortcut && <span className="text-gray-500">{shortcut}</span>}
  </li>
);

// Divider line
const Divider = () => <li className="border-t border-gray-200 my-1" />;

// Dropdown menu component
const DropdownMenu = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-black text-sm font-medium text-gray-700"
      >
        {title}
      </button>

      {open && (
        <div className="absolute top-6 left-0 w-64 bg-white border border-gray-300 shadow-lg rounded z-50">
          <ul className="text-sm text-gray-800 py-1">
            {items.map((item, index) =>
              item === "divider" ? (
                <Divider key={index} />
              ) : (
                <DropdownItem
                  key={index}
                  label={item.label}
                  shortcut={item.shortcut}
                />
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// Custom Heading Dropdown
const HeadingDropdown = ({ onApplyHeading }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Subtitle");

  const headingOptions = [
    { label: "Title", className: "text-2xl font-bold", tag: "h1" },
    { label: "Subtitle", className: "text-xl font-semibold", tag: "h2" },
    { label: "Heading", className: "text-lg font-medium", tag: "h3" },
    { label: "Subheading", className: "text-base font-medium", tag: "h4" },
    { label: "Section", className: "text-base", tag: "h5" },
    { label: "Subsection", className: "text-sm", tag: "h6" },
    { label: "Body", className: "text-sm text-gray-700", tag: "p" },
  ];

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm border border-gray-300 px-3 py-1 rounded bg-white hover:bg-gray-50"
      >
        {selected}
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-48 bg-white shadow-lg rounded border border-gray-200 py-2">
          {headingOptions.map((item) => (
            <li
              key={item.label}
              onClick={() => {
                setSelected(item.label);
                setOpen(false);
                onApplyHeading(item.tag);
              }}
              className={`px-4 py-1 cursor-pointer hover:bg-gray-100 ${
                selected === item.label
                  ? "bg-gray-100 border-l-2 border-blue-500"
                  : ""
              }`}
            >
              <span className={item.className}>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// List dropdown placeholder (non-functional yet)
const ListDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm px-2 py-1 hover:bg-gray-200 rounded"
      >
        <FaList />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-40 bg-white shadow-lg rounded border border-gray-200 py-2">
          <li className="px-4 py-1 cursor-pointer hover:bg-gray-100">Bulleted list</li>
          <li className="px-4 py-1 cursor-pointer hover:bg-gray-100">Numbered list</li>
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const contentRef = useRef(null);

  // Apply bold, italic etc
  const applyCommand = (command) => {
    contentRef.current?.focus();
    document.execCommand(command, false, null);
  };

  const applyHeading = (tag) => {
    contentRef.current?.focus();
    document.execCommand("formatBlock", false, tag);
  };

  const fileItems = [
    { label: "New tab", shortcut: "Ctrl+N" },
    { label: "New window", shortcut: "Ctrl+Shift+N" },
    { label: "New Mark-down tab" },
    { label: "Open", shortcut: "Ctrl+O" },
    { label: "Recent ▸" },
    "divider",
    { label: "Save", shortcut: "Ctrl+S" },
    { label: "Save as", shortcut: "Ctrl+Shift+S" },
    { label: "Save all", shortcut: "Ctrl+Alt+S" },
    "divider",
    { label: "Page setup" },
    { label: "Print", shortcut: "Ctrl+P" },
    "divider",
    { label: "Close tab", shortcut: "Ctrl+W" },
    { label: "Close window", shortcut: "Ctrl+Shift+W" },
    { label: "Exit" },
  ];

  const editItems = [
    { label: "Undo", shortcut: "Ctrl+Z" },
    { label: "Redo", shortcut: "Ctrl+Y" },
    "divider",
    { label: "Cut", shortcut: "Ctrl+X" },
    { label: "Copy", shortcut: "Ctrl+C" },
    { label: "Paste", shortcut: "Ctrl+V" },
    "divider",
    { label: "Find", shortcut: "Ctrl+F" },
    { label: "Replace", shortcut: "Ctrl+H" },
  ];

  const viewItems = [
    { label: "Zoom" },
    { label: "Status bar" },
    { label: "Word wrap" },
    { label: "Markdown" },
  ];

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 bg-gray-100 border-b gap-2 relative">
        {/* Menus */}
        <div className="flex gap-4 text-sm font-medium text-gray-700">
          <DropdownMenu title="File" items={fileItems} />
          <DropdownMenu title="Edit" items={editItems} />
          <DropdownMenu title="View" items={viewItems} />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 text-gray-700">
          <HeadingDropdown onApplyHeading={applyHeading} />
          <ListDropdown />
          <button
            className="font-bold text-base hover:text-black"
            onClick={() => applyCommand("bold")}
          >
            <FaBold />
          </button>
          <button
            className="italic text-base hover:text-black"
            onClick={() => applyCommand("italic")}
          >
            <FaItalic />
          </button>
        </div>
      </div>

      {/* Editable Content */}
      <div className="p-8">
        <div
          contentEditable
          ref={contentRef}
          suppressContentEditableWarning={true}
          className="min-h-[600px] w-full border border-gray-300 rounded-lg p-4 bg-white shadow-sm text-sm font-normal text-gray-800 leading-relaxed focus:outline-none"
        >
          Start typing here...
        </div>
      </div>
    </>
  );
};

export default App;
