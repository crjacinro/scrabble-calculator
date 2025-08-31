// Fake API service for demonstration purposes
export interface ApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data?: any;
}

export const fakeApiCall = async (): Promise<ApiResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate random success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1;
  
  if (isSuccess) {
    return {
      success: true,
      message: "Data loaded successfully",
      timestamp: new Date().toISOString(),
      data: {
        scrabbleWords: ["HELLO", "WORLD", "SCRABBLE", "GAME"],
        highScores: [120, 95, 87, 76]
      }
    };
  } else {
    throw new Error("Failed to load data. Please try again.");
  }
}; 