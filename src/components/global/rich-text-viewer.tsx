export default function RichTextViewer({ content }: { content: string }) {
  const cleanContent = content.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
  return (
    <div
      className="prose max-w-full!"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    ></div>
  );
}
