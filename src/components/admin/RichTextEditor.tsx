"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Code
} from "lucide-react";
import { clsx } from "clsx";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuButton = ({ onClick, isActive, disabled, children }: any) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={clsx(
            "p-2 rounded-lg transition-all",
            isActive
                ? "bg-primary-100 text-primary-700 font-bold shadow-sm border border-primary-200"
                : "text-slate-500 hover:bg-slate-100 border border-transparent"
        )}
    >
        {children}
    </button>
);

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Image.configure({ inline: true }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-slate max-w-none focus:outline-none min-h-[400px] p-8",
            },
        }
    });

    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt("URL");
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt("Image URL");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="w-full border border-slate-200 rounded-[2rem] bg-white overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-3 border-b border-slate-100 bg-slate-50/50">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                >
                    <Bold className="w-5 h-5" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                >
                    <Italic className="w-5 h-5" />
                </MenuButton>
                <div className="w-px h-6 bg-slate-200 mx-1" />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                >
                    <Heading1 className="w-5 h-5" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                >
                    <Heading2 className="w-5 h-5" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive("heading", { level: 3 })}
                >
                    <Heading3 className="w-5 h-5" />
                </MenuButton>
                <div className="w-px h-6 bg-slate-200 mx-1" />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                >
                    <List className="w-5 h-5" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                >
                    <ListOrdered className="w-5 h-5" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive("codeBlock")}
                >
                    <Code className="w-5 h-5" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                >
                    <Quote className="w-5 h-5" />
                </MenuButton>
                <div className="w-px h-6 bg-slate-200 mx-1" />
                <MenuButton onClick={addLink} isActive={editor.isActive("link")}>
                    <LinkIcon className="w-5 h-5" />
                </MenuButton>
                <MenuButton onClick={addImage}>
                    <ImageIcon className="w-5 h-5" />
                </MenuButton>
                <div className="w-px h-6 bg-slate-200 mx-1" />
                <MenuButton onClick={() => editor.chain().focus().undo().run()}>
                    <Undo className="w-5 h-5" />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().redo().run()}>
                    <Redo className="w-5 h-5" />
                </MenuButton>
            </div>

            {/* Content */}
            <EditorContent editor={editor} />
        </div>
    );
}
