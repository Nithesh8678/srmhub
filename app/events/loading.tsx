export default function Loading() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="h-8 w-32 bg-white/5 rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-white/5 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-40 bg-white/5 rounded-lg animate-pulse"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="h-48 bg-white/5 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 w-24 bg-white/5 rounded-full animate-pulse"></div>
                  <div className="h-10 w-28 bg-white/5 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
