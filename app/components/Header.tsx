export default function Header() {
  return (
    <div className="bg-green pb-6 pt-4">
      <div>
        <h1 className="pt-4 pb-4 font-bold text-5xl italic text-lime-500">
          <a href="/">Ko-Mi</a>
        </h1>
      </div>
      <span>
        <a className="px-6 hover:text-lime-600" href="/">
          Home
        </a>
        <a className="px-6 hover:text-lime-600" href="/add-recipe">
          Add Recipe
        </a>
        <a className="px-6 hover:text-lime-600" href="/shopping-list">
          Shopping List
        </a>
      </span>
    </div>
  );
}
