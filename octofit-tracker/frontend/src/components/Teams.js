import React, { useCallback, useEffect, useState } from 'react';

const Teams = () => {
  const title = 'Teams';
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : '/api/teams/';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log(`${title} component fetching data from`, endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        console.log(`${title} fetch response`, payload);
        const list = payload?.results ?? payload;
        setItems(Array.isArray(list) ? list : [list]);
      })
      .catch((fetchError) => {
        console.error(`${title} fetch error for`, endpoint, fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItems = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filter.toLowerCase())
  );

  const allColumns = Array.from(
    new Set(filteredItems.flatMap((item) => Object.keys(item)))
  );

  const renderCell = (value) => {
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'object') {
      return <pre className="mb-0">{JSON.stringify(value)}</pre>;
    }
    return String(value);
  };

  return (
    <div className="py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
            <div>
              <h2 className="h3">{title}</h2>
              <p className="text-muted mb-2">
                Endpoint: <a className="link-primary" href={endpoint}>{endpoint}</a>
              </p>
            </div>
            <div className="btn-group mt-3 mt-md-0">
              <button type="button" className="btn btn-primary" onClick={fetchData}>
                Refresh
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSelectedItem(null);
                  setShowModal(true);
                }}
              >
                View JSON
              </button>
            </div>
          </div>

          <form className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <label htmlFor="teamsSearch" className="form-label">
                Search {title.toLowerCase()}
              </label>
              <input
                id="teamsSearch"
                type="search"
                className="form-control"
                placeholder="Filter by content..."
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
            </div>
          </form>

          {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && (
            <>
              {filteredItems.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle mb-0">
                    <thead>
                      <tr>
                        {allColumns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item, index) => (
                        <tr key={index}>
                          {allColumns.map((column) => (
                            <td key={column}>{renderCell(item[column])}</td>
                          ))}
                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowModal(true);
                              }}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-warning">No {title.toLowerCase()} found.</div>
              )}
            </>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block modal-custom"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedItem ? 'Team details' : 'Raw JSON data'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(selectedItem ?? { endpoint, items: filteredItems }, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
