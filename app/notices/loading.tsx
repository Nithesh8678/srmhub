export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-8 w-64 bg-white/5 rounded-lg mb-8 animate-pulse" />
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="h-6 w-48 bg-white/10 rounded mb-2" />
                  <div className="h-4 w-32 bg-white/10 rounded" />
                </div>
                <div className="h-6 w-24 bg-white/10 rounded-full" />
              </div>
              <div className="h-4 w-full bg-white/10 rounded mb-2" />
              <div className="h-4 w-2/3 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
