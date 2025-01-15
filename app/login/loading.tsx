export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="flex gap-2 mb-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 h-10 bg-white/5 rounded-lg animate-pulse"
              />
            ))}
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
              </div>
            ))}
            <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
