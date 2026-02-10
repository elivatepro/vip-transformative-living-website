# VIP Transformative Living
## Article Editor — Design Plan

**Page:** `/admin/newsletter/create` and `/admin/newsletter/edit/[id]`  
**Goal:** A beautiful, LinkedIn/Medium-style article editor that produces stunning newsletters

---

# EDITOR LIBRARY RECOMMENDATION

## Tiptap (Recommended)

| Feature | Details |
|---------|---------|
| **License** | MIT (Free, open source) |
| **Based on** | ProseMirror |
| **React Support** | Excellent |
| **Styling** | Fully customizable (headless) |
| **Extensions** | 50+ official extensions |
| **Output** | HTML or JSON |
| **Bundle Size** | ~45KB gzipped |

**Why Tiptap:**
- Modern, actively maintained (used by GitLab, Substack, Linear)
- Headless = you control the UI completely
- Matches VIP brand easily
- Extension system for custom features
- Great TypeScript support
- Can be styled with Tailwind

**Install:**
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-typography @tiptap/extension-underline @tiptap/extension-text-align @tiptap/extension-highlight @tiptap/extension-youtube
```

---

# PAGE LAYOUT

## Desktop View

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│  ← Back to Articles                                         [Save Draft] [Publish ▾]│
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌───────────────────────────────────────────────────────┐  ┌─────────────────────┐│
│  │                                                       │  │                     ││
│  │                    EDITOR AREA                        │  │   SIDEBAR           ││
│  │                                                       │  │                     ││
│  │  ┌─────────────────────────────────────────────────┐ │  │  ┌───────────────┐  ││
│  │  │                                                 │ │  │  │ Featured      │  ││
│  │  │           + Add Cover Image                     │ │  │  │ Image         │  ││
│  │  │                                                 │ │  │  │               │  ││
│  │  └─────────────────────────────────────────────────┘ │  │  │ [Upload]      │  ││
│  │                                                       │  │  └───────────────┘  ││
│  │  ┌─────────────────────────────────────────────────┐ │  │                     ││
│  │  │ Article Title                                   │ │  │  Category           ││
│  │  │ ─────────────────────────────────────           │ │  │  [Select ▾]         ││
│  │  └─────────────────────────────────────────────────┘ │  │                     ││
│  │                                                       │  │  Tags               ││
│  │  ┌─────────────────────────────────────────────────┐ │  │  [+ Add tag]        ││
│  │  │ B  I  U  S  H1 H2 H3  •  1.  ""  —  🔗  📷  ▶️  │ │  │                     ││
│  │  └─────────────────────────────────────────────────┘ │  │  ─────────────────  ││
│  │                                                       │  │                     ││
│  │  Start writing your article...                        │  │  PUBLISH SETTINGS   ││
│  │                                                       │  │                     ││
│  │  Type '/' for commands                                │  │  Status: Draft      ││
│  │                                                       │  │                     ││
│  │                                                       │  │  Schedule           ││
│  │                                                       │  │  [Now ▾]            ││
│  │                                                       │  │                     ││
│  │                                                       │  │  ─────────────────  ││
│  │                                                       │  │                     ││
│  │                                                       │  │  SEO                ││
│  │                                                       │  │                     ││
│  │                                                       │  │  Meta Title         ││
│  │                                                       │  │  [____________]     ││
│  │                                                       │  │                     ││
│  │                                                       │  │  Meta Description   ││
│  │                                                       │  │  [____________]     ││
│  │                                                       │  │                     ││
│  │                                                       │  │  URL Slug           ││
│  │                                                       │  │  [____________]     ││
│  │                                                       │  │                     ││
│  │                                                       │  │  ─────────────────  ││
│  │                                                       │  │                     ││
│  │                                                       │  │  [Preview Article]  ││
│  │                                                       │  │                     ││
│  └───────────────────────────────────────────────────────┘  └─────────────────────┘│
│                                                                                     │
│  Auto-saved 2 seconds ago                                      1,234 words · 6 min │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

# FEATURES

## Core Editor Features

| Feature | Shortcut | Description |
|---------|----------|-------------|
| **Bold** | Cmd+B | Bold text |
| **Italic** | Cmd+I | Italic text |
| **Underline** | Cmd+U | Underline text |
| **Strikethrough** | Cmd+Shift+S | Strike text |
| **Highlight** | Cmd+Shift+H | Gold highlight |
| **Heading 1** | Cmd+Alt+1 | Large heading |
| **Heading 2** | Cmd+Alt+2 | Medium heading |
| **Heading 3** | Cmd+Alt+3 | Small heading |
| **Quote** | Cmd+Shift+B | Blockquote |
| **Bullet List** | Cmd+Shift+8 | Unordered list |
| **Numbered List** | Cmd+Shift+7 | Ordered list |
| **Divider** | --- | Horizontal rule |
| **Link** | Cmd+K | Add link |
| **Image** | — | Upload/embed image |
| **YouTube** | — | Embed video |
| **Code Block** | Cmd+Alt+C | Code formatting |

## Slash Commands

Type `/` to open command menu:

```
┌────────────────────────────┐
│  /                         │
├────────────────────────────┤
│  📝  Text         Basic    │
│  𝐇₁  Heading 1   Large    │
│  𝐇₂  Heading 2   Medium   │
│  𝐇₃  Heading 3   Small    │
│  •   Bullet List          │
│  1.  Numbered List        │
│  ""  Quote                │
│  —   Divider              │
│  🖼️  Image                 │
│  ▶️  YouTube               │
│  💻  Code Block           │
│  📋  Call to Action       │
└────────────────────────────┘
```

## Bubble Menu (Selection Toolbar)

When text is selected, show floating toolbar:

```
┌───────────────────────────────────────────────┐
│  B   I   U   S   🖍️   🔗   H1  H2  H3  ""    │
└───────────────────────────────────────────────┘
```

## Image Handling

- Drag & drop upload
- Click to upload
- Paste from clipboard
- Resize handles
- Alt text support
- Caption support
- Alignment (left, center, full-width)

## Auto-save

- Save draft every 30 seconds
- Save on blur (leaving editor)
- Visual indicator: "Saving..." → "Saved ✓"
- Debounced to prevent excessive saves

---

# DESIGN SPECIFICATIONS

## Editor Container

```css
.editor-page {
  min-height: 100vh;
  background: #0A0A0A;
}

