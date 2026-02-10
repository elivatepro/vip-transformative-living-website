'use client';

import { useState, useEffect, type KeyboardEvent } from 'react';
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
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';
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
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { uploadArticleImage } from '@/app/admin/articles/upload-action';

interface ArticleEditorProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    featured_image_url: string | null;
    category: string;
    tags: string[] | null;
    meta_title: string | null;
    meta_description: string | null;
    slug: string;
    is_published: boolean;
    published_at: string | null;
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function splitCommaSeparated(value: string | null | undefined): string[] {
  if (!value) return [];

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function mergeUniqueValues(existing: string[], incoming: string[]): string[] {
  const next = [...existing];
  const seen = new Set(existing.map((item) => item.toLowerCase()));

  for (const item of incoming) {
    const normalized = item.toLowerCase();
    if (!seen.has(normalized)) {
      next.push(item);
      seen.add(normalized);
    }
  }

  return next;
}

export default function ArticleEditor({ initialData }: ArticleEditorProps) {
  const supabase = createClient();
  const router = useRouter();
  
  // State
  const [articleId, setArticleId] = useState(initialData?.id || null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [featuredImage, setFeaturedImage] = useState<string | null>(initialData?.featured_image_url || null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(splitCommaSeparated(initialData?.category));
  const [tags, setTags] = useState<string[]>(mergeUniqueValues([], initialData?.tags || []));
  const [tagInput, setTagInput] = useState('');
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.is_published ? 'published' : 'draft');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [publishMenuOpen, setPublishMenuOpen] = useState(false);
  const category = selectedCategories.join(',');
  
  // Categories
  const categoryOptions = [
    { value: 'Purpose', label: 'Purpose' },
    { value: 'Identity', label: 'Identity' },
    { value: 'Values', label: 'Values' },
    { value: 'Career', label: 'Career' },
    { value: 'Relationships', label: 'Relationships' },
    { value: 'Health', label: 'Health' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Mindset', label: 'Mindset' },
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
      BubbleMenuExtension,
      FloatingMenuExtension,
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
    if (!initialData?.slug && title && !articleId) {
      const generatedSlug = slugify(title);
      setSlug(generatedSlug);
    }
  }, [title, initialData?.slug, articleId]);
  
  // Auto-save
  const debouncedTitle = useDebounce(title, 2000);
  const debouncedContent = useDebounce(editor?.getHTML() || '', 2000);
  
  useEffect(() => {
    // Only auto-save if we have some content and an ID, or if it's a new article with content
    if ((debouncedTitle || debouncedContent) && (articleId || (debouncedTitle && debouncedContent))) {
      handleAutoSave();
    }
  }, [debouncedTitle, debouncedContent]);
  
  // Save functions
  const handleAutoSave = async () => {
    if (!title && !editor?.getHTML()) return;
    setIsSaving(true);
    
    try {
      const payload = {
        title,
        slug: slugify(slug),
        content: editor?.getHTML() || '',
        category,
        tags,
        featured_image_url: featuredImage,
        meta_title: metaTitle,
        meta_description: metaDescription,
        is_published: status === 'published',
        updated_at: new Date().toISOString(),
      };

      if (articleId) {
        const { error } = await supabase
          .from('newsletter_articles')
          .update(payload)
          .eq('id', articleId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('newsletter_articles')
          .insert([payload])
          .select()
          .single();
        if (error) throw error;
        if (data) {
          setArticleId(data.id);
          // Update URL without refresh
          window.history.replaceState(null, '', `/admin/articles/${data.id}`);
        }
      }
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save error:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSaveDraft = async () => {
    setStatus('draft');
    await handleAutoSave();
    router.push('/admin/articles');
  };
  
  const handlePublish = async () => {
    setStatus('published');
    // Ensure state is updated before saving
    setIsSaving(true);
    try {
        const payload = {
            title,
            slug: slugify(slug),
            content: editor?.getHTML() || '',
            category,
            tags,
            featured_image_url: featuredImage,
            meta_title: metaTitle,
            meta_description: metaDescription,
            is_published: true,
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          if (articleId) {
            const { error } = await supabase
              .from('newsletter_articles')
              .update(payload)
              .eq('id', articleId);
            if (error) throw error;
          } else {
            const { data, error } = await supabase
              .from('newsletter_articles')
              .insert([payload])
              .select()
              .single();
            if (error) throw error;
            if (data) {
                setArticleId(data.id);
            }
          }
          setLastSaved(new Date());
          router.push('/admin/articles');
    } catch (error) {
        console.error('Publish error:', error);
    } finally {
        setIsSaving(false);
    }
  };
  
  // Image upload
  const handleImageUpload = async (file: File, type: 'featured' | 'content') => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadArticleImage(formData);
      
      if (!result.success) {
        console.error('Upload error:', result.error);
        alert('Upload failed: ' + result.error);
        return null;
      }

      if (!result.url) {
        throw new Error('No URL returned from upload');
      }
      
      if (type === 'featured') {
        setFeaturedImage(result.url);
      } else if (type === 'content' && editor) {
        editor.chain().focus().setImage({ src: result.url }).run();
      }
      
      return result.url;
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + (error.message || 'Unknown error'));
      return null;
    }
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
  
  const toggleCategory = (categoryValue: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((item) => item !== categoryValue)
        : [...prev, categoryValue],
    );
  };

  const addTagsFromInput = (rawInput: string) => {
    const parsedTags = splitCommaSeparated(rawInput);
    if (parsedTags.length === 0) {
      return;
    }

    setTags((prev) => mergeUniqueValues(prev, parsedTags));
    setTagInput('');
  };

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTagsFromInput(tagInput);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const clearSlashTrigger = () => {
    if (!editor) return;

    const { $from } = editor.state.selection;
    const parent = $from.parent;
    const content = parent.textContent;

    if (parent.type.name !== 'paragraph' || content.trim() !== '/') {
      return;
    }

    const from = $from.start();
    const to = from + content.length;
    editor.chain().focus().deleteRange({ from, to }).run();
  };

  const runSlashCommand = (command: () => void) => {
    clearSlashTrigger();
    command();
  };
  
  // Calculate reading time
  const readingTime = Math.ceil(wordCount / 200);
  
  if (!editor) return null;
  
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#2A2A2A]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.push('/admin/articles')} className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition">
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

            <FloatingMenu
              editor={editor}
              tippyOptions={{ duration: 100, placement: 'bottom-start' }}
              shouldShow={({ state }) => {
                const { $from, empty } = state.selection;
                if (!empty) return false;
                if ($from.parent.type.name !== 'paragraph') return false;
                return $from.parent.textContent.trim() === '/';
              }}
              className="grid grid-cols-2 gap-1 p-2 w-[260px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl"
            >
              <SlashCommandButton
                label="Heading 1"
                icon={<Heading1 className="w-3.5 h-3.5" />}
                onClick={() => runSlashCommand(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
              />
              <SlashCommandButton
                label="Heading 2"
                icon={<Heading2 className="w-3.5 h-3.5" />}
                onClick={() => runSlashCommand(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
              />
              <SlashCommandButton
                label="Bullet List"
                icon={<List className="w-3.5 h-3.5" />}
                onClick={() => runSlashCommand(() => editor.chain().focus().toggleBulletList().run())}
              />
              <SlashCommandButton
                label="Numbered"
                icon={<ListOrdered className="w-3.5 h-3.5" />}
                onClick={() => runSlashCommand(() => editor.chain().focus().toggleOrderedList().run())}
              />
              <SlashCommandButton
                label="Quote"
                icon={<Quote className="w-3.5 h-3.5" />}
                onClick={() => runSlashCommand(() => editor.chain().focus().toggleBlockquote().run())}
              />
              <SlashCommandButton
                label="Divider"
                icon={<Minus className="w-3.5 h-3.5" />}
                onClick={() => runSlashCommand(() => editor.chain().focus().setHorizontalRule().run())}
              />
              <SlashCommandButton
                label="Code Block"
                icon={<Code className="w-3.5 h-3.5" />}
                onClick={() => runSlashCommand(() => editor.chain().focus().toggleCodeBlock().run())}
              />
              <SlashCommandButton
                label="Image"
                icon={<ImageIcon className="w-3.5 h-3.5" />}
                onClick={() =>
                  runSlashCommand(() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleImageUpload(file, 'content');
                    };
                    input.click();
                  })
                }
              />
            </FloatingMenu>
            
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
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.value);
                  return (
                    <label
                      key={cat.value}
                      className={`cursor-pointer px-3 py-2 rounded-lg border text-sm transition ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                          : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#9CA3AF] hover:border-[#3A3A3A] hover:text-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCategory(cat.value)}
                        className="sr-only"
                      />
                      {cat.label}
                    </label>
                  );
                })}
              </div>
              <p className="text-xs text-[#6B7280] mt-3">Select one or more categories.</p>
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
                  onKeyDown={handleTagInputKeyDown}
                  onBlur={() => addTagsFromInput(tagInput)}
                  placeholder="Add tags (comma separated)..."
                  className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37] transition"
                />
                <button
                  onClick={() => addTagsFromInput(tagInput)}
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
                      onChange={(e) => setSlug(slugify(e.target.value))}
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
          categories={selectedCategories}
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

interface SlashCommandButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function SlashCommandButton({ onClick, icon, label }: SlashCommandButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-[#9CA3AF] hover:bg-[#2A2A2A] hover:text-white transition text-left"
    >
      {icon}
      <span>{label}</span>
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
  categories: string[];
  onClose: () => void;
}

function PreviewModal({ title, content, featuredImage, categories, onClose }: PreviewModalProps) {
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
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
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
