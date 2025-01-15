export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse" />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-white/5 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10"
            >
              <div className="aspect-video bg-white/10 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
                  <div className="h-6 w-20 bg-white/10 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="h-4 w-full bg-white/10 rounded animate-pulse"
                    />
                  ))}
                </div>
                <div className="h-10 w-full bg-white/10 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
