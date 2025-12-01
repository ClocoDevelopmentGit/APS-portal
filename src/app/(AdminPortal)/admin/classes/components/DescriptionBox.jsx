"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconList,
  IconListNumbers,
  IconQuote,
  IconCode,
  IconLink,
} from "@tabler/icons-react";

const EditorContainer = styled(Box)({
  border: "1px solid #E0E0E0",
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "20px",
  "&:hover": {
    borderColor: "#AE9964",
  },
  "&:focus-within": {
    borderColor: "#AE9964",
    borderWidth: "2px",
  },
});

const Toolbar = styled(Box)({
  display: "flex",
  gap: "4px",
  padding: "8px",
  backgroundColor: "#FAFAFA",
  borderBottom: "1px solid #E0E0E0",
  flexWrap: "wrap",
});

const ToolbarButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  padding: "6px",
  borderRadius: "4px",
  color: active ? "#AE9964" : "#666666",
  backgroundColor: active ? "#FEF7EA" : "transparent",
  "&:hover": {
    backgroundColor: "#FEF7EA",
    color: "#AE9964",
  },
}));

const EditorWrapper = styled(Box)({
  "& .ProseMirror": {
    minHeight: "80px",
    padding: "0px 14px",
    fontSize: "13px",
    color: "#181818",
    fontFamily: "var(--font-inter)",
    outline: "none",
    "& p.is-editor-empty:first-of-type::before": {
      content: "attr(data-placeholder)",
      float: "left",
      color: "#757575",
      pointerEvents: "none",
      height: 0,
    },
    "& h1": {
      fontSize: "2em",
      fontWeight: 700,
      marginTop: "0.67em",
      marginBottom: "0.67em",
    },
    "& h2": {
      fontSize: "1.5em",
      fontWeight: 700,
      marginTop: "0.75em",
      marginBottom: "0.75em",
    },
    "& h3": {
      fontSize: "1.17em",
      fontWeight: 700,
      marginTop: "0.83em",
      marginBottom: "0.83em",
    },
    "& ul, & ol": {
      paddingLeft: "1.5em",
      marginTop: "0.5em",
      marginBottom: "0.5em",
    },
    "& blockquote": {
      borderLeft: "4px solid #E0E0E0",
      paddingLeft: "1em",
      marginLeft: 0,
      color: "#666666",
    },
    "& code": {
      backgroundColor: "#F5F5F5",
      padding: "0.2em 0.4em",
      borderRadius: "3px",
      fontSize: "0.9em",
    },
    "& pre": {
      backgroundColor: "#F5F5F5",
      padding: "1em",
      borderRadius: "8px",
      overflowX: "auto",
      "& code": {
        backgroundColor: "transparent",
        padding: 0,
      },
    },
    "& a": {
      color: "#AE9964",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
});

const DescriptionBox = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || "Enter course description...",
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <EditorContainer>
      <Toolbar>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          size="small"
        >
          <IconBold size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          size="small"
        >
          <IconItalic size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          size="small"
        >
          <IconStrikethrough size={18} />
        </ToolbarButton>
        <Box
          sx={{ width: "1px", height: "24px", bgcolor: "#E0E0E0", mx: 0.5 }}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          size="small"
        >
          <IconList size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          size="small"
        >
          <IconListNumbers size={18} />
        </ToolbarButton>
        <Box
          sx={{ width: "1px", height: "24px", bgcolor: "#E0E0E0", mx: 0.5 }}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          size="small"
        >
          <IconQuote size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          size="small"
        >
          <IconCode size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={addLink}
          active={editor.isActive("link")}
          size="small"
        >
          <IconLink size={18} />
        </ToolbarButton>
      </Toolbar>
      <EditorWrapper>
        <EditorContent editor={editor} />
      </EditorWrapper>
    </EditorContainer>
  );
};

export default DescriptionBox;
