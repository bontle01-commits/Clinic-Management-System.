import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/QueueBoard.css";

function QueueBoard() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/queue/today");
      setQueue(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load queue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const callNextPatient = async () => {
    try {
      await axios.put("http://localhost:8080/api/queue/next");
      fetchQueue(); 
    } catch (err) {
      console.log(err);
      setError("Failed to call next patient");
    }
  };

  return (
    <div className="queue-page">
      <div className="queue-card">
        <h2>Clinic Queue Dashboard</h2>

        {error && <p className="error">{error}</p>}

        <button className="next-btn" onClick={callNextPatient}>
          Call Next Patient
        </button>

        {loading ? (
          <p>Loading queue...</p>
        ) : (
          <table className="queue-table">
            <thead>
              <tr>
                <th>Queue #</th>
                <th>Patient Name</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {queue.length === 0 ? (
                <tr>
                  <td colSpan="3">No patients in queue</td>
                </tr>
              ) : (
                queue.map((item) => (
                  <tr key={item.id}>
                    <td>{item.queueNumber}</td>
                    <td>{item.patientName}</td>
                    <td>
                      <span className={`status ${item.status?.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default QueueBoard;