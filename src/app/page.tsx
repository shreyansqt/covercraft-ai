export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center p-4 border-b"></header>
        <main className="flex-grow flex-1 p-6 overflow-auto">
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">
              Select a cover letter or create a new one to get started.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
