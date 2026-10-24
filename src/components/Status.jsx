// Small components for the loading and error states of the fetched data.

export function Loading() {
    return <p className="muted" role="status">Loading menus...</p>
}

export function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-message" role="alert">
            <button className="btn" onClick={onRetry}>Retry</button>
        </div>
    )
}