import { useState, useEffect } from 'react';

// Add interface for token response
interface TokenResponse {
    success: boolean;
    output: string;
}

function Token() {

    const [token, setToken] = useState<TokenResponse>({ success: false, output: '' });

    useEffect(() => {
        // Function to fetch Data
        const fetchData = async () => {
            try {
            
            // Fetch Data
            const dataResponse = await fetch(`${import.meta.env.VITE_API_URL}/_auth/user/token`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${sessionStorage.accessToken}`,
                },
            });
            const response = await dataResponse.json();
            setToken(response);
            console.log('Token:',response);
                
            } catch (err) {
              console.error(err);
            } finally {
            //setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    return (
        <pre>
            {token['output']}
        </pre>
    );
}

export default Token;