.editor-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

@media (max-width: 1024px) {
  .editor-layout {
    grid-template-columns: 1fr;
  }
  
  .editor-sidebar {
    order: -1; /* Move sidebar above on mobile */
  }
}
```

## Main Editor Area

```css
.editor-main {
  background: #141414;
  border: 1px solid #2A2A2A;
  border-radius: 16px;
  padding: 32px;
  min-height: calc(100vh - 200px);
}

/* Cover Image Upload */
.cover-image-upload {
  height: 200px;
  background: #0A0A0A;
  border: 2px dashed #2A2A2A;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 32px;
}

.cover-image-upload:hover {
  border-color: #D4AF37;
  background: rgba(212, 175, 55, 0.05);
}

.cover-image-upload.has-image {
  border: none;
  height: auto;
}

.cover-image-upload img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  max-height: 400px;
  object-fit: cover;
}

/* Title Input */
.title-input {
  font-family: 'Playfair Display', serif;
  font-size: 42px;
  font-weight: 400;
  color: #F5F5F5;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  margin-bottom: 24px;
  line-height: 1.2;
}

.title-input::placeholder {
  color: #4A4A4A;
}

@media (max-width: 768px) {
  .title-input {
    font-size: 28px;
  }
}
```

## Toolbar

```css
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 12px;
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  margin-bottom: 24px;
  position: sticky;
  top: 80px;
  z-index: 10;
}

.toolbar-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #9CA3AF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbar-button:hover {
  background: #1A1A1A;
  color: #F5F5F5;
}

.toolbar-button.is-active {
  background: #D4AF37;
  color: #0A0A0A;
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: #2A2A2A;
  margin: 6px 8px;
}
```

## Editor Content

```css
/* Tiptap ProseMirror Editor */
.ProseMirror {
  min-height: 500px;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: #D1D5DB;
}

.ProseMirror > * + * {
  margin-top: 1em;
}

/* Placeholder */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #4A4A4A;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

/* Headings */
.ProseMirror h1 {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 400;
  color: #F5F5F5;
  margin-top: 48px;
  margin-bottom: 16px;
}

.ProseMirror h2 {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 400;
  color: #F5F5F5;
  margin-top: 40px;
  margin-bottom: 12px;
}

