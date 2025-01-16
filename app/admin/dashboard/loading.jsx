export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />
        </div>

        <div className="grid gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
              <div className="h-10 w-40 bg-white/5 rounded-lg animate-pulse" />
            </div>

            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-white/5 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="h-6 w-32 bg-white/5 rounded animate-pulse mb-2" />
                <div className="h-10 w-20 bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
