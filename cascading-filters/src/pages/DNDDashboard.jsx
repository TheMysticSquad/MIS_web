import React from 'react';
import Header from '../components/Header';

const DNDDashboard = () => {
    return (
        <>
            <Header />
            <div style={{ padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Do Not Disturb (DND) Dashboard</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem'
                }}>
                    <div style={{
                        background: '#f5f5f5',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        minWidth: '300px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        <h3>Active DND Users</h3>
                        <ul>
                            <li>John Doe</li>
                            <li>Jane Smith</li>
                            <li>Michael Johnson</li>
                        </ul>
                    </div>
                    <div style={{
                        background: '#f5f5f5',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        minWidth: '300px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        <h3>DND Requests</h3>
                        <ul>
                            <li>Request #1234 - Pending</li>
                            <li>Request #1235 - Approved</li>
                            <li>Request #1236 - Rejected</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DNDDashboard;