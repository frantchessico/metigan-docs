import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsHeader } from "@/components/docs-header"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <DocsHeader />
      <div className="flex flex-1 overflow-hidden">
        <DocsSidebar />
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="container max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
            <Breadcrumbs />
            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:text-3xl md:prose-h2:text-4xl prose-h3:text-2xl md:prose-h3:text-3xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-transparent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-strong:font-semibold">
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}

