import PyGeniusGenerator from '@/components/pygenius/pygenius-generator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="w-full border-b bg-card">
        <div className="container mx-auto flex items-center gap-3 p-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-headline font-bold text-foreground">
              FastAPI
            </h1>
            <p className="text-sm text-muted-foreground font-body">
              AI-powered Python code generation assistant
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <PyGeniusGenerator />
      </main>
    </div>
  );
}