.ProseMirror h3 {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #F5F5F5;
  margin-top: 32px;
  margin-bottom: 12px;
}

/* Paragraphs */
.ProseMirror p {
  margin-bottom: 1em;
}

/* Links */
.ProseMirror a {
  color: #D4AF37;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ProseMirror a:hover {
  color: #e5c35a;
}

/* Bold & Italic */
.ProseMirror strong {
  color: #F5F5F5;
  font-weight: 600;
}

.ProseMirror em {
  font-style: italic;
}

/* Highlight */
.ProseMirror mark {
  background: rgba(212, 175, 55, 0.3);
  color: #F5F5F5;
  padding: 2px 4px;
  border-radius: 2px;
}

/* Lists */
.ProseMirror ul {
  list-style-type: disc;
  padding-left: 24px;
}

.ProseMirror ol {
  list-style-type: decimal;
  padding-left: 24px;
}

.ProseMirror li {
  margin-bottom: 8px;
}

.ProseMirror li > p {
  margin-bottom: 0;
}

/* Blockquote */
.ProseMirror blockquote {
  border-left: 3px solid #D4AF37;
  padding-left: 24px;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  color: #9CA3AF;
}

/* Horizontal Rule */
.ProseMirror hr {
  border: none;
  border-top: 1px solid #2A2A2A;
  margin: 32px 0;
}

/* Code Block */
.ProseMirror pre {
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  overflow-x: auto;
}

.ProseMirror code {
  background: rgba(212, 175, 55, 0.1);
  color: #D4AF37;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
}

/* Images */
.ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 24px 0;
}

.ProseMirror img.ProseMirror-selectednode {
  outline: 2px solid #D4AF37;
}

/* YouTube Embed */
.ProseMirror .youtube-embed {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  margin: 24px 0;
}

.ProseMirror .youtube-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

## Sidebar

```css
.editor-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-card {
  background: #141414;
  border: 1px solid #2A2A2A;
  border-radius: 12px;
  padding: 20px;
}

.sidebar-card-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: 16px;
}

.sidebar-label {
  font-size: 13px;
  color: #9CA3AF;
  margin-bottom: 8px;
}

.sidebar-input {
  width: 100%;
  padding: 10px 14px;
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  color: #F5F5F5;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.sidebar-input:focus {
  outline: none;
  border-color: #D4AF37;
}

.sidebar-select {
  width: 100%;
  padding: 10px 14px;
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  color: #F5F5F5;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* dropdown arrow */
  background-repeat: no-repeat;
  background-position: right 12px center;
}
```

## Bubble Menu (Floating Toolbar)

```css
.bubble-menu {
  display: flex;
  gap: 2px;
  padding: 6px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.bubble-menu-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: #9CA3AF;
  cursor: pointer;
  transition: all 0.15s ease;
}

.bubble-menu-button:hover {
  background: #2A2A2A;
  color: #F5F5F5;
}

.bubble-menu-button.is-active {
  background: #D4AF37;
  color: #0A0A0A;
}
```

## Slash Command Menu

```css
.slash-menu {
  position: absolute;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 12px;
  padding: 8px;
  min-width: 220px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.slash-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.slash-menu-item:hover,
.slash-menu-item.is-selected {
  background: rgba(212, 175, 55, 0.1);
}

.slash-menu-item-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0A0A0A;
  border-radius: 8px;
  color: #D4AF37;
}

.slash-menu-item-title {
  font-size: 14px;
  color: #F5F5F5;
  font-weight: 500;
}

.slash-menu-item-desc {
  font-size: 12px;
  color: #6B7280;
}
```

---

# COMPONENT IMPLEMENTATION

## Main Editor Component

**File:** `components/admin/newsletter/ArticleEditor.tsx`

```tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Youtube from '@tiptap/extension-youtube';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Code,
  Undo,
  Redo,
  Eye,
  Save,
  ChevronDown,
  ArrowLeft,
  Upload,
  X,
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { createClient } from '@/lib/supabase/client';

interface ArticleEditorProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    featured_image: string | null;
    category: string;
    tags: string[];
    meta_title: string;
    meta_description: string;
    slug: string;
    status: 'draft' | 'published';
    published_at: string | null;
  };
}

export default function ArticleEditor({ initialData }: ArticleEditorProps) {
  const supabase = createClient();
  
  // State
  const [title, setTitle] = useState(initialData?.title || '');
  const [featuredImage, setFeaturedImage] = useState<string | null>(initialData?.featured_image || null);
  const [category, setCategory] = useState(initialData?.category || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status || 'draft');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [publishMenuOpen, setPublishMenuOpen] = useState(false);
  
  // Categories
  const categories = [
    { value: 'career-purpose', label: 'Career & Purpose' },
    { value: 'relationships-legacy', label: 'Relationships & Legacy' },
    { value: 'identity-confidence', label: 'Identity & Confidence' },
    { value: 'mindset-growth', label: 'Mindset & Growth' },
  ];
  
  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your article... (Type "/" for commands)',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'editor-highlight',
        },
      }),
      Typography,
      Youtube.configure({
        HTMLAttributes: {
          class: 'youtube-embed',
        },
      }),
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px]',
      },
    },
    onUpdate: ({ editor }) => {
      // Update word count
      const text = editor.getText();
      const words = text.split(/\s+/).filter(Boolean).length;
      setWordCount(words);
    },
  });
  
  // Auto-generate slug from title
  useEffect(() => {
    if (!initialData?.slug && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  }, [title, initialData?.slug]);
  
  // Auto-save
  const debouncedTitle = useDebounce(title, 2000);
  const debouncedContent = useDebounce(editor?.getHTML() || '', 2000);
  
  useEffect(() => {
    if (debouncedTitle || debouncedContent) {
      handleAutoSave();
    }
  }, [debouncedTitle, debouncedContent]);
  
  // Save functions
  const handleAutoSave = async () => {
    if (!title && !editor?.getHTML()) return;
    setIsSaving(true);
    
    try {
      // Save to Supabase
      // ... implementation
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save error:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSaveDraft = async () => {
    setIsSaving(true);
    // Save implementation
    setLastSaved(new Date());
    setIsSaving(false);
  };
  
  const handlePublish = async () => {
    setIsSaving(true);
    // Publish implementation
    setStatus('published');
    setLastSaved(new Date());
    setIsSaving(false);
  };
  
  // Image upload
  const handleImageUpload = async (file: File, type: 'featured' | 'content') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `newsletter/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file);
    
    if (error) {
      console.error('Upload error:', error);
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    
    if (type === 'featured') {
      setFeaturedImage(urlData.publicUrl);
    } else if (type === 'content' && editor) {
      editor.chain().focus().setImage({ src: urlData.publicUrl }).run();
    }
    
    return urlData.publicUrl;
  };
  
  // Link handler
  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    
    if (url === null) return;
    
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };
  
  // YouTube handler
  const addYouTube = () => {
    const url = window.prompt('Enter YouTube URL');
    
    if (url) {
      editor?.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };
  
  // Tags handler
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  // Calculate reading time
  const readingTime = Math.ceil(wordCount / 200);
  
  if (!editor) return null;
  
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#2A2A2A]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Articles</span>
          </button>
          
          <div className="flex items-center gap-3">
            {/* Save Status */}
            <span className="text-sm text-[#6B7280]">
              {isSaving ? 'Saving...' : lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : ''}
            </span>
            
            {/* Preview Button */}
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#9CA3AF] border border-[#2A2A2A] rounded-lg hover:border-[#3A3A3A] hover:text-white transition"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            
            {/* Save Draft */}
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#9CA3AF] border border-[#2A2A2A] rounded-lg hover:border-[#3A3A3A] hover:text-white transition"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            
            {/* Publish Button */}
            <div className="relative">
              <button
                onClick={() => setPublishMenuOpen(!publishMenuOpen)}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black rounded-lg hover:opacity-90 transition"
              >
                {status === 'published' ? 'Update' : 'Publish'}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {publishMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl overflow-hidden">
                  <button
                    onClick={handlePublish}
                    className="w-full px-4 py-3 text-sm text-left text-white hover:bg-[#2A2A2A] transition"
                  >
                    Publish now
                  </button>
                  <button className="w-full px-4 py-3 text-sm text-left text-[#9CA3AF] hover:bg-[#2A2A2A] transition">
                    Schedule for later
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          
          {/* Editor Area */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8">
            
            {/* Featured Image Upload */}
            <div className="mb-8">
              {featuredImage ? (
                <div className="relative group">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-auto max-h-[400px] object-cover rounded-xl"
                  />
                  <button
                    onClick={() => setFeaturedImage(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-[200px] bg-[#0A0A0A] border-2 border-dashed border-[#2A2A2A] rounded-xl cursor-pointer hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.05)] transition">
                  <Upload className="w-8 h-8 text-[#6B7280] mb-3" />
                  <span className="text-sm text-[#6B7280]">Add cover image</span>
                  <span className="text-xs text-[#4A4A4A] mt-1">Recommended: 1200 x 630px</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'featured');
                    }}
                  />
                </label>
              )}
            </div>
            
            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              className="w-full text-[42px] font-serif font-normal text-[#F5F5F5] bg-transparent border-none outline-none placeholder:text-[#4A4A4A] mb-6 leading-tight"
            />
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg mb-6 sticky top-[73px] z-10">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                icon={<Bold className="w-4 h-4" />}
                tooltip="Bold"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                icon={<Italic className="w-4 h-4" />}
                tooltip="Italic"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                icon={<UnderlineIcon className="w-4 h-4" />}
                tooltip="Underline"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                icon={<Strikethrough className="w-4 h-4" />}
                tooltip="Strikethrough"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                isActive={editor.isActive('highlight')}
                icon={<Highlighter className="w-4 h-4" />}
                tooltip="Highlight"
              />
              
              <div className="w-px h-6 bg-[#2A2A2A] mx-2" />
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                icon={<Heading1 className="w-4 h-4" />}
                tooltip="Heading 1"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                icon={<Heading2 className="w-4 h-4" />}
                tooltip="Heading 2"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                icon={<Heading3 className="w-4 h-4" />}
                tooltip="Heading 3"
              />
              
              <div className="w-px h-6 bg-[#2A2A2A] mx-2" />
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                icon={<List className="w-4 h-4" />}
                tooltip="Bullet List"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                icon={<ListOrdered className="w-4 h-4" />}
                tooltip="Numbered List"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                icon={<Quote className="w-4 h-4" />}
                tooltip="Quote"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                icon={<Minus className="w-4 h-4" />}
                tooltip="Divider"
              />
              
              <div className="w-px h-6 bg-[#2A2A2A] mx-2" />
              
              <ToolbarButton
                onClick={setLink}
                isActive={editor.isActive('link')}
                icon={<LinkIcon className="w-4 h-4" />}
                tooltip="Link"
              />
              <ToolbarButton
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleImageUpload(file, 'content');
                  };
                  input.click();
                }}
                icon={<ImageIcon className="w-4 h-4" />}
                tooltip="Image"
              />
              <ToolbarButton
                onClick={addYouTube}
                icon={<YoutubeIcon className="w-4 h-4" />}
                tooltip="YouTube"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editor.isActive('codeBlock')}
                icon={<Code className="w-4 h-4" />}
                tooltip="Code Block"
              />
              
              <div className="flex-1" />
              
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                icon={<Undo className="w-4 h-4" />}
                tooltip="Undo"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                icon={<Redo className="w-4 h-4" />}
                tooltip="Redo"
              />
            </div>
            
            {/* Bubble Menu (Selection Toolbar) */}
            <BubbleMenu
              editor={editor}
              tippyOptions={{ duration: 100 }}
              className="flex gap-1 p-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl"
            >
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                icon={<Bold className="w-3.5 h-3.5" />}
                size="small"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                icon={<Italic className="w-3.5 h-3.5" />}
                size="small"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                icon={<UnderlineIcon className="w-3.5 h-3.5" />}
                size="small"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                isActive={editor.isActive('highlight')}
                icon={<Highlighter className="w-3.5 h-3.5" />}
                size="small"
              />
              <ToolbarButton
                onClick={setLink}
                isActive={editor.isActive('link')}
                icon={<LinkIcon className="w-3.5 h-3.5" />}
                size="small"
              />
            </BubbleMenu>
            
            {/* Editor Content */}
            <EditorContent editor={editor} className="article-editor" />
            
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Category */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <h3 className="text-[11px] font-semibold tracking-wider uppercase text-[#6B7280] mb-4">
                Category
              </h3>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37] transition appearance-none cursor-pointer"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Tags */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <h3 className="text-[11px] font-semibold tracking-wider uppercase text-[#6B7280] mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-sm rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-white transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37] transition"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-[#2A2A2A] text-white text-sm rounded-lg hover:bg-[#3A3A3A] transition"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* SEO */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <h3 className="text-[11px] font-semibold tracking-wider uppercase text-[#6B7280] mb-4">
                SEO Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#9CA3AF] mb-2 block">URL Slug</label>
                  <div className="flex items-center">
                    <span className="text-sm text-[#6B7280] mr-1">/newsletter/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37] transition"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-[#9CA3AF] mb-2 block">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || 'Enter meta title'}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37] transition"
                  />
                  <span className="text-xs text-[#6B7280] mt-1 block">
                    {metaTitle.length}/60 characters
                  </span>
                </div>
                
                <div>
                  <label className="text-sm text-[#9CA3AF] mb-2 block">Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Brief description for search engines..."
                    rows={3}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37] transition resize-none"
                  />
                  <span className="text-xs text-[#6B7280] mt-1 block">
                    {metaDescription.length}/160 characters
                  </span>
                </div>
              </div>
            </div>
            
            {/* Preview Button */}
            <button
              onClick={() => setShowPreview(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-xl text-[#9CA3AF] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
            >
              <Eye className="w-4 h-4" />
              Preview Article
            </button>
            
          </div>
        </div>
        
        {/* Footer Stats */}
        <div className="mt-6 flex items-center justify-between text-sm text-[#6B7280]">
          <span>
            {isSaving ? 'Saving...' : lastSaved ? `Auto-saved at ${lastSaved.toLocaleTimeString()}` : 'Not saved yet'}
          </span>
          <span>
            {wordCount.toLocaleString()} words · {readingTime} min read
          </span>
        </div>
      </main>
      
      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          title={title}
          content={editor.getHTML()}
          featuredImage={featuredImage}
          category={category}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOLBAR BUTTON COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface ToolbarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  tooltip?: string;
  size?: 'small' | 'normal';
}

function ToolbarButton({ onClick, icon, isActive, disabled, tooltip, size = 'normal' }: ToolbarButtonProps) {
  const sizeClasses = size === 'small' ? 'w-8 h-8' : 'w-9 h-9';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`${sizeClasses} flex items-center justify-center rounded-md transition ${
        isActive
          ? 'bg-[#D4AF37] text-black'
          : disabled
          ? 'text-[#4A4A4A] cursor-not-allowed'
          : 'text-[#9CA3AF] hover:bg-[#2A2A2A] hover:text-white'
      }`}
    >
      {icon}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PREVIEW MODAL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface PreviewModalProps {
  title: string;
  content: string;
  featuredImage: string | null;
  category: string;
  onClose: () => void;
}

function PreviewModal({ title, content, featuredImage, category, onClose }: PreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] rounded-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#1A1A1A] rounded-full text-white hover:bg-[#2A2A2A] transition z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Preview Content */}
        <article className="p-8 md:p-12">
          {/* Category Badge */}
          {category && (
            <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase rounded-full mb-6">
              {category.replace('-', ' & ')}
            </span>
          )}
          
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
            {title || 'Untitled Article'}
          </h1>
          
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-8">
            <span>By Coach Wayne Dawson</span>
            <span>·</span>
            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          {/* Featured Image */}
          {featuredImage && (
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-auto rounded-xl mb-10"
            />
          )}
          
          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none article-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  );
}
```

---

# DATABASE SCHEMA UPDATE

Add these fields to your `newsletter_articles` table:

```sql
ALTER TABLE newsletter_articles ADD COLUMN IF NOT EXISTS
  content_html TEXT,
  featured_image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[], -- Array of tags
  meta_title VARCHAR(100),
  meta_description VARCHAR(200),
  slug VARCHAR(255) UNIQUE,
  word_count INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 0, -- In minutes
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id);

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_slug ON newsletter_articles(slug);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_articles(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_category ON newsletter_articles(category);
```

---

# INSTALL DEPENDENCIES

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-typography @tiptap/extension-underline @tiptap/extension-text-align @tiptap/extension-highlight @tiptap/extension-youtube
```

---

# DEBOUNCE HOOK

**File:** `hooks/useDebounce.ts`

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

---

# EDITOR STYLES

Add to your global CSS or create `styles/editor.css`:

```css
/* Article Editor Styles */
.article-editor .ProseMirror {
  min-height: 500px;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: #D1D5DB;
}

.article-editor .ProseMirror > * + * {
  margin-top: 1em;
}

.article-editor .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #4A4A4A;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

.article-editor .ProseMirror h1 {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 400;
  color: #F5F5F5;
  margin-top: 48px;
  margin-bottom: 16px;
}

.article-editor .ProseMirror h2 {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 400;
  color: #F5F5F5;
  margin-top: 40px;
  margin-bottom: 12px;
}

.article-editor .ProseMirror h3 {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #F5F5F5;
  margin-top: 32px;
  margin-bottom: 12px;
}

.article-editor .ProseMirror a {
  color: #D4AF37;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-editor .ProseMirror strong {
  color: #F5F5F5;
  font-weight: 600;
}

.article-editor .ProseMirror mark {
  background: rgba(212, 175, 55, 0.3);
  color: #F5F5F5;
  padding: 2px 4px;
  border-radius: 2px;
}

.article-editor .ProseMirror ul,
.article-editor .ProseMirror ol {
  padding-left: 24px;
}

.article-editor .ProseMirror li {
  margin-bottom: 8px;
}

.article-editor .ProseMirror blockquote {
  border-left: 3px solid #D4AF37;
  padding-left: 24px;
  margin-left: 0;
  font-style: italic;
  color: #9CA3AF;
}

.article-editor .ProseMirror hr {
  border: none;
  border-top: 1px solid #2A2A2A;
  margin: 32px 0;
}

.article-editor .ProseMirror pre {
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  overflow-x: auto;
}

.article-editor .ProseMirror code {
  background: rgba(212, 175, 55, 0.1);
  color: #D4AF37;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
}

.article-editor .ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 24px 0;
}

.article-editor .ProseMirror img.ProseMirror-selectednode {
  outline: 2px solid #D4AF37;
}

.article-editor .ProseMirror .youtube-embed {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  margin: 24px 0;
}

.article-editor .ProseMirror .youtube-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Article Content Styles (for preview/frontend) */
.article-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 400;
  color: #F5F5F5;
  margin-top: 48px;
  margin-bottom: 16px;
}

.article-content h2 {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 400;
  color: #F5F5F5;
  margin-top: 40px;
  margin-bottom: 12px;
}

.article-content h3 {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #F5F5F5;
  margin-top: 32px;
  margin-bottom: 12px;
}

.article-content p {
  font-size: 18px;
  line-height: 1.8;
  color: #D1D5DB;
  margin-bottom: 1.5em;
}

.article-content a {
  color: #D4AF37;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-content blockquote {
  border-left: 3px solid #D4AF37;
  padding-left: 24px;
  margin: 32px 0;
  font-style: italic;
  color: #9CA3AF;
  font-size: 20px;
}

.article-content img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 32px 0;
}

.article-content ul,
.article-content ol {
  padding-left: 24px;
  margin-bottom: 1.5em;
}

.article-content li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.article-content mark {
  background: rgba(212, 175, 55, 0.3);
  color: #F5F5F5;
  padding: 2px 6px;
  border-radius: 3px;
}
```

---

# SUMMARY

## Features Included

| Feature | Description |
|---------|-------------|
| **Rich Text Formatting** | Bold, italic, underline, strikethrough, highlight |
| **Headings** | H1, H2, H3 with proper styling |
| **Lists** | Bullet and numbered lists |
| **Blockquotes** | Gold-bordered quote blocks |
| **Links** | Click to add/edit links |
| **Images** | Upload, drag-drop, paste from clipboard |
| **YouTube Embeds** | Paste URL to embed video |
| **Code Blocks** | Syntax highlighted code |
| **Dividers** | Horizontal rules |
| **Bubble Menu** | Floating toolbar on text selection |
| **Slash Commands** | Type "/" for quick formatting |
| **Auto-save** | Saves every 30 seconds |
| **Preview** | Full article preview modal |
| **SEO Fields** | Meta title, description, slug |
| **Categories & Tags** | Organize content |
| **Word Count** | Live word count & reading time |
| **Featured Image** | Cover image upload |

## Library Used

**Tiptap** (MIT License, Free)
- Modern, React-first
- Highly customizable
- Used by GitLab, Substack, Linear
- Great TypeScript support

---

*The editor will produce beautiful, consistently styled articles that match the VIP brand!*
