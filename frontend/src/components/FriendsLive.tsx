import { useState, useEffect, useRef } from 'preact/hooks';

export default function FriendsLive() {
    const [friends, setFriends] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [metrics, setMetrics] = useState({ fetchTime: 0, delta: 0 });
    
    const skipCount = useRef(0);
    const lastFetchTime = useRef(0); 
    
    useEffect(() => {
        const fetchFriends = async () => {
            const startTime = performance.now();
            
            let scarto = 0;
            if (lastFetchTime.current !== 0) {
                const tempoTrascorso = startTime - lastFetchTime.current;
                scarto = Math.round(tempoTrascorso - 500); // Scarto dai 500ms ideali
            }
            lastFetchTime.current = startTime;
            
            try {
                const url = `https://dummyjson.com/users?limit=5&skip=${skipCount.current}`;
                const response = await fetch(url);
                const data = await response.json();
                    
                setFriends(data.users); 
                
                const endTime = performance.now();
                
                setMetrics({
                    fetchTime: Math.round(endTime - startTime),
                    delta: scarto
                });

                setLoading(false);

                skipCount.current += 5;
                if (skipCount.current > 200) {
                    skipCount.current = 0;
                }

            } catch(error) {
                console.error("Errore nel recupero degli amici: ", error);
                setLoading(false);
            }
        };

        fetchFriends();
        const intervalId = setInterval(fetchFriends, 500);

        return () => clearInterval(intervalId);
        
    }, []); 

    if (loading) return <p>Caricamento dati in corso...</p>;

    const deltaFormatted = metrics.delta > 0 ? `+${metrics.delta}` : metrics.delta;
    
    const deltaColor = metrics.delta === 0 ? '#94a3b8' : (Math.abs(metrics.delta) > 20 ? '#ef4444' : '#fbbf24');

    return (
        <div style={{ border: '2px solid #ccc', padding: '1rem', borderRadius: '8px', position: 'relative' }}>
            
            {/* BOX METRICHE IN ALTO A DESTRA */}
            <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#333', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem', textAlign: 'right' }}>
                <div style={{ color: '#4ade80' }}>⏱️ Fetch: {metrics.fetchTime} ms</div>
                <div style={{ color: deltaColor }}>⚖️ Delta: {deltaFormatted} ms</div>
            </div>

            <h3 style={{ color: 'blue', marginTop: 0 }}>⚡ Isola Client-Side</h3>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>Aggiornamento forzato ogni 500ms</p>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {friends.map((friend) => (
                <li key={friend.id} style={{ marginBottom: '0.5rem', background: '#e0f7fa', padding: '10px', borderRadius: '4px' }}>
                    <strong>{friend.firstName} {friend.lastName}</strong> <br />
                    <small>Email: {friend.email} | Età: {friend.age}</small>
                </li>
                ))}
            </ul>
        </div>
    );    
}