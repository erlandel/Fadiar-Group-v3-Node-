export default function SkeletonProductID() {
  return (
    <div className="px-4 md:px-20 2xl:px-36 mt-10">
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-18 bg-gray-200 rounded animate-shimmer" />
          <div className="h-3 w-20 bg-gray-200 rounded animate-shimmer" />
          <div className="h-3 w-24 bg-gray-200 rounded animate-shimmer" />
        </div>

        <div className="h-8 w-64 bg-gray-200 rounded animate-shimmer" />
      </div>

      <div className="flex flex-col md:flex-row gap-16 mt-10">
        {/* Image section skeleton */}
        <div className="md:w-1/3">
          {/* Main image skeleton */}
          <div className="relative w-fit mx-auto h-[400px] rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
            <div className="h-full w-90 sm:w-100 bg-gray-200 rounded-xl animate-shimmer" />
          </div>

          {/* Thumbnails skeleton */}
          <div className="flex gap-2 mt-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-md border-2 border-gray-300 bg-gray-200 overflow-hidden animate-shimmer"
              >
                <div className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Info section skeleton */}
        <div className="md:w-2/3">
          {/* Category */}
          <div className="h-4 w-28 bg-gray-200 rounded animate-shimmer mb-3" />
          
          {/* Product name */}
          <div className="h-10 w-3/4 bg-gray-200 rounded animate-shimmer mb-2" />
          
          {/* Brand */}
          <div className="h-8 w-1/2 bg-gray-200 rounded animate-shimmer mb-4" />

          {/* Description */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
            <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-shimmer" />
          </div>

          {/* Warranty */}
          <div className="h-4 w-36 bg-gray-200 rounded animate-shimmer mb-4" />

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-32 bg-gray-200 rounded animate-shimmer" />
            <div className="h-6 w-24 bg-gray-100 rounded animate-shimmer" />
          </div>

          {/* Quantity and cart button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 w-12 bg-gray-100 animate-shimmer" />
              <div className="px-4 py-3 w-14 bg-gray-50 border-x border-gray-200 animate-shimmer" />
              <div className="px-5 py-3 w-12 bg-gray-100 animate-shimmer" />
            </div>
            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-shimmer" />
          </div>

          {/* Specs table */}
          <div className="mt-8 bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="h-6 w-28 bg-gray-200 rounded animate-shimmer mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-shimmer" />
                  <div className="h-4 w-1/4 bg-gray-200 rounded animate-shimmer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
