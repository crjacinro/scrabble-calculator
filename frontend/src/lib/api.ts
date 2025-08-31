// Fake API service for demonstration purposes
export interface ApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data?: any;
}

export const fakeApiCall = async (): Promise<ApiResponse> => {
  const response = await fetch('http://localhost:8080/api/v1/rules');
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  localStorage.setItem('scrabble-rules', JSON.stringify(data));

  return {
    success: true,
    message: "Data loaded successfully",
    timestamp: new Date().toISOString(),
    data
  };
}; 