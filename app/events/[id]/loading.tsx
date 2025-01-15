export default function Loading() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-6 w-32 bg-white/5 rounded animate-pulse mb-8"></div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <div className="h-64 md:h-96 bg-white/5 animate-pulse"></div>

          <div className="p-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div className="h-8 w-64 bg-white/5 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-white/5 rounded-full animate-pulse"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/5 rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-16 bg-white/5 rounded animate-pulse"></div>
                      <div className="h-5 w-32 bg-white/5 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="h-6 w-40 bg-white/5 rounded animate-pulse"></div>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-full bg-white/5 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-8">
              <div className="h-8 w-32 bg-white/5 rounded-full animate-pulse"></div>
              <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
