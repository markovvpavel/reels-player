type Props = { onClick: () => void };

export const LoadMoreBtn = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="mt-[20px] md:mt-[40px] mx-auto bg-zinc-400 hover:bg-zinc-200 w-fit px-[20px] py-[10px] rounded-[3px] cursor-pointer select-none"
    >
      <span className="text-_black">Load More</span>
    </div>
  );
};
