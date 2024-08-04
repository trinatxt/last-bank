import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/authcontext'; // Adjust path as needed
import axios from 'axios';

const ExchangeHistoryPage = () => {
  const { user, creditHistory: initialCreditHistory } = useAuth();
  const [creditHistory, setCreditHistory] = useState(initialCreditHistory || []);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [error, setError] = useState(null);

  // Mapping of status codes to descriptions
  const statusMapping = {
    '0000': 'Success',
    '0001': 'Member not found',
    '0002': 'Member name mismatch',
    '0003': 'Member account closed',
    '0004': 'Member account suspended',
    '0005': 'Member ineligible for accrual',
    '0099': 'Unable to process, please contact support for more information',
    'In Progress': 'In Progress'
    // Add more status codes and descriptions as needed
  };

  useEffect(() => {
    const fetchCreditHistory = async () => {
      try {
        if (!user?.email) {
          throw new Error('User is not authenticated or email is missing');
        }

        console.log(`Fetching exchange history for email: ${user.email}`);
        const response = await fetch(`http://weloveesc.xukaiteo.com:8001/tc/credit/get?item=${encodeURIComponent(user.user_id)}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch exchange history. Server responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        const simplifiedHistory = data.map(item => ({
          'Amount': item.amount,
          'Status': statusMapping[item.status] || 'Unknown', // Use statusMapping to get description
          'Airline Code': item.airline_code,
          'Reference Number': item.reference,
          'Transaction Date': item.transaction_date.split('T')[0] // Extracting only the date part
        }));

        setCreditHistory(simplifiedHistory);
      } catch (error) {
        console.error('Error fetching exchange history:', error.message);
        setError('Failed to fetch exchange history. Please try again later.');
      }
    };

    if (user?.user_id) {
      fetchCreditHistory();
    } else {
      console.error('No user_id found on user');
      setError('User is not logged in or user_id is missing');
    }
  }, [user]);

  const handleSelectRequest = (reference) => {
    setSelectedRequests(prevState => 
      prevState.includes(reference) 
        ? prevState.filter(item => item !== reference) 
        : [...prevState, reference]
    );
  };

  const handleDeleteRequests = async () => {
    try {
      const requestsToDelete = selectedRequests.map(reference => 
        axios.post('http://weloveesc.xukaiteo.com:8001/tc/credit/delete', {
          email: user.email,
          reference: reference
        })
      );

      await Promise.all(requestsToDelete);

      setCreditHistory(creditHistory.filter(item => !selectedRequests.includes(item['Reference Number'])));
      setSelectedRequests([]);
      setSelectMode(false);
    } catch (error) {
      console.error('Error deleting requests:', error.message);
      setError('Failed to delete the requests. Please try again later.');
    }
  };

  return (
    <div className="bg-3 min-h-screen">
      <h1 className="text-3xl font-semibold text-left mt-8 mb-6 pl-8 text-8">Exchange History</h1>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-2 rounded-lg shadow-md py-8 px-10 mb-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-lg font-semibold text-8">
              User ID: <span className="font-normal">{user?.user_id}</span>
            </p>
            <div>
              {selectMode ? (
                <button
                  onClick={handleDeleteRequests}
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 mr-4"
                >
                  Delete Selected
                </button>
              ) : null}
              <button
                onClick={() => setSelectMode(!selectMode)}
                className="py-2 px-4 bg-6 text-white rounded hover:bg-9"
              >
                {selectMode ? 'Cancel' : 'Select'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-2 border rounded-lg">
              <thead className="bg-5">
                <tr>
                  <th className="border px-6 py-3 text-8">Transfer Date</th>
                  <th className="border px-6 py-3 text-8">Amount</th>
                  <th className="border px-6 py-3 text-8">Reference Number</th>
                  <th className="border px-6 py-3 text-8">Status</th>
                </tr>
              </thead>
              <tbody>
                {creditHistory.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`border-t ${selectedRequests.includes(transaction['Reference Number']) ? 'bg-4' : ''}`}
                    onClick={() => selectMode && handleSelectRequest(transaction['Reference Number'])}
                  >
                    <td className="border px-6 py-4 text-8">{transaction['Transaction Date']}</td>
                    <td className="border px-6 py-4 text-8">{transaction['Amount']}</td>
                    <td className="border px-6 py-4 text-8">{transaction['Reference Number']}</td>
                    <td className="border px-6 py-4 text-8">{transaction['Status']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ExchangeHistoryPage;
