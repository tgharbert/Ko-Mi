function BackPageButton({ revertPage }: { revertPage: Function }) {
  return (
    <div>
      <button
        className="bg-lime-600 hover:bg-lime-700 text-tertiary px-4 py-2 rounded"
        onClick={() => revertPage()}
      >
        Previous
      </button>
    </div>
  );
}

export default BackPageButton;
