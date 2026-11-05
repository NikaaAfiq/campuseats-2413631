function CategoryFilter ({ categories, selected, onSelect}) {
    return (
        <div className="category-filter">
            {categories.map((c) => (
                <button
                    key={c}
                    type="button"
                    className={`btn ${c === selected ? "selected" : ""}`}
                    onClick={() => onSelect(c)}
                >
                    {c}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;