"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
};

const createPageRange = (current: number, total: number, delta = 2): number[] => {
  const range: number[] = [];

  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
};

export default function Pagination({ currentPage, hasNextPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumbers = createPageRange(currentPage, totalPages);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/characters?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        className="px-3 py-1 disabled:opacity-50 hover:underline"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 text-sm rounded-lg shadow-lg border border-[rgba(57,57,57,1)]${
            num === currentPage ? "text-gray-300" : " text-white "
          }`}
          onClick={() => goToPage(num)}
        >
          {num}
        </button>
      ))}

      <button
        className="px-3 py-1 disabled:opacity-50 hover:underline"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
}
